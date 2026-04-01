/**
 * VLL v6.4 Tally Prime & Excel Bridge
 * Developer Note: Uses SheetJS to process multi-column footwear ledgers.
 * Tester Note: Implements atomic hashing for every imported row.
 */
async function importTally(event) {
    const file = event.target.files[0];
    const status = document.getElementById('import-log') || { textContent: "" };

    if (!file) return;
    status.textContent = "⚙ Reading Tally File...";

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert to JSON with header mapping
            const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

            status.textContent = `Found ${rows.length} rows. Processing...`;

            // Start an Atomic Transaction
            const tx = db.transaction(['tx', 'stock'], 'readwrite');
            const tStore = tx.objectStore('tx');
            const sStore = tx.objectStore('stock');

            let importedCount = 0;

            for (const row of rows) {
                // 1. FUZZY COLUMN MAPPING (Handles different Tally exports)
                const name = row['Item Name'] || row['Particulars'] || row['Stock Item'] || row['Description'] || "";
                const qtyStr = row['Quantity'] || row['Qty'] || row['Billed Qty'] || "0";
                const amtStr = row['Amount'] || row['Value'] || row['Total'] || "0";

                // Clean data: Tally often exports numbers with units (e.g., "10 Prs")
                const qty = parseInt(qtyStr.toString().replace(/[^0-9.-]/g, '')) || 0;
                const amt = parseFloat(amtStr.toString().replace(/[^0-9.-]/g, '')) || 0;

                if (name && (qty !== 0 || amt !== 0)) {
                    // 2. CRYPTOGRAPHIC HASHING
                    const last = await new Promise(r => tStore.openCursor(null, 'prev').onsuccess = e => r(e.target.result ? e.target.result.value : null));
                    const prevHash = last ? last.hash : "0".repeat(64);

                    const entry = {
                        date: row['Date'] || new Date().toISOString().split('T')[0],
                        desc: name,
                        qty: qty,
                        cr: amt > 0 ? amt : 0,
                        dr: amt < 0 ? Math.abs(amt) : 0,
                        prevHash: prevHash,
                        ts: Date.now()
                    };

                    // Generate SHA-256 Link
                    const msg = new TextEncoder().encode(JSON.stringify(entry));
                    const hashBuffer = await crypto.subtle.digest('SHA-256', msg);
                    entry.hash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

                    tStore.add(entry);

                    // 3. AUTOMATED STOCK RECONCILIATION
                    const existingStock = await new Promise(r => sStore.get(name).onsuccess = e => r(e.target.result));
                    if (existingStock) {
                        existingStock.present += qty; // If it's a purchase (Positive) or sale (Negative)
                        sStore.put(existingStock);
                    } else {
                        // Create new item if not exists
                        sStore.add({
                            name: name,
                            present: qty,
                            cost: qty !== 0 ? Math.abs(amt / qty) : 0,
                            ws: 0,
                            sold: 0
                        });
                    }
                    importedCount++;
                }
            }

            tx.oncomplete = () => {
                toast(`Successfully imported ${importedCount} items. Chain updated.`, "ok");
                loadUI(); // Refresh Dashboard and Tables
                if (window.triggerSync) triggerSync(); // Insta-style sync
            };

        } catch (err) {
            console.error("Import Error:", err);
            toast("Import Failed: Check file format", "err");
        }
    };
    reader.readAsArrayBuffer(file);
}
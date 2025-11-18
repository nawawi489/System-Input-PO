// ==========================================
// AMBIL DATA DARI formKosongData
// ==========================================

const saved = localStorage.getItem("formKosongData");
const data = JSON.parse(saved);

if (!data) {
    alert("Tidak ada data! Silakan isi form kembali.");
    window.location.href = "formkosong.html";
}

document.getElementById("formKosongData").innerHTML = `
    <p><strong>Tanggal PO:</strong> ${data.tanggal}</p>
    <p><strong>Outlet:</strong> ${data.outlet}</p>
    <p><strong>Barang:</strong> ${data.barang}</p>
    <p><strong>Satuan:</strong> ${data.satuan}</p>
    <p><strong>Jumlah:</strong> ${data.jumlah}</p>
    <p><strong>Harga Satuan:</strong> ${data.harga}</p>
    <p><strong>Supplier:</strong> ${data.supplier}</p>
`;

// TOMBOL KEMBALI
document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "formkosong.html";
});

// ==========================================
// KIRIM DATA KE N8N
// ==========================================

document.getElementById("kirimBtn").addEventListener("click", async () => {
    try {
    const res = await fetch("https://n8n.srv1123014.hstgr.cloud/webhook/input-po", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Gagal mengirim");

    document.getElementById("success").classList.remove("hidden");

    // Hapus data
    localStorage.removeItem("formKosongData");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);

    } catch (err) {
        document.getElementById("error").classList.remove("hidden");
    }
});

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("formKosongData");
    window.location.href = "login.html";
}
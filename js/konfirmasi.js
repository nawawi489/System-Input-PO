// Ambil data form dari localStorage
const saved = localStorage.getItem("poFormData");
const formData = JSON.parse(saved);

// Tampilkan data dari form ke HTML
document.getElementById("formData").innerHTML = `
  <p><strong>Tanggal PO :</strong> ${formData.tanggal}</p>
  <p><strong>Outlet     :</strong> ${formData.outlet}</p>
  <p><strong>Barang     :</strong> ${formData.barang}</p>
  <p><strong>Jumlah     :</strong> ${formData.jumlah}</p>
`;

// ========================================
// AMBIL DETAIL BARANG DARI N8N SAAT HALAMAN DIBUKA
// ========================================

async function getBarangDetail(namaBarang) {
  const url =
    "https://n8n.srv1123014.hstgr.cloud/webhook/get-barang-detail?nama=" +
    encodeURIComponent(namaBarang);

  const res = await fetch(url);
  const data = await res.json();

  return {
    satuan: data["Satuan"],
    harga: data["Harga"],
    supplier: data["Nama Supplier"],
    wa: data["Nomor WhatsApp"]
  };
}

// Load detail dan tampilkan otomatis
let detailBarang = {}; // simpan untuk dikirim ke backend

(async () => {
  detailBarang = await getBarangDetail(formData.barang);

  document.getElementById("sheetData").innerHTML = `
    <p><strong>Satuan       :</strong> ${detailBarang.satuan}</p>
    <p><strong>Harga Satuan :</strong> ${detailBarang.harga}</p>
    <p><strong>Supplier     :</strong> ${detailBarang.supplier}</p>
    <p><strong>No. WA       :</strong> ${detailBarang.wa}</p>
  `;
})();

// ========================================
// Batalkan PO
// ========================================

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// ========================================
// KIRIM PO SETELAH KONFIRMASI
// ========================================

document.getElementById("konfirmasiBtn").addEventListener("click", async () => {
  
  // Gabungkan data form + detail barang
  const finalPayload = {
    tanggal: formData.tanggal,
    outlet: formData.outlet,
    barang: formData.barang,
    jumlah: formData.jumlah,
    harga: detailBarang.harga,
    satuan: detailBarang.satuan,
    supplier: detailBarang.supplier,
    wa: detailBarang.wa
  };

  console.log("Mengirim payload ke n8n:", finalPayload);

  try {
    const res = await fetch("https://n8n.srv1123014.hstgr.cloud/webhook/input-po", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalPayload),
    });

    if (!res.ok) {
      throw new Error("N8N Response Error");
    }

    alert("PO berhasil dikirim ke n8n!");
    localStorage.removeItem("poFormData"); 
    window.location.href = "index.html";

  } catch (err) {
    alert("Gagal mengirim PO. Periksa koneksi atau workflow n8n.");
    console.error(err);
  }
});


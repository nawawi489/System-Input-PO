// Ambil data form dari localStorage
const saved = localStorage.getItem("poFormData");
const formData = JSON.parse(saved);

// Tampilkan data dari form ke HTML
document.getElementById("formData").innerHTML = `
  <p><strong>Tanggal PO:</strong> ${formData.tanggal}</p>
  <p><strong>Outlet:</strong> ${formData.outlet}</p>
  <p><strong>Barang:</strong> ${formData.barang}</p>
  <p><strong>Jumlah:</strong> ${formData.jumlah}</p>
`;

// Tombol konfirmasi → disable dulu
const konfirmasiBtn = document.getElementById("konfirmasiBtn");
konfirmasiBtn.disabled = true;
konfirmasiBtn.classList.add("opacity-50", "cursor-not-allowed");

// Tambahkan indikator loading (opsional)
document.getElementById("sheetData").innerHTML = `
  <p class="text-gray-500 italic">Memuat detail barang...</p>
`;

// ========================================
// AMBIL DETAIL BARANG DARI SHEET VIA N8N
// ========================================
async function getBarangDetail(namaBarang) {
  const url = "https://n8n.srv1123014.hstgr.cloud/webhook/get-barang-detail?nama=" + encodeURIComponent(namaBarang);
  const res = await fetch(url);
  const data = await res.json();

  return {
    harga: data["Harga"],
    satuan: data["Satuan"],
    supplier: data["Nama Supplier"],
    wa: data["Nomor WhatsApp"]
  };
}

// ========================================
// LOAD DATA DETAIL & AKTIFKAN TOMBOL
// ========================================

let detailBarang = null;

(async () => {
  try {
    detailBarang = await getBarangDetail(formData.barang);

    // tampilkan ke HTML
    document.getElementById("sheetData").innerHTML = `
      <p><strong>Harga:</strong> ${detailBarang.harga}</p>
      <p><strong>Satuan:</strong> ${detailBarang.satuan}</p>
      <p><strong>Supplier:</strong> ${detailBarang.supplier}</p>
      <p><strong>No. WA:</strong> ${detailBarang.wa}</p>
    `;

    // Aktifkan tombol setelah semua selesai
    konfirmasiBtn.disabled = false;
    konfirmasiBtn.classList.remove("opacity-50", "cursor-not-allowed");

  } catch (err) {
    document.getElementById("sheetData").innerHTML = `
      <p class="text-red-600">Gagal memuat detail barang!</p>
    `;
  }
})();

// ========================================
// TOMBOL KEMBALI
// ========================================

document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// ========================================
// KIRIM PO SETELAH KONFIRMASI
// ========================================

konfirmasiBtn.addEventListener("click", async () => {
  if (!detailBarang) return; // keamanan tambahan

  const finalPayload = {
    ...formData,
    ...detailBarang
  };

  await fetch("https://n8n.srv1123014.hstgr.cloud/webhook/input-po", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalPayload)
  });

  alert("PO berhasil dikirim!");
  localStorage.removeItem("poFormData");
  window.location.href = "index.html";
});


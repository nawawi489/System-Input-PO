// ===============================================
// LOAD DATA BARANG VIA WEBHOOK N8N
// ===============================================

const barangData = [];

async function loadBarangFromSheet() {
  const url = "https://n8n.srv1123014.hstgr.cloud/webhook/get-barang"; // ganti domain webhook

  try {
    const res = await fetch(url);
    const json = await res.json();

    barangData.length = 0;
    barangData.push(...json.barang);

    console.log("Barang dari n8n:", barangData);
  } catch (error) {
    console.log("Gagal memuat data:", error);
  }
}

// Panggil saat halaman dibuka
loadBarangFromSheet();


// ===============================================
// 2. SEARCHABLE DROPDOWN
// ===============================================

const barangSearch = document.getElementById("barangSearch");
const barangList = document.getElementById("barangList");

barangSearch.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  barangList.innerHTML = "";

  if (keyword === "") {
    barangList.classList.add("hidden");
    return;
  }

  const filtered = barangData.filter((item) =>
    item.toLowerCase().includes(keyword)
  );

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.classList =
      "px-3 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-none";
    div.textContent = item;

    div.addEventListener("click", function () {
      barangSearch.value = item;
      barangList.classList.add("hidden");
    });

    barangList.appendChild(div);
  });

  barangList.classList.remove("hidden");
});

// Klik di luar → hide dropdown
document.addEventListener("click", function (e) {
  if (!barangSearch.contains(e.target)) {
    barangList.classList.add("hidden");
  }
});


// ===============================================
// 3. SUBMIT PO
// ===============================================

document.getElementById("kirimBtn").addEventListener("click", function () {
  const tanggal = document.getElementById("tanggal").value;
  const outlet = document.getElementById("outlet").value;
  const barang = barangSearch.value;
  const jumlah = document.getElementById("jumlah").value;

  if (!tanggal || !outlet || !barang || !jumlah) {
    document.getElementById("error").classList.remove("hidden");
    return;
  }

  // Simpan data form di localStorage
  const formData = { tanggal, outlet, barang, jumlah };
  localStorage.setItem("poFormData", JSON.stringify(formData));

  // Pindahkan user ke halaman konfirmasi
  window.location.href = "konfirmPO.html";
});


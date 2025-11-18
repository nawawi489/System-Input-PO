document.getElementById("kirimBtn").addEventListener("click", function () {
    const tanggal = document.getElementById("tanggal").value;
    const outlet = document.getElementById("outlet").value;
    const barang = document.getElementById("barang").value;
    const satuan = document.getElementById("satuan").value;
    const jumlah = document.getElementById("jumlah").value;
    const harga = document.getElementById("harga").value;
    const supplier = document.getElementById("supplier").value;

    if (!tanggal || !outlet || !barang || !satuan || !jumlah || !harga || !supplier) {
        document.getElementById("error").classList.remove("hidden");
        return;
    }

    // simpan data ini ke localStorage untuk halaman konfirmasi kosong
    const dataFormKosong = {
        tanggal, outlet, barang, satuan, jumlah, harga, supplier
    };

    localStorage.setItem("formKosongData", JSON.stringify(dataFormKosong));

    window.location.href = "konfirmplanPO.html"; // halaman konfirmasi untuk form kosong
});
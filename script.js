// =================================
// SATSET - KALKULATOR HARGA
// =================================

// Mengambil elemen dari HTML
const serviceInput = document.getElementById("service");
const distanceInput = document.getElementById("distance");
const promoInput = document.getElementById("promo");
const calculateBtn = document.getElementById("calculateBtn");
const resultBox = document.getElementById("result");

// Fungsi untuk menghitung harga
calculateBtn.addEventListener("click", function () {

    // Mengambil nilai input pengguna
    const hargaPerKm = Number(serviceInput.value);
    const jarak = Number(distanceInput.value);
    const kodePromo = promoInput.value.trim().toUpperCase();

    // Memeriksa apakah layanan sudah dipilih
    if (serviceInput.value === "") {
        resultBox.innerHTML = "⚠️ Silakan pilih layanan terlebih dahulu.";
        return;
    }

    // Memeriksa apakah jarak sudah diisi dengan benar
    if (distanceInput.value === "" || !Number.isFinite(jarak) || jarak <= 0) {
        resultBox.innerHTML = "⚠️ Masukkan jarak pengiriman yang valid.";
        return;
    }

    // Menghitung harga awal
    const hargaAwal = hargaPerKm * jarak;

    // Menghitung diskon berdasarkan kode promo
    let diskon = 0;
    let pesanPromo = "";

    if (kodePromo === "SATSET10") {
        diskon = hargaAwal * 0.10;
        pesanPromo = "Promo SATSET10 berhasil digunakan!";
    } else if (kodePromo === "") {
        diskon = 0;
        pesanPromo = "Tidak menggunakan kode promo.";
    } else {
        diskon = 0;
        pesanPromo = "Kode promo tidak valid.";
    }

    // Menghitung total pembayaran
    const totalHarga = hargaAwal - diskon;

    // Mengubah angka menjadi format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(angka);
    };

    // Menampilkan hasil perhitungan
    resultBox.innerHTML = `
        <h3>🧾 Rincian Biaya SATSET</h3>
        <p>Harga per km: ${formatRupiah(hargaPerKm)}</p>
        <p>Jarak pengiriman: ${jarak} km</p>
        <p>Harga awal: ${formatRupiah(hargaAwal)}</p>
        <p>Diskon: ${formatRupiah(diskon)}</p>
        <p><strong>${pesanPromo}</strong></p>
        <hr>
        <h2>Total Pembayaran: ${formatRupiah(totalHarga)}</h2>
        <p>Terima kasih telah menggunakan SATSET! ⚡</p>
    `;
});

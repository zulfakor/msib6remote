document.getElementById("pegawai-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Mengambil nilai input dari form
    let nama = document.getElementById("nama").value;
    let jabatan = document.getElementById("jabatan").value;
    let status = document.querySelector('input[name="status"]:checked').value;

    // Menghitung gaji pokok sesuai jabatan
    let gajiPokok;
    switch (jabatan) {
        case "Manager":
            gajiPokok = 15000000;
            break;
        case "Asisten Manager":
            gajiPokok = 10000000;
            break;
        case "Staff":
            gajiPokok = 5000000;
            break;
        default:
            gajiPokok = 0;
    }

    // Menghitung tunjangan jabatan
    let tunjanganJabatan = 0.15 * gajiPokok;

    // Menghitung BPJS
    let bpjs = 0.10 * gajiPokok;

    // Menghitung tunjangan keluarga
    let tunjanganKeluarga = (status === "Menikah") ? (0.20 * gajiPokok) : 0;

    // Menghitung total gaji
    let totalGaji = gajiPokok + tunjanganJabatan - bpjs + tunjanganKeluarga;

    // Menampilkan hasil dalam bentuk tabel
    let output = `
        <h2>Data Pegawai</h2>
        <div class="table-container">
            <table border="1">
                <thead>
                    <tr>
                        <th>Nama Pegawai</th>
                        <th>Jabatan</th>
                        <th>Status</th>
                        <th>Gaji Pokok</th>
                        <th>Tunjangan Jabatan</th>
                        <th>BPJS</th>
                        <th>Tunjangan Keluarga</th>
                        <th>Total Gaji</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${nama}</td>
                        <td>${jabatan}</td>
                        <td>${status}</td>
                        <td>${formatCurrency(gajiPokok)}</td>
                        <td>${formatCurrency(tunjanganJabatan)}</td>
                        <td>${formatCurrency(bpjs)}</td>
                        <td>${formatCurrency(tunjanganKeluarga)}</td>
                        <td>${formatCurrency(totalGaji)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="7">Total Gaji</td>
                        <td>${formatCurrency(totalGaji)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;

    // Menampilkan animasi popup menggunakan sweetAlert dengan isi data pegawai
    swal({
        title: "Terimakasih",
        content: {
            element: "div",
            attributes: {
                innerHTML: output
            },
        },
        icon: "success",
        width: "80%", // Lebarkan animasi popup
    });
});

// Fungsi untuk memformat jumlah uang dalam format mata uang rupiah
function formatCurrency(amount) {
    return "Rp " + amount.toLocaleString("id-ID");
}

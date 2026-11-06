
// Data layanan Puskesmas Sehat
// Data masih hardcode dan nantinya dapat diganti dengan query database.
// Controller dan route tidak perlu diubah.

const daftarProduk = [
  {
    id: 1,
    nama: 'Pemeriksaan Dokter Spesialis',
    kategori: 'Rawat Jalan',
    harga: 90000,
    jadwal: 'Senin - Jumat',
    jam: '08.00 - 12.00 WIB',
  },
  {
    id: 2,
    nama: 'Pemeriksaan Dokter Umum',
    kategori: 'Rawat Jalan',
    harga: 73000,
    jadwal: 'Senin - Jumat',
    jam: '08.00 - 12.00 WIB',
  },
  {
    id: 3,
    nama: 'Pemeriksaan Dokter Gigi',
    kategori: 'Rawat Jalan',
    harga: 75000,
    jadwal: 'Senin - Jumat',
    jam: '08.00 - 12.00 WIB',
  },
  {
    id: 4,
    nama: 'Pemeriksaan Dokter Umum IGD',
    kategori: 'IGD',
    harga: 110000,
    jadwal: 'Sesuai jadwal IGD',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 5,
    nama: 'Konsultasi Spesialis IGD',
    kategori: 'IGD',
    harga: 52000,
    jadwal: 'Sesuai jadwal IGD',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 6,
    nama: 'Konsultasi Dokter Spesialis',
    kategori: 'Rawat Jalan',
    harga: 90000,
    jadwal: 'Senin - Jumat',
    jam: '08.00 - 12.00 WIB',
  },
  {
    id: 7,
    nama: 'Konsultasi VCT',
    kategori: 'Konsultasi',
    harga: 82000,
    jadwal: 'Sesuai jadwal layanan',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 8,
    nama: 'Konseling Narkoba',
    kategori: 'Konsultasi',
    harga: 95000,
    jadwal: 'Sesuai jadwal layanan',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 9,
    nama: 'Konsultasi Gizi dengan Komplikasi',
    kategori: 'Layanan Gizi',
    harga: 28000,
    jadwal: 'Sesuai jadwal layanan',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 10,
    nama: 'Konsultasi Gizi',
    kategori: 'Layanan Gizi',
    harga: 22000,
    jadwal: 'Sesuai jadwal layanan',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 11,
    nama: 'Asesmen Gizi',
    kategori: 'Layanan Gizi',
    harga: 25000,
    jadwal: 'Sesuai jadwal layanan',
    jam: 'Konfirmasi ke Puskesmas',
  },
  {
    id: 12,
    nama: 'Asesmen Keperawatan',
    kategori: 'Keperawatan',
    harga: 25000,
    jadwal: 'Sesuai jadwal layanan',
    jam: 'Konfirmasi ke Puskesmas',
  },
];

const db = require('../config/database');

const ProdukModel = {

    // READ: mengambil semua produk
    async getAll() {
        const result = await db.query(
            'SELECT * FROM produk ORDER BY id ASC'
        );

        return result.rows;
    },

    // READ: mengambil produk berdasarkan ID
    async getById(id) {
        const result = await db.query(
            'SELECT * FROM produk WHERE id = $1',
            [id]
        );

        return result.rows[0] || null;
    },

    // CREATE: menambahkan produk
    async create(data) {
        const result = await db.query(
            `INSERT INTO produk
            (nama, kategori, harga, jadwal, jam)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [
                data.nama,
                data.kategori,
                data.harga,
                data.jadwal,
                data.jam
            ]
        );

        return result.rows[0];
    },

    // UPDATE: mengubah produk
    async update(id, data) {
        const result = await db.query(
            `UPDATE produk
            SET nama = $1,
                kategori = $2,
                harga = $3,
                jadwal = $4,
                jam = $5,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $6
            RETURNING *`,
            [
                data.nama,
                data.kategori,
                data.harga,
                data.jadwal,
                data.jam,
                id
            ]
        );

        return result.rows[0] || null;
    },

    // DELETE: menghapus produk
    async delete(id) {
        const result = await db.query(
            'DELETE FROM produk WHERE id = $1 RETURNING *',
            [id]
        );

        return result.rows[0] || null;
    }
};

module.exports = ProdukModel;
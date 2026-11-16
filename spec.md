# Spesifikasi Produk: Pencatatan Tugas

## Tujuan
Aplikasi web untuk mencatat dan memantau tugas harian/kuliah.

## Pengguna
Mahasiswa atau siapa pun yang ingin mengelola tugas.

## Fitur Wajib
1. Tambah tugas (judul, deskripsi, tenggat, prioritas)
2. Lihat daftar tugas
3. Edit tugas
4. Hapus tugas
5. Tandai tugas selesai / belum selesai
6. Filter berdasarkan status (semua, belum, selesai)

## Data Tugas (tabel `tasks` di Supabase)
| Kolom       | Tipe        | Keterangan                   |
|-------------|-------------|------------------------------|
| id          | uuid        | Primary key                  |
| title       | text        | Judul tugas                  |
| description | text        | Deskripsi (opsional)         |
| due_date    | date        | Tenggat                      |
| priority    | text        | rendah / sedang / tinggi     |
| is_done     | boolean     | Default false                |
| created_at  | timestamptz | Default now()                |

## Di Luar Cakupan
- Login/registrasi
- Notifikasi
- Kolaborasi multi-pengguna
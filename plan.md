# Peta Rencana: Pencatatan Tugas

Status: [ ] belum | [~] dikerjakan | [x] selesai

## Tahap 1: Persiapan Lingkungan
- [x] Install Node.js dan Git
- [x] Buat proyek React dengan Vite (`npm create vite@latest`)
- [x] Jalankan proyek dan pastikan tampil di browser
- [x] Buat repo di GitHub
- [x] Hubungkan proyek lokal ke GitHub (`git init`, `git remote add`, push pertama)
- [x] Buat `.gitignore` (pastikan `.env` dan `node_modules` masuk)

## Tahap 2: Setup Database (Supabase)
- [ ] Buat akun dan proyek baru di Supabase
- [~] Buat tabel `tasks` sesuai `spec.md` (migration siap; perlu dijalankan pada project)
- [~] Atur Row Level Security (RLS) dan policy dasar (migration siap; perlu dijalankan pada project)
- [~] Isi beberapa data contoh untuk uji coba (seed di migration)
- [ ] Salin Project URL dan anon key
- [ ] Buat file `.env` berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (menunggu URL/key project)
- [x] Install `@supabase/supabase-js`
- [x] Buat file `src/lib/supabase.js` untuk koneksi

## Tahap 3: Struktur Aplikasi
- [ ] Rancang struktur folder (`components/`, `pages/`, `lib/`, `hooks/`)
- [ ] Buat sketsa tampilan sederhana (daftar tugas, form, filter)
- [ ] Buat komponen `Header`
- [ ] Buat komponen `TaskList`
- [ ] Buat komponen `TaskItem`
- [ ] Buat komponen `TaskForm`
- [ ] Buat komponen `FilterBar`

## Tahap 4: Fitur Inti (CRUD)
- [ ] Read: ambil dan tampilkan semua tugas dari Supabase
- [ ] Create: form tambah tugas dan simpan ke database
- [ ] Update: edit judul, deskripsi, tenggat, prioritas
- [ ] Delete: hapus tugas dengan konfirmasi
- [ ] Toggle: tandai selesai / belum selesai
- [ ] Tampilkan status loading dan pesan error

## Tahap 5: Fitur Tambahan
- [ ] Filter berdasarkan status (semua, belum, selesai)
- [ ] Urutkan berdasarkan tenggat atau prioritas
- [ ] Penanda warna untuk prioritas
- [ ] Penanda tugas yang lewat tenggat
- [ ] Pencarian tugas berdasarkan judul

## Tahap 6: Validasi dan Kualitas
- [ ] Validasi form (judul wajib diisi, tenggat tidak boleh kosong)
- [ ] Pesan error yang ramah pengguna
- [ ] Cek tampilan di HP, tablet, dan desktop
- [ ] Uji semua fitur secara manual
- [ ] Rapikan kode dan hapus `console.log`

## Tahap 7: Tampilan (UI)
- [ ] Tentukan palet warna dan font
- [ ] Rapikan layout dan jarak antar elemen
- [ ] Tambah ikon dan efek hover
- [ ] Tambah tampilan kosong ("Belum ada tugas")

## Tahap 8: Deploy
- [ ] Push semua kode ke GitHub
- [~] Hubungkan repo ke Vercel (konfigurasi siap; menunggu GitHub App Vercel diizinkan)
- [ ] Isi environment variables di Vercel
- [ ] Deploy dan cek link publik
- [ ] Uji ulang semua fitur di versi online

## Tahap 9: Dokumentasi dan Penutup
- [ ] Tulis `README.md` (deskripsi, cara menjalankan, link demo)
- [ ] Ambil screenshot aplikasi
- [ ] Perbarui `history/` dengan ringkasan akhir
- [ ] Siapkan bahan presentasi/laporan
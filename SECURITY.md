# Kebijakan Keamanan

Repo ini berisi eksperimen platform resep masakan (Luminaire Kitchen). Aplikasi Next.js dengan Prisma, jadi butuh database PostgreSQL dan kunci rahasia di `.env`.

## Melaporkan celah

- **Jangan** membuka issue publik untuk masalah keamanan.
- Kirim email ke **nugrahaagfarizky@gmail.com** dengan subjek `[SECURITY] luminaire`.
- Sertakan langkah reproduksi, dampak, dan saran perbaikan kalau ada.

Balasan diusahakan dalam **7 hari**.

## Cakupan

| Termasuk | Tidak termasuk |
| --- | --- |
| Kode di repo ini | Layanan pihak ketiga: database, Unsplash (gambar) |

## Kunci rahasia

Kredensial database dan isi `.env` tidak boleh ter-commit. Kalau bocor, ganti kredensialnya.

## Versi yang didukung

Hanya branch `main`.
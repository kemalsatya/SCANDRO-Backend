# Project Picasso

> _Project ini dibuat untuk memenuhi tugas SC BackEnd_

## Cara Menjalankan Server

> [!NOTE]
> Clone repository project ini, apabila belum ada

```bash
git clone https://github.com/kemalsatya/SCANDRO-Backend.git
```

- Gunakan command dibawah untuk inisialisasi

```
npm install
```

- Untuk memulai server, gunakan command ini

```
npm start
```

## Penjelasan Endpoint

### Endpoint Utama

**1. GET /paintings**

Mengambil semua data lukisan ataupun dengan query parameter untuk mengambil data lukisan dengan filter tertentu.

**2. GET /paintings/:id**

Mengambil satu data lukisan berdasarkan Id

**3. POST /paintings**

Menambahkan satu data lukisan baru

**4. PATCH /paintings/:id**

Memperbarui data lukisan parsial ataupun utuh berdasarkan id

**5. DELETE /paintings/:id**

Menghapus data lukisan berdasarkan id

### Endpoint Penunjang

**1. GET /paintings/templateData**

Mengambil template atau schema data lukisan dari database

**2. GET /paintings/docs**

Melihat panduan penggunaan semua endpoint API utama

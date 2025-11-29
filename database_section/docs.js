// docs.js - API Documentation (JSON format)

let docs = {
  info: "Manajemen Pameran Lukisan API Documentation",
  version: "1.0.0",
  endpoints: {
    getAllPaintings: {
      method: "GET",
      url: "/paintings",
      description: "Mengambil semua data lukisan. Dapat menggunakan filter opsional.",
      filters: {
        artist: "string (opsional)",
        year: "number (opsional)",
        year_min: "number (opsional, filter tahun minimal)",
        year_max: "number (opsional, filter tahun maksimal)",
        price: "number (opsional)",
        price_min: "number (opsional, harga minimal)",
        price_max: "number (opsional, harga maksimal)",
        style: "string (opsional)",
        country: "string (opsional)"
      },
      example: {
        request: "/paintings?artist=van gogh&year=1889",
        response: "Array of paintings"
      }
    },

    getPaintingById: {
      method: "GET",
      url: "/paintings/:id",
      description: "Mengambil satu data lukisan berdasarkan ID.",
      example: {
        request: "/paintings/3",
        response: {
          id: 3,
          title: "Example Painting",
          artist: "Artist Name",
          year: 1800
        }
      }
    },

    addPainting: {
      method: "POST",
      url: "/paintings",
      description: "Menambahkan lukisan baru. Semua field wajib kecuali ID.",
      body_required: {
        title: "string (required)",
        artist: "string (required)",
        year: "number (required)",
        style: "string (required)",
        location: "string (required)",
        description: "string (required)",
        price: "number (required)",
        country: "string (required)"
      },
      example: {
        request: {
          title: "Mona Lisa",
          artist: "Leonardo da Vinci",
          year: 1503,
          style: "Renaissance",
          location: "Louvre Museum",
          description: "A famous portrait painting.",
          price: 860,
          country: "Italy"
        }
      }
    },

    updatePainting: {
      method: "PATCH",
      url: "/paintings/:id",
      description: "Mengupdate sebagian data lukisan. Hanya field yang dikirim yang diperbarui.",
      warning: "Field ID tidak boleh diubah.",
      example: {
        request: {
          year: 1510,
          description: "Updated description"
        }
      }
    },

    deletePainting: {
      method: "DELETE",
      url: "/paintings/:id",
      description: "Menghapus satu data lukisan berdasarkan ID.",
      example: {
        request: "/paintings/5",
        response: { message: "Painting deleted successfully" }
      }
    }
  }
};

export default docs;
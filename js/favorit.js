// Variabel untuk menyimpan daftar favorit
const favorites = [];

// Fungsi untuk menambahkan produk ke daftar favorit
function addToFavorites(product) {
  // Cek apakah produk sudah ada dalam daftar favorit
  if (!favorites.some((favProduct) => favProduct.id === product.id)) {
    favorites.push(product);
    // Simpan daftar favorit di localStorage jika Anda inginkan
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}

// Fungsi untuk membuat kartu produk dan menambahkan ke daftar favorit saat ikon hati diklik
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = product.id; // Atur atribut id

  card.innerHTML = `
    <div class="add-actives">
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}" class="img">
      </div>
      <div class="card-body">
        <div class="card-text">
          <p>${product.name}</p>
          <h4>${product.description}</h4>
        </div>
      </div>
      <a onclick="toggleIcon('heartIcon${product.id}', 'fa-regular', 'fa-solid', '#db0f0f')" class="icon">
      <i id="heartIcon${product.id}" class="fa-regular fa-heart" style="color: #ff0000;"></i>
    </a>
      <a class="icon" href="detail-product.html"><i class="bi bi-cart3" style="color: #93019d;"></i></a>
    </div>
  `;

  return card;
}

// Contoh penggunaan
const product1 = {
  id: 1,
  name: "Nike Air Max",
  description: "Running Sneaker Shoes",
  image: "images/product-1.png",
};

const productCard1 = createProductCard(product1);

// Menambahkan kartu produk ke dalam dokumen (DOM)
document.getElementById("produk-container").appendChild(productCard1);

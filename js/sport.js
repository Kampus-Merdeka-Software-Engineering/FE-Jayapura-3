var Sport = [
  {
    id: 41,
    name: "Nike Infinity",
    description: "Road Running Shoes",
    image: "images/Sports Shoes/product-41.png",
  },
  {
    id: 42,
    name: "Nike Alphafly",
    description: "Road Racing Shoes",
    image: "images/Sports Shoes/product-42.png",
  },
  {
    id: 43,
    name: "Nike InfinityRN SE",
    description: "Road Running Shoes",
    image: "images/Sports Shoes/product-43.png",
  },
  {
    id: 44,
    name: "Puma RUN NITRO",
    description: "Running Shoes",
    image: "images/Sports Shoes/product-44.png",
  },
  {
    id: 45,
    name: "Puma Fuse 2.0",
    description: "Running Shoes",
    image: "images/Sports Shoes/product-45.png",
  },
  {
    id: 46,
    name: "Puma Training Infusion",
    description: "Running Shoes",
    image: "images/Sports Shoes/product-46.png",
  },
  {
    id: 47,
    name: "Adidas x Stella Mccartney",
    description: "Running Shoes",
    image: "images/Sports Shoes/product-47.png",
  },
  {
    id: 48,
    name: "Adidas Duramo Speed",
    description: "Running Shoes",
    image: "images/Sports Shoes/product-48.png",
  },
];


// Function untuk membuat daftar produk dalam bentuk card
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card2");
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

 // Function untuk menambahkan produk ke dalam halaman HTML
function addProductsToPage() {
    const SportList = document.querySelector(".sport-product");
    Sport.forEach((product) => {
      const productCard = createProductCard(product);
      SportList.appendChild(productCard);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    console.log("Halaman telah dimuat sepenuhnya.");
  
    // Panggil fungsi untuk menambahkan produk ke halaman HTML
    addProductsToPage();
  });

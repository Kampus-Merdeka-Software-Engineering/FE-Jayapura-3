
  const Men = [
    {
      id: 33,
      name: "Puma Enzo",
      description: "Daily Sneakers Shoes",
      image: "images/mens shoes/product-33.png",
    },
    {
      id: 34,
      name: "Puma Resolve Smooth",
      description: "Daily Sneakers Shoes",
      image: "images/mens shoes/product-34.png",
    },
    {
      id: 35,
      name: "Puma Softride Enzo",
      description: "Running Shoes",
      image: "images/mens shoes/product-35.png",
    },
    {
      id: 36,
      name: "Adidas Air Jordan 7 Retro",
      description: "Air Jordan 7 Retro",
      image: "images/mens shoes/product-36.png",
    },
    {
      id: 37,
      name: "Adidas Running Shoes",
      description: "Running Shoes",
      image: "images/mens shoes/product-37.png",
    },
    {
      id: 38,
      name: "Nike Air Jordan",
      description: "Daily Shoes",
      image: "images/mens shoes/product-38.png",
    },
    {
      id: 39,
      name: "Nike Air Max",
      description: "Running Shoes",
      image: "images/mens shoes/product-39.png",
    },
    {
      id: 40,
      name: "Nike Air Max",
      description: "Running Shoes",
      image: "images/mens shoes/product-40.png",
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
const MenList = document.querySelector(".men-product");
      Men.forEach((product) => {
        const productCard = createProductCard(product);
        MenList.appendChild(productCard);
      });
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Halaman telah dimuat sepenuhnya.");
    
      // Panggil fungsi untuk menambahkan produk ke halaman HTML
      addProductsToPage();
    });
  
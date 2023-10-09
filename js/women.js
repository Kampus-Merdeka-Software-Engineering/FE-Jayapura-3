const Women = [
    {
      id: 14,
      name: "Nike Air Jordan",
      description: "Daily Sneakers Shoes",
      image: "images/Women Shoes/product-14.png",
    },
    {
      id: 15,
      name: "Nike Air Jordan",
      description: "Daily Sneakers Shoes",
      image: "images/Women Shoes/product-15.png",
    },
    {
      id: 16,
      name: "Adidas Supperstar XLG",
      description: "Daily Shoes Shoes",
      image: "images/Women Shoes/product-16.png",
    },
    {
      id: 17,
      name: "Adidas Court Shoes",
      description: "Daily Shoes",
      image: "images/Women Shoes/product-17.png",
    },
    {
      id: 18,
      name: "Puma Enzo 2",
      description: "Running Shoes",
      image: "images/Women Shoes/product-18.png",
    },
    {
      id: 19,
      name: "Puma Better Foam Adore",
      description: "Running Shoes",
      image: "images/Women Shoes/product-19.png",
    },
    {
      id: 20,
      name: "Nike Air Max",
      description: "Running Shoes",
      image: "images/Women Shoes/product-20.png",
    },
    {
      id: 21,
      name: "Nike Air Max",
      description: "Running Shoes",
      image: "images/Women Shoes/product-21.png",
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
      const WomenList = document.querySelector(".women-product");
      Women.forEach((product) => {
        const productCard = createProductCard(product);
        WomenList.appendChild(productCard);
      });
  
    }
  
    document.addEventListener("DOMContentLoaded", function () {
      console.log("Halaman telah dimuat sepenuhnya.");
    
      // Panggil fungsi untuk menambahkan produk ke halaman HTML
      addProductsToPage();
    });
  
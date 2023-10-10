// Data produk dalam bentuk array
// const products = [
//   {
//     id: 1,
//     name: "Nike Air Max",
//     description: "Running Sneaker Shoes",
//     image: "images/product-1.png",
//   },
//   {
//     id: 2,
//     name: "Nike Air Max",
//     description: "Leather Mens Slipper",
//     image: "images/product-2.png",
//   },
//   {
//     id: 3,
//     name: "Nike Air Max",
//     description: "Simple Fabric Shoe",
//     image: "images/product-3.png",
//   },
//   {
//     id: 4,
//     name: "Nike Air Max",
//     description: "Air Jordan 7 Retro",
//     image: "images/product-4.png",
//   },
//   {
//     id: 5,
//     name: "Nike Air Max",
//     description: "Nike Air Max 270 SE",
//     image: "images/product-5.png",
//   },
//   {
//     id: 6,
//     name: "Adidas Air Max",
//     description: "Adidas Sneakers Shoes",
//     image: "images/product-6.png",
//   },
//   {
//     id: 7,
//     name: "Nike Air Max",
//     description: "Nike Basketball shoes",
//     image: "images/product-7.png",
//   },
//   {
//     id: 8,
//     name: "Nike Air Max",
//     description: "Simple Fabric Shoe",
//     image: "images/product-8.png",
//   },
// ];

import { useFetch } from "/js/lib/fetch.js";

const carts = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const special = [
  {
    id: 9,
    name: "Nike Air Max",
    description: "Running Sneaker Shoes",
    image: "images/product-9.png",
  },
  {
    id: 10,
    name: "Nike Air Max",
    description: "Running Sneaker Shoes",
    image: "images/product-10.png",
  },
  {
    id: 11,
    name: "Nike Air Max",
    description: "Running Sneaker Shoes",
    image: "images/product-11.png",
  },
  {
    id: 12,
    name: "Nike Air Max",
    description: "Running Sneaker Shoes",
    image: "images/product-12.png",
  },
];

// Function untuk membuat daftar produk dalam bentuk card
function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");
  const isProductInCart = carts.find((cart) => product.id === cart.id);
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
      <a onclick="toggleIcon('heartIcon${
        product.id
      }', 'fa-regular', 'fa-solid', '#db0f0f')" class="icon">
      <i id="heartIcon${
        product.id
      }" class="fa-regular fa-heart" style="color: #ff0000;"></i>
    </a>
    <a class="icon" href='${
      isProductInCart
        ? "checkout.html"
        : "detail-product.html?id=" + product.id
    }'>
      ${
        isProductInCart
          ? '<i class="bi bi-bag-check-fill"></i>'
          : ' <i class="bi bi-cart3" style="color: #93019d;"></i>'
      }
    </a>
    </div>
  `;

  return card;
}

// Function untuk menambahkan produk ke dalam halaman HTML
async function addProductsToPage() {
  const productList = document.querySelector(".list-product");

  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const products = data.data;

  products.forEach((product) => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });

  const specialList = document.querySelector(".product-special");

  special.forEach((product) => {
    const productCard = createProductCard(product);
    const listItem = document.createElement("li");
    listItem.classList.add("product-item");
    listItem.appendChild(productCard);
    specialList.appendChild(listItem);
  });
}

// Event listener untuk halaman telah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", function () {
  console.log("Halaman telah dimuat sepenuhnya.");

  // Panggil fungsi untuk menambahkan produk ke halaman HTML
  addProductsToPage();
});

import { getQueryParams } from "/js/lib/url.js";
import { HTTPErrors } from "/js/lib/auth.js";
import { useFetch } from "/js/lib/fetch.js";
import { setQueryParams, removeQueryParams } from "/js/lib/url.js";
const products = [];
const carts = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const searchField = document.querySelector("#search-field");

const dailyElement = document.querySelector("#daily");
const sportElement = document.querySelector("#sports");
const menElement = document.querySelector("#men");
const womenElement = document.querySelector("#women");
const unisexElement = document.querySelector("#unisex");
const nikeElement = document.querySelector("#nike");
const adidasElement = document.querySelector("#adidas");
const reebookElement = document.querySelector("#reebok");

const toggleBtn = (event) => {
  const id = event.target.id;
  const name = event.target.name;
  let query = "";
  if (event.target.checked === true && name !== "gender") {
    query = setQueryParams(name, id);
  } else {
    query = removeQueryParams(name);
    if (name === "gender") {
      query += "&gender=" + id;
    }
  }
  window.location.search = query;
};

dailyElement.addEventListener("click", toggleBtn);
sportElement.addEventListener("click", toggleBtn);
menElement.addEventListener("click", toggleBtn);
womenElement.addEventListener("click", toggleBtn);
unisexElement.addEventListener("click", toggleBtn);
nikeElement.addEventListener("click", toggleBtn);
adidasElement.addEventListener("click", toggleBtn);
reebookElement.addEventListener("click", toggleBtn);

document.querySelector("#size36").addEventListener("click", toggleBtn);
document.querySelector("#size37").addEventListener("click", toggleBtn);
document.querySelector("#size38").addEventListener("click", toggleBtn);
document.querySelector("#size39").addEventListener("click", toggleBtn);
document.querySelector("#size40").addEventListener("click", toggleBtn);
document.querySelector("#size41").addEventListener("click", toggleBtn);
document.querySelector("#size42").addEventListener("click", toggleBtn);
document.querySelector("#size43").addEventListener("click", toggleBtn);
document.querySelector("#size44").addEventListener("click", toggleBtn);

searchField.addEventListener("keyup", function (event) {
  const searchValue = event.target.value;
  console.log(searchValue);

  addProductsToPage(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  );
});

console.log(searchField);

// Function untuk membuat daftar produk dalam bentuk card
export function createProductCard(product) {
  const isProductInCart = carts.find((cart) => product.id === cart.id);
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
async function addProductsToPage(data) {
  const productList = document.querySelector(".list-product2");
  productList.innerHTML = "";
  data.forEach((product) => {
    const productCard = createProductCard(product);
    productList.appendChild(productCard);
  });
}

// Event listener untuk halaman telah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", async function () {
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).catch((error) => HTTPErrors(error.response));

  products.push(...data.data);
  addProductsToPage(filterProductsByQuery(products));
});

function filterProductsByQuery(arr) {
  const { category, brand, gender, size } = getQueryParams();

  return filterProducts(category, brand, gender, size);
}

function filterProducts(
  category = false,
  brand = false,
  gender = false,
  size = false
) {
  let arr = products;
  if (category) {
    console.log(category);
    const cate = category.split(",");

    cate.forEach((cat) => {
      console.log(cat);
      document.getElementById(cat).checked = true;
    });

    arr = arr.filter((product) => cate.includes(product.category));
  }

  if (brand) {
    const cate = brand.split(",");

    cate.forEach((cat) => {
      document.getElementById(cat).checked = true;
    });

    arr = arr.filter((product) => cate.includes(product.brand));
  }

  if (gender) {
    gender = gender.split(",")[0];
    document.getElementById(gender).checked = true;
    arr = arr.filter((product) => product.gender === gender);
  }

  if (size) {
    size = size.split(",");
    size.forEach((s) => {
      document.getElementById(s).checked = true;
      arr = arr.filter((product) =>
        product.sizes.split(",").includes(s.replace("size", ""))
      );
    });
  }

  console.log(arr);

  return arr;
}

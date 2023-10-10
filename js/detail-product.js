import { getQueryParams } from "/js/lib/url.js";
import { useFetch } from "/js/lib/fetch.js";

function createProductElement(product) {
  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <td>
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
      </td>
      <td>
        <div class="product-details">
          <h1>${product.name}</h1>
          <p>Deskripsi Produk: ${product.description}</p>
          <p>Harga: $${product.price}</p>
          <label for="size">Ukuran:</label>
          <select id="size">
            ${createSizeOptions(product.sizes)}
          </select>
          <label for="quantity">Jumlah:</label>
          <div class="con-btn">
            <div class="con-input-btns">
              <button onclick="plusLess(event,'less')" class="less">
                <i class="fa-solid fa-minus"></i>
              </button>
              <input type="text" id="quantity" value="1">
              <button onclick="plusLess(event,'plus')" class="plus">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <button class="add" id="add-to-cart">Add to Cart</button>
        </div>
      </td>
    </tr>
  `;

  return table;
}

function createSizeOptions(sizes) {
  let options = "";
  sizes.forEach((size) => {
    options += `<option value="${size}">${size}</option>`;
  });
  return options;
}

async function addToCart(product) {
  const size = document.getElementById("size").value;
  const quantity = document.getElementById("quantity").value;

  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      product_id: product.id,
      size,
      quantity,
    }),
  });

  if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify([product]));
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify([...JSON.parse(localStorage.getItem("cart")), product])
    );
  }

  window.location.href = "/checkout.html";
}

document.addEventListener("DOMContentLoaded", async function () {
  const { id } = getQueryParams();

  const { data } = await useFetch(`https://be-jayapura-3-production.up.railway.app/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  data.data.sizes = data.data.sizes.split(",");

  // Panggil fungsi createProductElement dan tambahkan elemen produk ke dalam kontainer
  const productElement = createProductElement(data.data);
  const productContainer = document.getElementById("productContainer");
  productContainer.appendChild(productElement);

  const addBtn = document.querySelector("#add-to-cart");

  addBtn.addEventListener("click", async function () {
    addToCart(data.data);
  });
});
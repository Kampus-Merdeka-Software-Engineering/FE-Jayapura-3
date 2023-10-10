import { useFetch } from "/js/lib/fetch.js";

const carts = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const buyBtn = document.querySelector("#buy-btn");

buyBtn.addEventListener("click", async () => {
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/cart/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).catch((err) => console.log(err));

  if (data.success) {
    alert("Checkout Success");
    localStorage.removeItem("cart");

    localStorage.getItem("recent-purchases")
      ? localStorage.setItem(
          "recent-purchases",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("recent-purchases")),
            ...carts,
          ])
        )
      : localStorage.setItem("recent-purchases", JSON.stringify(carts));
    window.location.replace("/index.html");
  }
});

async function deleteFromCart(id) {
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/cart/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ product_id: id }),
  }).catch((err) => console.log(err));

  if (data.success) {
    localStorage.setItem(
      "cart",
      JSON.stringify(
        JSON.parse(localStorage.getItem("cart"))?.filter(
          (product) => product.id !== id
        )
      )
    );
    window.location.reload();
  }
}

async function updateQuantity(id, quantity) {
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/cart/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({ product_id: id, quantity: quantity }),
  }).catch((err) => console.log(err));

  if (data.success) {
    window.location.reload();
  }
}

const createProductCheckout = (product) => {
  return `
  <tr>
    <td>
      <div class="cart-info">
      <img src="${product.image}">
        <p>Running Sneaker Shoes</p>
        </div>
        </div>
        </td>
          <td>${product.size}</td>
          <td><input id="qty${product.id}" class="qty" type="number" value="${product.quantity}"></td>
          <td>$${product.price}</td>
          <td><button id="product${product.id}" class="btn btn-danger">Remove</button></td>
  </tr>
`;
};

const renderPricing = async () => {
  const subTotal = document.getElementById("sub-total");
  const tax = document.getElementById("tax");
  const shipping = document.getElementById("shipping");
  const total = document.getElementById("total");

  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/cart/total", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).catch((err) => console.log(err));

  shipping.innerText = "$" + data.shipementCost;
  subTotal.innerText = "$" + data.subTotal;
  tax.innerText = "$" + data.tax;
  total.innerText = "$" + data.total;
};

window.onload = async () => {
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).catch((err) => console.log(err));

  const cartTable = document.getElementById("cart-table");

  console.log(data.data);

  data.data.forEach((product) => {
    const productElement = createProductCheckout(product);

    cartTable.insertAdjacentHTML("beforeend", productElement);
    document
      .getElementById(`product${product.id}`)
      .addEventListener("click", () => {
        deleteFromCart(product.id);
      });

    document
      .getElementById(`qty${product.id}`)
      .addEventListener("change", (e) => {
        updateQuantity(product.id, e.target.value);
      });
  });

  return renderPricing();
};

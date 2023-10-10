import { useFetch } from "/js/lib/fetch.js";
const carts = localStorage.getItem("cart");
const recents = localStorage.getItem("recent-purchases");

const usernameElemet = document.querySelector("#username");
const emailElemet = document.querySelector("#email");
const totalPurchase = document.querySelector("#total-purchases");
const totalCart = document.querySelector("#total-cart");
const editBtn = document.querySelector("#btn-edit");
const formEdit = document.querySelector("#form-edit");
const recentWrapper = document.querySelector("#recent-wrapper");

editBtn.addEventListener("click", () => {
  formEdit.classList.toggle("d-none");
});

export function createProductCard(product) {
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
      <a class="icon" style="text-decoration:none;color:black" href='${
        "detail-product.html?id=" + product.id
      }'>Buy Again
    </a>
    </div>
  `;

  return card;
}

formEdit.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      username: formEdit["username"].value,
      email: formEdit["email"].value,
    }),
  }).catch((err) => {
    return alert(err.data.error);
  });

  alert(data.message);
  window.location.reload();
});

window.onload = async () => {
  const { data } = await useFetch("https://be-jayapura-3-production.up.railway.app/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).catch((err) => console.log(err));

  usernameElemet.innerText = data.data.username;
  emailElemet.innerText = data.data.email;
  formEdit["username"].value = data.data.username;
  formEdit["email"].value = data.data.email;

  totalCart.innerText = carts ? JSON.parse(carts).length : 0;
  totalPurchase.innerText = recents ? JSON.parse(recents).length : 0;

  if (recents) {
    JSON.parse(recents).forEach((product) => {
      const productCard = createProductCard(product);
      recentWrapper.appendChild(productCard);
    });
  }
};

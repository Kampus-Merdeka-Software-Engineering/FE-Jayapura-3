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
          <button class="add" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
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

function addToCart(productName, productPrice) {
  const size = document.getElementById("size").value;
  const quantity = document.getElementById("quantity").value;
  // Lakukan logika untuk menambahkan produk ke keranjang di sini.
}

document.addEventListener("DOMContentLoaded", function () {
  // Objek produk contoh
  const product = {
    name: "Running Sneaker Shoes",
    description: "Deskripsi Produk: Lorem ipsum dolor sit amet...",
    price: 99.99,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    image: "images/product-1.png",
  };

  // Panggil fungsi createProductElement dan tambahkan elemen produk ke dalam kontainer
  const productElement = createProductElement(product);
  const productContainer = document.getElementById("productContainer");
  productContainer.appendChild(productElement);
});

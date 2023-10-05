var cartData = [
    {
        imageSrc: "images/product-11.png",
        item: "Running Sneaker Shoes",
        size: 42,
        quantity: 1,
        price: 99
    },
    {
        imageSrc: "images/product-9.png",
        item: "Running Sneaker Shoes",
        size: 42,
        quantity: 1,
        price: 99
    }
];

function addProductsToPage() {
    // Mengisi tabel keranjang belanja dengan data dari array
    var cartTable = document.getElementById("cart-table");
    var subtotal = 0;

    cartData.forEach(function (itemData) {
        var row = cartTable.insertRow(-1);

        // Kolom Gambar dan Nama Barang
        var imageAndNameCell = row.insertCell(0);
        
        // Buat sebuah div untuk menggabungkan gambar dan nama barang
        var imageAndNameDiv = document.createElement("div");

        // Tambahkan gambar
        var image = document.createElement("img");
        image.src = itemData.imageSrc;
        imageAndNameDiv.appendChild(image);

        // Tambahkan nama barang
        var itemName = document.createElement("p");
        itemName.textContent = itemData.item;
        imageAndNameDiv.appendChild(itemName);

        // Tambahkan div ke dalam kolom
        imageAndNameCell.appendChild(imageAndNameDiv);

        // Kolom Ukuran
        var sizeCell = row.insertCell(1);
        sizeCell.innerHTML = itemData.size;

        // Kolom Kuantitas
        var quantityCell = row.insertCell(2);
        quantityCell.innerHTML = '<input class="qty" type="number" value="' + itemData.quantity + '">';

        // Kolom Harga
        var priceCell = row.insertCell(3);
        priceCell.innerHTML = '$' + itemData.price;

        subtotal += itemData.price;
    });

    // Mengisi subtotal, pengiriman, dan pajak
    var shipping = 20;
    var tax = 0;
    var total = subtotal + shipping + tax;

    document.getElementById("subtotal").textContent = '$' + subtotal;
    document.getElementById("shipping").textContent = '$' + shipping;
    document.getElementById("tax").textContent = '$' + tax;
    document.getElementById("total").textContent = '$' + total;
}



// Event listener untuk halaman telah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", function () {
    console.log("Halaman telah dimuat sepenuhnya.");
    addProductsToPage(); // Panggil fungsi untuk menambahkan produk ke halaman HTML
});

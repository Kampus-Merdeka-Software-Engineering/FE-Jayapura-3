function toggleIcon(iconId, currentClass, newClass, newColor) {
  const icon = document.getElementById(iconId);

  if (icon.classList.contains(currentClass)) {
    icon.classList.remove(currentClass);
    icon.classList.add(newClass);
    icon.style.color = newColor;
  } else {
    icon.classList.remove(newClass);
    icon.classList.add(currentClass);
    icon.style.color = "#ff0000";
  }
}

function plusLess(event, action) {
  event.preventDefault();
  var quantityInput = document.getElementById("quantity");
  var quantity = parseInt(quantityInput.value);

  if (action === "plus") {
    quantity++;
  } else if (action === "less" && quantity > 1) {
    quantity--;
  }

  quantityInput.value = quantity;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "userLogin.html";
}

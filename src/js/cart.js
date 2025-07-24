import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = "<h2>The cart is empty.</h2>";
    cartFooter.classList.add("hide");
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  productList.innerHTML = htmlItems.join("");

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images?.PrimaryMedium || '../images/default.jpg'}"
      alt="${item.Name}"
    >
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

function addToCart(id, title, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id,
    title,
    price: Number(price)
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Producto agregado al carrito 🛒");
}

document.addEventListener("DOMContentLoaded", () => {

  if (window.location.pathname === "/cart") {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-container");

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = "<p>No hay productos en el carrito.</p>";
      return;
    }

    let total = 0;
    container.innerHTML = "";

    cart.forEach(prod => {
      total += prod.price;

      container.innerHTML += `
        <div class="card">
          <h3>${prod.title}</h3>
          <p>$ ${prod.price}</p>
        </div>
      `;
    });

    container.innerHTML += `
      <h2>Total: $ ${total}</h2>
    `;
  }

});
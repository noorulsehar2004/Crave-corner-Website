//Get cart items from localStorage or initialize as empty array if nothing stored
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get references to HTML elements for displaying cart items and total
const cartDiv = document.getElementById("cartItems");
const totalSpan = document.getElementById("total");

let total = 0;
// If cart is empty, show a message
if (cart.length === 0) {
  cartDiv.innerHTML = "<p class='text-center'>Your cart is empty</p>";
} else {
  cart.forEach((item, index) => {
    total += item.price;

    cartDiv.innerHTML += `
      <div class="border p-2 mb-2 d-flex justify-content-between">
        <div>
          <strong>${item.name}</strong><br>
          Rs ${item.price}
        </div>
        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">X</button>
      </div>
    `;
  });
}

totalSpan.innerText = total;

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function confirmOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  //save for receipt
  localStorage.setItem("orderItems", JSON.stringify(cart));
  localStorage.setItem("totalAmount", total);

  fetch("http://localhost:3000/place-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: localStorage.getItem("currentUser") || "guest",
      items: cart,
      total: total
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Order Response:", data);

    if (data.success) {
      window.location.href = "receipt.html";
    } else {
      alert("Order failed");
    }
  })
  .catch(err => {
    console.error("Order error:", err);
  });
}


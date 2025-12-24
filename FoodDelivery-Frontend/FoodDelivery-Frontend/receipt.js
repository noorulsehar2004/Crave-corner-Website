// Wait until the page content is fully loaded
document.addEventListener("DOMContentLoaded", () => {

// Get order items and total amount from localStorage
  const items = JSON.parse(localStorage.getItem("orderItems")) || [];
  const total = Number(localStorage.getItem("totalAmount")) || 0;
 
// Get references to receipt container and total span
  const receiptDiv = document.getElementById("receiptItems");
  const totalDiv = document.getElementById("receiptTotal");

// Check if there are any items in the order
  if (items.length === 0) {
    receiptDiv.innerHTML = "<p class='text-center'>No items found</p>";
  } else { // Loop through each item and display it
    items.forEach(item => {
      receiptDiv.innerHTML += `
        <div class="receipt-item">
          <span>${item.name}</span>
          <span>Rs ${item.price}</span>
        </div>
      `;
    });
  }
// Display total amount
  totalDiv.innerText = total;
// Clear cart and order data from localStorage after short delay
  setTimeout(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("orderItems");
    localStorage.removeItem("totalAmount");
  }, 500);

});

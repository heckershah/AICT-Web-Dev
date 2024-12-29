document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalCostElement = document.getElementById("total-cost");
    const orderForm = document.getElementById("order-form");
    const DELIVERY_PRICE = 5.0;
  
    // Render Cart Items
    function renderCart() {
      cartTableBody.innerHTML = "";
      let totalCost = 0;
  
      if (cartItems.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `
                  <td colspan="4" style="text-align: center;">Your cart is empty.</td>
              `;
        cartTableBody.appendChild(emptyRow);
        totalCostElement.textContent = `$${DELIVERY_PRICE.toFixed(2)}`;
        return;
      }
  
      cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;
  
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${item.title}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>${item.quantity}</td>
                  <td>$${itemTotal.toFixed(2)}</td>
              `;
        cartTableBody.appendChild(row);
      });
  
      totalCostElement.textContent = `$${(totalCost + DELIVERY_PRICE).toFixed(
        2
      )}`;
    }
  
    // Validate Order Form
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent form submission
  
      // Get form inputs
      const name = document.getElementById("name").value.trim();
      const address = document.getElementById("address").value.trim();
      const email = document.getElementById("email").value.trim();
      const terms = document.getElementById("terms").checked;
  
      // Validate inputs
      if (!name || !address || !email) {
        alert("All fields are required.");
        return;
      }
  
      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      if (!terms) {
        alert("You must agree to the privacy and policy to place the order.");
        return;
      }
  
      // If all validations pass
      alert("Order placed successfully!");
      localStorage.removeItem("cart"); // Clear the cart
      window.location.href = "index.html"; // Redirect to home page
    });
  
    // Utility function to validate email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    renderCart();
  });
  
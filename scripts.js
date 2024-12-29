document.addEventListener("DOMContentLoaded", () => {
    // Utility function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Newsletter Form Validation and Submission
    const newsletterForm = document.getElementById("newsletter-form");
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailValue = emailInput.value.trim();

            if (!isValidEmail(emailValue)) {
                errorMessage.textContent = "Please enter a valid email address.";
                errorMessage.style.display = "block";
                successMessage.style.display = "none";
            } else {
                successMessage.textContent = "Thank you for subscribing to our newsletter!";
                successMessage.style.display = "block";
                errorMessage.style.display = "none";
                emailInput.value = ""; // Clear input field
            }
        });
    }

    // Feedback Form Submission
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackSuccessMessage = document.getElementById("success-message"); // Correct ID
    
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            feedbackSuccessMessage.textContent = "Thank you for your feedback!";
            feedbackSuccessMessage.style.display = "block"; // Show success message
            feedbackForm.reset();
        });
    }
    
    // Search Functionality
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const bookCards = document.querySelectorAll(".book-card");

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        let found = false;

        bookCards.forEach(card => {
            const title = card.getAttribute("data-title").toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = "block"; // Show the book card
                found = true;
            } else {
                card.style.display = "none"; // Hide the book card
            }
        });

        if (!found) {
            alert("Book not available"); // Alert if no books found
        }
    });

    // Filter Functionality for Books Page
    const sortDropdown = document.getElementById("sort");
    const bookList = document.getElementById("book-list");

    if (sortDropdown && bookList) {
        const bookCardsArray = Array.from(document.querySelectorAll(".book-card"));

        sortDropdown.addEventListener("change", () => {
            const sortBy = sortDropdown.value;

            // Sort books based on selected criteria
            const sortedBooks = [...bookCardsArray].sort((a, b) => {
                const aValue = parseFloat(a.dataset[sortBy]);
                const bValue = parseFloat(b.dataset[sortBy]);
                return sortBy === "price" ? aValue - bValue : bValue - aValue;
            });

            // Render sorted books
            renderBooks(sortedBooks);
        });

        // Utility function to render books
        function renderBooks(books) {
            bookList.innerHTML = ""; // Clear the book list
            books.forEach((book) => bookList.appendChild(book)); // Append sorted books
        }

        // Initial render to ensure all books are displayed
        renderBooks(bookCardsArray);
    }
// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartLink = document.getElementById("cart-link");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize Cart Buttons
addToCartButtons.forEach((button) => {
  const bookCard = button.closest(".book-card");
  const bookId = bookCard.dataset.id;

  // Update button only if the book is in the cart
  const isInCart = cart.some((item) => item.id === bookId);
  updateButton(button, isInCart);
});

// Handle Add to Cart / Remove from Cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const bookCard = button.closest(".book-card");
    const bookId = bookCard.dataset.id;
    const bookTitle = bookCard.querySelector("h3").textContent;
    const bookPrice = parseFloat(bookCard.dataset.price);

    const itemIndex = cart.findIndex((item) => item.id === bookId);

    if (itemIndex > -1) {
      // Remove from Cart
      cart.splice(itemIndex, 1);
      updateButton(button, false);
    } else {
      // Add to Cart
      cart.push({
        id: bookId,
        title: bookTitle,
        price: bookPrice,
        quantity: 1,
      });
      updateButton(button, true);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the Cart link visibility
    updateCartLinkVisibility();
  });
});

// Update Button Text and Style
function updateButton(button, isInCart) {
  if (isInCart) {
    button.textContent = "Remove from Cart";
    button.classList.add("remove-from-cart");
  } else {
    button.textContent = "Add to Cart";
    button.classList.remove("remove-from-cart");
  }
}

// Update Cart Link Visibility
function updateCartLinkVisibility() {
  if (cart.length > 0) {
    cartLink.classList.remove("hidden");
  } else {
    cartLink.classList.add("hidden");
  }
}

// Initial setup of the Cart link visibility
updateCartLinkVisibility();

// Hardcoded credentials
const hardcodedUsername = "admin";
const hardcodedPassword = "admin";

// Tab Switching Logic
const loginTab = document.getElementById("login-tab");

if (loginTab) {
  loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
  });
}

// Login Form Validation
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const loginError = document.getElementById("login-error");

    if (username === hardcodedUsername && password === hardcodedPassword) {
      loginError.style.display = "none";
      alert("Login successful! Redirecting to the home page...");
      window.location.href = "index.html"; // Redirect to home page
    } else {
      loginError.textContent = "Invalid username or password.";
      loginError.style.display = "block";
    }
  });
}


    });
    
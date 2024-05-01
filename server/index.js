const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON body in requests
app.use(express.json());

// in-memory database for demonstration purposes
const users = [];

// Assume array of products
const products = [
    { id: 1, name: "Shirt", category: "Clothing", price: 29.99 },
    { id: 2, name: "Jeans", category: "Clothing", price: 39.99 },
    // Add more product entries as needed
];

const productsData = [
    { productId: 1, name: "Product A", category: "Shirts", price: 29.99, description: "Lorem ipsum..." },
    { productId: 2, name: "Product B", category: "T-Shirts", price: 19.99, description: "Lorem ipsum..." },
    // ... other products
];

// in-memory shopping cart array
let shoppingCart = [];

// Example array to store reviews
const reviewsDatabase = [
    { productId: 1, rating: 4, comment: "Great product!" },
    { productId: 2, rating: 5, comment: "Excellent quality!" },
    // ... more reviews
];

const reviewsData = [
    { productId: 1, reviewId: 101, rating: 4, comment: "Great product!" },
    { productId: 1, reviewId: 102, rating: 5, comment: "Excellent quality!" },
    { productId: 2, reviewId: 103, rating: 3, comment: "Decent product." },
    // Add more reviews as needed
];

// Placeholder data (replace this with your actual data)
const offersData = [
    { id: 1, title: "Discount on Shirts", discountPercentage: 20, startDate: "2024-01-15", endDate: "2024-01-31" },
    { id: 2, title: "Winter Sale", discountPercentage: 15, startDate: "2024-02-01", endDate: "2024-02-28" },
    // ... other offer objects
];

// Start the server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Sign Up (POST)
// Revisit
app.post("/signup", (req, res) => {
    // Implement logic to create a new user account
    const { username, email, password } = req.body;

    // Validate the inputs
    if (!username || !email || !password) {
        res.status(400).json(
            { error: "Incomplete data. Please provide username, email, and password." }
        );
        return;
    }

    // Check if the email already exists
    if (users.some(user => user.email === email)) {
        res.status(400).json(
            { error: "Email already exists. Please use a different email address." }
        );
        return;
    }

    // Save the user to the database
    const newUser = { username, email, password };
    users.push(newUser);

    res.json({ success: true, message: "User registered successfully!" });
});

// const jwt = require("jsonwebtoken");

// function generateToken() {
//     // Replace the secret with your own secret key
//     const secretKey = "yourSecretKey";
//     const token = jwt.sign({ /* Add any additional user information here */ }, secretKey, { expiresIn: "1h" });
//     return token;
// }

// Log In (POST)
// Revisit
app.post("/login", (req, res) => {
    // Implement logic to authenticate the user
    const { username, password } = req.body;

    // Validate the inputs
    if (!username || !password) {
        res.status(400).json({ error: "Incomplete data. Please provide username and password." });
        return;
    }

    // Find the user in the array (replace this with a database query)
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        res.status(401).json({ error: "Invalid credentials. Please check your username and password." });
        return;
    }

    // Generate a token or session (you may want to use a library for this)
    const token = generateToken(); // Replace with your token generation logic

    res.json({ success: true, message: "Login successful!", token });
});

// Get User Details (GET)
// Revisit
app.get("/user/:userId", (req, res) => {
    // Implement logic to fetch user details
    const userId = req.params.userId;
    
    // Find the user in the database based on userId
    const user = users.find(u => u.userId === userId);

    if (!user) {
        // User not found
        res.status(404).json({ error: "User not found." });
    } else {
        // User found, respond with user details
        res.json({ user });
    }
});

// Log Out (POST)
// Revisit
app.post("/logout", (req, res) => {
    // Implement logic to log the user out
    // Destroy the session or token, clear cookies, etc.
    // ...

    res.json({ success: true, message: "Logout successful!" });
});

/* Product Catalog */
// Get All Products
app.get("/products", (req, res) => {
    // Implement logic to fetch and return a list of all products
    res.json({ products });
});

// Get Products by Category
app.get("/products/category/:category", (req, res) => {
    const category = req.params.category;
    
    // Filter products based on the category
    const filteredProducts = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
        // If no products found for the given category, return an appropriate response
        res.status(404).json(
            { error: "No products found for the specified category." }
        );
    } else {
        // Return the filtered products
        res.json({ products: filteredProducts });
    }
});

// Get Product Details
app.get("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    
    // Find the product in the data
    const product = productsData.find(
        (p) => p.productId === productId
    );

    if (!product) {
        return res.status(404).json(
            { error: "Product not found" }
        );
    }

    // If found, return the product details
    res.json({ productDetails: product });
});

// Add a New Product
app.post("/products", (req, res) => {
    // Implement logic to handle the addition of a new product
    const { name, category, price, description } = req.body;

    // Validate the inputs (add more validation as needed)
    if (!name || !category || !price || !description) {
        res.status(400).json(
            { error: "Incomplete data. Please provide name, category, price, and description." }
        );
        return;
    }

    const newProduct = {
        // You may need a function to generate a unique product ID
        id: generateProductId(), name, category, price, description,
        // Additional fields as needed
    };
    products.push(newProduct);

    res.json({ success: true, message: "Product added successfully!", product: newProduct });
});

// function generateProductId() {
//     return Math.random().toString(36).substring(7);
// }

// Update Product Details
app.put("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    // Implement logic to handle the update of a specific product
    const updatedProductData = req.body;

    // Validate the inputs and check if the product exists
    if (!updatedProductData) {
        res.status(400).json({ error: "Invalid data. Please provide updated product information." });
        return;
    }

    // Assume you have a function to check if a product with the given ID exists in your database
    const existingProduct = getProductById(productId);

    if (!existingProduct) {
        res.status(404).json({ error: "Product not found." });
        return;
    }

    // Update the product details in the database or perform necessary actions
    // Here, you might use an ORM like Mongoose or Sequelize to interact with your database
    // Example using Mongoose (for MongoDB):
    // ProductModel.findByIdAndUpdate(productId, updatedProductData, { new: true })
    //   .then(updatedProduct => {
    //       res.json({ success: true, message: "Product details updated successfully!", updatedProduct });
    //   })
    //   .catch(error => {
    //       res.status(500).json({ error: "Error updating product details." });
    //   });

    // For demonstration purposes, let's assume the update was successful
    const updatedProduct = { ...existingProduct, ...updatedProductData };

    res.json({ success: true, message: "Product details updated successfully!", updatedProduct });
});

// Dummy function to simulate fetching a product from the database
function getProductById(productId) {
    // Replace this with actual database query logic
    // For now, returning a dummy product object
    return {
        productId: productId,
        name: "Updated Product",
        description: "Updated product description",
        price: 29.99,
        // ... other product details
    };
}

// Delete a Product
app.delete("/products/:productId", (req, res) => {
    const productId = req.params.productId;

    // Check if the product exists (add more validation as needed)
    const existingProduct = getProductById(productId);

    if (!existingProduct) {
        res.status(404).json({ error: "Product not found!" });
        return;
    }

    // Delete the product from the database or perform necessary actions
    const deletedProduct = deleteProduct(productId);

    if (!deletedProduct) {
        res.status(500).json({ error: "Error deleting the product. Please try again later." });
        return;
    }

    res.json({ success: true, message: "Product deleted successfully!" });
});

// Example Functions (Replace these with your actual database operations)

// Function to Get a Product by ID
// function getProductById(productId) {
//     // Implement logic to fetch the product from the database by ID
//     // Return null if not found, otherwise return the product object
//     // Example: return db.products.find(product => product.id === productId);
// }

// Function to Delete a Product by ID
// function deleteProduct(productId) {
//     // Implement logic to delete the product from the database by ID
//     // Return the deleted product object or null if an error occurs
//     // Example: const index = db.products.findIndex(product => product.id === productId);
//     //          if (index !== -1) {
//     //              const deletedProduct = db.products.splice(index, 1)[0];
//     //              return deletedProduct;
//     //          }
//     //          return null;
// }

/* Shopping cart */
// Get Shopping Cart
app.get("/cart", (req, res) => {
    // Return the current state of the shopping cart
    res.json({ cartItems: shoppingCart });
});

// Add to Cart
app.post("/cart/add", (req, res) => {
    // Implement logic to add products to the shopping cart
    const { productId, quantity } = req.body;

    // Validate the inputs
    if (!productId || !quantity) {
        res.status(400).json({ error: "Incomplete data. Please provide productId and quantity." });
        return;
    }

    // Check if the product is already in the cart
    const existingItem = shoppingCart.find(
        item => item.productId === productId
    );

    if (existingItem) {
        // Update quantity if the product is already in the cart
        existingItem.quantity += parseInt(quantity);
    } else {
        // Add a new item to the cart
        shoppingCart.push({ productId, quantity: parseInt(quantity) });
    }

    res.json({ success: true, message: "Item added to the cart successfully!" });
});

// Remove from Cart
app.delete("/cart/remove/:productId", (req, res) => {
    // Implement logic to remove a specific product from the shopping cart
    const productId = req.params.productId;

    // Validate the productId
    if (!productId) {
        res.status(400).json({ error: "Incomplete data. Please provide productId." });
        return;
    }

    // Remove the item from the cart
    shoppingCart = shoppingCart.filter(
        item => item.productId !== productId
    );

    res.json({ success: true, message: "Product removed from the cart!" });
});

// Clear Cart
app.delete("/cart/clear", (req, res) => {
    // in-memory data structure:
    shoppingCart.items = [];  // Assuming 'shoppingCart' is the object representing the user's cart

    // Alternatively, if you're using a database, you would perform a delete operation to remove all cart items associated with the user

});

/* User Reviews */
// Retrieve Reviews for All Products
app.get("/reviews", (req, res) => {
    // Implement logic to fetch and return all reviews for all products
    res.json({ reviews: reviewsDatabase });
});

// Retrieve Reviews for a Specific Product
app.get("/reviews/:productId", (req, res) => {
    const productId = parseInt(req.params.productId);

    // Filter reviews based on the productId
    const productReviews = reviewsData.filter(
        review => review.productId === productId
    );

    if (productReviews.length === 0) {
        res.status(404).json(
            { error: "No reviews found for the specified product." }
        );
        return;
    }

    res.json({ reviews: productReviews });
});

// Submit a Review for a Product (POST)
app.post("/reviews/submit", (req, res) => {
    // Implement logic to handle the submission of a review
    const { productId, rating, comment } = req.body;

    // Validate the inputs
    if (!productId || !rating || !comment) {
        res.status(400).json(
            { error: "Incomplete data. Please provide productId, rating, and comment." }
        );
        return;
    }

    // Save the review to the database or perform necessary actions
    const newReview = {
        productId,
        rating,
        comment,
        timestamp: new Date(),
    };

    reviewsDatabase.push(newReview);

    // You can replace the above array with actual database interactions

    res.json({ success: true, message: "Review submitted successfully!" });
});

// Update a Review (PATCH)
app.patch("/reviews/:reviewId", (req, res) => {
    // Extract the reviewId from the URL
    const reviewId = parseInt(req.params.reviewId);

    // Find the index of the review in your data array
    const reviewIndex = reviewsData.findIndex(review => review.id === reviewId);

    // If the review doesn't exist, return an error
    if (reviewIndex === -1) {
        res.status(404).json({ error: "Review not found." });
        return;
    }

    // Get the existing review
    const existingReview = reviewsData[reviewIndex];

    // Update the review fields with new values from the request body
    if (req.body.rating !== undefined) {
      existingReview.rating = req.body.rating;
    }
    if (req.body.comment !== undefined) {
      existingReview.comment = req.body.comment;
    }

    // Assuming you would save the updated reviews in a database, perform necessary actions here

    res.json({ success: true, message: "Review updated successfully!" });
});

// Delete a Review (DELETE)
app.delete("/reviews/:reviewId", (req, res) => {
    // Extract the reviewId from the URL parameters
    const reviewId = req.params.reviewId;

    // Assuming you have a reviews database or storage
    // Check if the review with the given ID exists
    const existingReview = reviewsDatabase.find((review) => review.id === reviewId);

    if (!existingReview) {
        // If the review does not exist, return an error response
        return res.status(404).json({ success: false, error: "Review not found." });
    }

    // If the review exists, delete it from the database or storage
    // Here, we are using a filter to create a new array without the deleted review
    reviewsDatabase = reviewsDatabase.filter((review) => review.id !== reviewId);

    // Respond with a success message
    res.json({ success: true, message: "Review deleted successfully!" });
});


/* Checkout Process */
// Get Cart Items for Checkout
app.get("/checkout/cart", (req, res) => {
    // Assuming you have a function to calculate the total price and fetch cart items
    const cartItems = getCartItems();
    const totalPrice = calculateTotalPrice(cartItems);

    res.json({ cartItems, totalPrice });
});

// Function to get cart items
// function getCartItems() {
//     // Implement logic to fetch and return items in the shopping cart
//     // You might retrieve the cart data from the 'shoppingCart' array or a database
//     // ...

//     return shoppingCart;
// }

// Function to calculate the total price of items in the cart
// function calculateTotalPrice(cartItems) {
//     // Implement logic to calculate the total price based on the cart items
//     // You might iterate through the cartItems and sum up the prices
//     // ...

//     return total;
// }

// Get Checkout Summary
app.get("/checkout/summary", (req, res) => {
    // Calculate the total price based on the items in the shopping cart
    const totalPrice = shoppingCart.reduce((total, item) => total + item.price, 0);

    // You might have additional logic for applying discounts, taxes, etc.

    // Prepare the checkout summary
    const checkoutSummary = {
        items: shoppingCart,
        total: totalPrice,
        // Add more details as needed
    };

    res.json({ checkoutSummary });
});

// Process Checkout (POST)
app.post("/checkout/process", (req, res) => {
    // Extract relevant information from the request body
    const { paymentMethod, shippingAddress, items } = req.body;

    // Validate the inputs
    if (!paymentMethod || !shippingAddress || !items || items.length === 0) {
        res.status(400).json({ error: "Incomplete data. Please provide paymentMethod, shippingAddress, and at least one item." });
        return;
    }

    // Perform additional validations based on your business logic
    // For example, validate the payment method, check if items are in stock, etc.
    // ...

    // Calculate the total amount based on the items in the cart
    const totalAmount = calculateTotalAmount(items);

    // Process the payment using the chosen payment method
    const paymentResult = processPayment(paymentMethod, totalAmount);

    // If the payment is successful, proceed with order fulfillment
    if (paymentResult.success) {
        // Implement logic to update inventory, generate an order, and perform other necessary actions
        const orderDetails = fulfillOrder(items, shippingAddress);

        // Return a success message with order details
        res.json({ success: true, message: "Checkout successful!", orderDetails });
    } else {
        // If the payment fails, return an error message
        res.status(400).json({ error: "Payment failed. Please check your payment details and try again." });
    }
});

// Function to calculate the total amount based on items in the cart
// function calculateTotalAmount(items) {
//     // Implement logic to calculate the total amount based on item prices and quantities
//     // ...
//     return totalAmount;
// }

// // Function to process the payment
// function processPayment(paymentMethod, totalAmount) {
//     // Implement logic to process the payment using the chosen payment method
//     // ...
//     return { success: true, paymentResult: "Payment processed successfully" };
// }

// Function to fulfill the order
// function fulfillOrder(items, shippingAddress) {
//     // Implement logic to update inventory, generate an order, and perform other necessary actions
//     // ...
//     const orderDetails = {
//         orderId: "123456",
//         items,
//         shippingAddress,
//         // Additional order details
//     };
//     return orderDetails;
// }

// Update Shipping Address (PATCH)
app.patch("/checkout/update-shipping", (req, res) => {
    // Assuming you have a user authentication mechanism in place, retrieve the user ID from the authenticated user's session
    const userId = req.user.id;

    // Extract the new shipping address from the request body
    const { shippingAddress } = req.body;

    // Validate the inputs
    if (!shippingAddress) {
        res.status(400).json({ error: "Please provide a new shipping address." });
        return;
    }

    // Assuming you have a database or data store, update the user's shipping address
    // Replace the following logic with your actual data update logic

    // Example: Update the shipping address in the database for the user with the given ID
    // database.updateShippingAddress(userId, shippingAddress);

    // End of example logic

    res.json({ success: true, message: "Shipping address updated successfully!" });
});

// Apply Discount Code (POST)
app.post("/checkout/apply-discount", (req, res) => {
    // Implement logic to apply a discount code
    const { discountCode } = req.body;

    // Validate the discount code (this is a basic example, adjust as needed)
    if (!discountCode || typeof discountCode !== "string") {
        res.status(400).json({ error: "Invalid discount code. Please provide a valid code." });
        return;
    }

    // Assume you have a database or some mechanism to check the validity of the discount code
    const isValidDiscountCode = checkDiscountCodeValidity(discountCode);

    if (!isValidDiscountCode) {
        res.status(400).json({ error: "Invalid discount code. Please provide a valid code." });
        return;
    }

    // Now, you can apply the discount to the checkout summary or perform any necessary actions
    const checkoutSummary = applyDiscountToCheckoutSummary(discountCode);
    
    res.json({ success: true, message: "Discount applied successfully!", checkoutSummary });
});

// Function to check the validity of the discount code (replace with your own validation logic)
// function checkDiscountCodeValidity(code) {
//     // Implement logic to check if the discount code is valid (e.g., query a database)
//     // ...

//     // For demonstration purposes, return true; you need to replace this with your validation logic
//     return true;
// }

// // Function to apply the discount to the checkout summary (replace with your own logic)
// function applyDiscountToCheckoutSummary(code) {
//     // Implement logic to apply the discount to the checkout summary
//     // ...

//     // For demonstration purposes, return an updated checkout summary object
//     return { /* Updated checkout summary */ };
// }

// Cancel Checkout (DELETE)
app.delete("/checkout/cancel", (req, res) => {
    // Assume the user is identified by a session or token
    const userId = req.session.userId; // Adjust this based on your authentication mechanism

    // Check if the user has an active checkout or items in the cart
    const isCheckoutActive = checkIfCheckoutActive(userId); // Implement this function based on your application logic

    if (!isCheckoutActive) {
        res.status(400).json({ error: "No active checkout to cancel." });
        return;
    }

    // Implement logic to cancel the checkout process, e.g., clear the user's cart
    clearUserCart(userId); // Implement this function based on your application logic

    res.json({ success: true, message: "Checkout canceled!" });
});

// Example functions for illustration purposes (replace with actual logic)
// function checkIfCheckoutActive(userId) {
//     // Implement logic to check if the user has an active checkout or items in the cart
//     // Return true if active, false otherwise
//     return true; // Replace with actual logic
// }

// function clearUserCart(userId) {
//     // Implement logic to clear the user's cart or cancel the ongoing transaction
//     // This could involve removing items from a database or session
//     // ...
// }

/* Special Offers and Discounts */
// Get All Offers
app.get("/offers", (req, res) => {
    // Implement logic to fetch and return all offers
    res.json({ offers: offersData });
});

// Get Details of a Specific Offer
app.get("/offers/:offerId", (req, res) => {
    // Extract offerId from request parameters
    const offerId = parseInt(req.params.offerId);

    // Find the offer in the data based on the offerId
    const selectedOffer = offersData.find(offer => offer.id === offerId);

    // Check if the offer was found
    if (!selectedOffer) {
        return res.status(404).json({ error: "Offer not found." });
    }

    // Return the details of the selected offer
    res.json({ offerDetails: selectedOffer });
});

// Create a New Offer
app.post("/offers/create", (req, res) => {
    // Implement logic to create a new offer
    const { title, description, discountPercentage, startDate, endDate } = req.body;

    // Validate the inputs
    if (!title || !description || !discountPercentage || !startDate || !endDate) {
        res.status(400).json({ error: "Incomplete data. Please provide all required fields." });
        return;
    }

    // Create a new offer object
    const newOffer = {
        id: offers.length + 1, // Replace this with a unique identifier from your data storage
        title,
        description,
        discountPercentage,
        startDate,
        endDate,
    };

    // Save the new offer to the data storage (in-memory array in this example)
    offersData.push(newOffer);

    res.json({ success: true, message: "Offer created successfully!", newOffer });
});

// Update an Existing Offer
app.put("/offers/update/:offerId", (req, res) => {
    const offerId = parseInt(req.params.offerId);
    const { title, description, discountPercentage, startDate, endDate } = req.body;

    // Validate the inputs
    if (!title && !description && !discountPercentage && !startDate && !endDate) {
        res.status(400).json({ error: "No data provided for update. Please provide at least one field to update." });
        return;
    }

    // Find the index of the offer in the database
    const offerIndex = offersDatabase.findIndex(offer => offer.id === offerId);

    // Check if the offer with the specified ID exists
    if (offerIndex === -1) {
        res.status(404).json({ error: "Offer not found." });
        return;
    }

    // Update the offer details if provided in the request body
    if (title) offersDatabase[offerIndex].title = title;
    if (description) offersDatabase[offerIndex].description = description;
    if (discountPercentage) offersDatabase[offerIndex].discountPercentage = discountPercentage;
    if (startDate) offersDatabase[offerIndex].startDate = startDate;
    if (endDate) offersDatabase[offerIndex].endDate = endDate;

    // In a real application, you'd save the updated data to your persistent storage (e.g., database)
    // For simplicity, we're using an in-memory array here.

    res.json({ success: true, message: "Offer updated successfully!" });
});

// Delete an Existing Offer
app.delete("/offers/delete/:offerId", (req, res) => {
    const offerId = req.params.offerId;

    // Assume you are using MongoDB with Mongoose as an example
    // You'll need to adjust this part based on your actual database and ORM

    // Import the Offer model (assuming you have a model named Offer)
    const Offer = require('./models/offer');

    // Delete the offer from the database
    Offer.findByIdAndRemove(offerId, (err, deletedOffer) => {
        if (err) {
            res.status(500).json({ error: "Error deleting the offer from the database." });
            return;
        }

        if (!deletedOffer) {
            res.status(404).json({ error: "Offer not found." });
            return;
        }

        // If the offer is successfully deleted
        res.json({ success: true, message: "Offer deleted successfully!" });
    });
});

// For errors
app.get("/*", (req, res) => {
    res.send("You got the route error");
});
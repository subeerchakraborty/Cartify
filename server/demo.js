const express = require('express');
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;
// Middleware to parse JSON body in requests
app.use(express.json());
app.use(cors());

// connect to MongoDB
const uri = process.env.URI;
// console.log(uri);
mongoose
  .connect(uri)
  .then( () => console.log("Connected to MongoDB!") )
  .catch( () => console.error.bind(console, "MongoDB connection error:") );

// Users Schema
const UsersSchema = new mongoose.Schema({
  username : {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, { timestamps: true });

// create Users collection
const UsersCollection = mongoose.model("Users", UsersSchema);

const ProductSchema = new mongoose.Schema({
  imgUrl: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  inStock: {
    type: Boolean,
    default: true
  }
});

const ProductCollection = mongoose.model('Products', ProductSchema);

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity can not be less than 1.']
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  items: [CartItemSchema]
});

const CartCollection = mongoose.model('Cart', CartSchema);

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

const ReviewCollection = mongoose.model('Review', ReviewSchema);

const CheckoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less than 1.']
    },
    price: {
      type: Number,
      required: true
    }
  }],
  shippingAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const CheckoutCollection = mongoose.model('Checkout', CheckoutSchema);

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const OfferCollection = mongoose.model('Offer', OfferSchema);

// Start the server
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Sign Up (POST)
// Revisit
app.post("/signup", async (req, res) => {
  // Implement logic to create a new user account
  const { username, email, password } = req.body;

  // Validate the inputs
  if (!username || !email || !password) {
      res.status(400).json(
          { error: "Incomplete data. Please provide username, email, and password." }
      );
      return;
  }

  // validate the email format
  if (!validator.isEmail(email)) {
    res.status(400).json({
      error: "Invalid email format. Please enter a valid email address."
    });
    return;
  }

  try {
    // check for existence in db
    const existingUser = await UsersCollection.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please use a different email address.' });
    }

    // create a new user object
    const newUser = new UsersCollection({ username, email, password });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully!' });
  } catch (error) {
    // handle any possible errors
    console.error('Error creating user:', error);
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json(
        { error: 'Validation error. Please check your input data.' }
      );
    } else if (error.code === 11000) {
      res.status(400).json(
        { error: 'Username or email already exists. Please use a different username or email address.' }
      );
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
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

  res.json({ success: true, message: "Login successful!", token });
});

// Get User Details (GET)
// Revisit
app.get("/user/:userId", (req, res) => {
  const validator = require('validator');

  // Implement logic to fetch user details
  const userId = req.params.userId;
  
  // validate the userId format
  if (!validator.isMongoId(userId)) {
    res.status(404).json({ message: "Invalid user ID." });
    return;
  }

  // Find the user in the database based on userId
  UsersCollection.findOne({ userId }, (error, user) => {
    if (error) {
      // handle any possible errors
      console.error(`Error finding user:`, error);
      res.status(404).json({ message: 'Internal Server Error' });
    }
    else if (!user) {
      // User not found
      res.status(404).json({ message: 'User not found.' });
    } else {
      // User found, respond with user details
      res.status(200).json({ user });
    }
  });
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
app.get("/products", async (req, res) => {
  try {
    const products = await ProductCollection.find({});
    res.json({ products });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Products by Category
app.get("/products/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await ProductCollection.find({ category: category});
    if (products.length === 0) {
      res.status(404).json({ error: "No products found for the specified category." });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Product Details
app.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductCollection.findById(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ productDetails: product });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add a New Product
app.post("/products/add-product", async (req, res) => {
  const { name, category, price, description } = req.body;
  if (!name || !category || !price || !description) {
    res.status(400).json({ error: "Incomplete data. Please provide name, category, price, and description." });
    return;
  }
  const newProduct = new ProductCollection({ name, category, price, description });
  try {
    const product = await newProduct.save();
    res.json({ success: true, message: "Product added successfully!", product });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Product Details
app.put("/products/update-product/:productId", async (req, res) => {
  const productId = req.params.productId;
  const updatedProductData = req.body;
  if (!updatedProductData) {
    res.status(400).json({ error: "Invalid data. Please provide updated product information." });
    return;
  }
  try {
    const product = await ProductCollection.findByIdAndUpdate(productId, updatedProductData, { new: true });
    if (!product) {
      res.status(404).json({ error: "Product not found." });
    } else {
      res.json({ success: true, message: "Product details updated successfully!", product });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Product
app.delete("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductCollection.findByIdAndDelete(productId);
    if (!product) {
      res.status(404).json({ error: "Product not found." });
    } else {
      res.json({ success: true, message: "Product deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/* Shopping cart */
// Get Shopping Cart
app.get("/cart", async (req, res) => {
  try {
    const cart = await CartCollection.findOne({ userId: req.session.userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      res.json({ cartItems: cart.items });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add to Cart
app.post("/cart/add", async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    res.status(400).json({ error: "Incomplete data. Please provide productId and quantity." });
    return;
  }
  try {
    const cart = await CartCollection.findOne({ userId: req.session.userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += parseInt(quantity);
      } else {
        cart.items.push({ productId, quantity: parseInt(quantity) });
      }
      const updatedCart = await cart.save();
      res.json({ success: true, message: "Item added to the cart successfully!", cart: updatedCart });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Remove from Cart
app.delete("/cart/remove/:productId", async (req, res) => {
  const productId = req.params.productId;
  if (!productId) {
    res.status(400).json({ error: "Incomplete data. Please provide productId." });
    return;
  }
  try {
    const cart = await CartCollection.findOne({ userId: req.session.userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      const updatedCart = await cart.save();
      res.json({ success: true, message: "Product removed from the cart!", cart: updatedCart });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Clear Cart
app.delete("/cart/clear", async (req, res) => {
  try {
    const cart = await CartCollection.findOne({ userId: req.session.userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      cart.items = [];
      const updatedCart = await cart.save();
      res.json({ success: true, message: "Cart cleared successfully!", cart: updatedCart });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/* User Reviews */
// Retrieve Reviews for All Products
// Retrieve Reviews for All Products
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await ReviewCollection.find({});
    if (!reviews) {
      res.status(404).json({ error: "No reviews found." });
    } else {
      res.json({ reviews });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve Reviews for a Specific Product
app.get("/reviews/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const reviews = await ReviewCollection.find({ productId: productId });
    if (!reviews) {
      res.status(404).json({ error: "No reviews found for the specified product." });
    } else {
      res.json({ reviews });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Submit a Review for a Product (POST)
app.post("/reviews/submit", async (req, res) => {
  const { productId, rating, comment } = req.body;
  if (!productId || !rating || !comment) {
    res.status(400).json({ error: "Incomplete data. Please provide productId, rating, and comment." });
    return;
  }
  const newReview = new ReviewCollection({ productId, rating, comment });
  try {
    const review = await newReview.save();
    res.json({ success: true, message: "Review submitted successfully!", review });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Review (PATCH)
app.patch("/reviews/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await ReviewCollection.findByIdAndUpdate(reviewId, req.body, { new: true });
    if (!review) {
      res.status(404).json({ error: "Review not found." });
    } else {
      res.json({ success: true, message: "Review updated successfully!", review });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Review (DELETE)
app.delete("/reviews/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    const review = await ReviewCollection.findByIdAndDelete(reviewId);
    if (!review) {
      res.status(404).json({ error: "Review not found." });
    } else {
      res.json({ success: true, message: "Review deleted successfully!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/* Checkout Process */
// Get Cart Items for Checkout
app.get("/checkout/cart", async (req, res) => {
  try {
    const cart = await CartCollection.findOne({ userId: req.session.userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      const cartItems = cart.items;
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      res.json({ cartItems, totalPrice });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Checkout Summary
app.get("/checkout/summary", async (req, res) => {
  try {
    const cart = await CartCollection.findOne({ userId: req.session.userId });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      const items = cart.items;
      const total = items.reduce((total, item) => total + item.price * item.quantity, 0);
      const checkoutSummary = { items, total };
      res.json({ checkoutSummary });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Process Checkout (POST)
app.post("/checkout/process", async (req, res) => {
  const { paymentMethod, shippingAddress, items } = req.body;
  if (!paymentMethod || !shippingAddress || !items || items.length === 0) {
    res.status(400).json({ error: "Incomplete data. Please provide paymentMethod, shippingAddress, and at least one item." });
    return;
  }
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const paymentResult = processPayment(paymentMethod, totalAmount);
  if (paymentResult.success) {
    try {
      const orderDetails = fulfillOrder(items, shippingAddress);
      res.json({ success: true, message: "Checkout successful!", orderDetails });
    } catch (error) {
      res.status(500).json({ error: "Order fulfillment failed. Please check your items and shipping address." });
    }
  } else {
    res.status(400).json({ error: "Payment failed. Please check your payment details and try again." });
  }
});

// Function to process the payment
function processPayment(paymentMethod, totalAmount) {
  // Implement logic to process the payment using the chosen payment method
  // This is a placeholder. In a real-world application, you would integrate with a payment gateway here.
  if (paymentMethod && totalAmount) {
      return { success: true, paymentResult: "Payment processed successfully" };
  } else {
      return { success: false, paymentResult: "Payment failed. Please check your payment details." };
  }
}

// Function to fulfill the order
function fulfillOrder(items, shippingAddress) {
  // Implement logic to update inventory, generate an order, and perform other necessary actions
  // This is a placeholder. In a real-world application, you would update your inventory system and generate an order in your database here.
  if (items && items.length > 0 && shippingAddress) {
      const orderDetails = {
          orderId: "123456", // This should be a unique identifier generated by your system
          items,
          shippingAddress,
          // Additional order details
      };
      return orderDetails;
  } else {
      throw new Error("Order fulfillment failed. Please check your items and shipping address.");
  }
}

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
function checkDiscountCodeValidity(code) {
    // Implement logic to check if the discount code is valid (e.g., query a database)
    // ...

    // For demonstration purposes, return true; you need to replace this with your validation logic
    return true;
}

// Function to apply the discount to the checkout summary (replace with your own logic)
function applyDiscountToCheckoutSummary(code) {
    // Implement logic to apply the discount to the checkout summary
    // ...

    // For demonstration purposes, return an updated checkout summary object
    return { /* Updated checkout summary */ };
}

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
function checkIfCheckoutActive(userId) {
    // Implement logic to check if the user has an active checkout or items in the cart
    // Return true if active, false otherwise
    return true; // Replace with actual logic
}

function clearUserCart(userId) {
    // Implement logic to clear the user's cart or cancel the ongoing transaction
    // This could involve removing items from a database or session
    // ...
}

/* Special Offers and Discounts */
// Get All Offers
app.get("/offers", async (req, res) => {
  try {
      const offers = await OfferCollection.find({});
      res.json({ offers });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Get Details of a Specific Offer
app.get("/offers/:offerId", async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const selectedOffer = await OfferCollection.findById(offerId);
    if (!selectedOffer) {
      return res.status(404).json({ error: "Offer not found." });
    }
    res.json({ offerDetails: selectedOffer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a New Offer
app.post("/offers/create", async (req, res) => {
  try {
    const { title, description, discountPercentage, startDate, endDate } = req.body;
    if (!title || !description || !discountPercentage || !startDate || !endDate) {
      res.status(400).json({ error: "Incomplete data. Please provide all required fields." });
      return;
    }
    const newOffer = new OfferCollection({
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
    });
    const savedOffer = await newOffer.save();
    res.json({ success: true, message: "Offer created successfully!", savedOffer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an Existing Offer
app.put("/offers/update/:offerId", async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const { title, description, discountPercentage, startDate, endDate } = req.body;
    if (!title && !description && !discountPercentage && !startDate && !endDate) {
      res.status(400).json({ error: "No data provided for update. Please provide at least one field to update." });
      return;
    }
    const updatedOffer = await OfferCollection.findByIdAndUpdate(offerId, 
      { title, description, discountPercentage, startDate, endDate }, { new: true }
    );
    if (!updatedOffer) {
      res.status(404).json({ error: "Offer not found." });
      return;
    }
    res.json({ success: true, message: "Offer updated successfully!", updatedOffer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an Existing Offer
app.delete("/offers/delete/:offerId", async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const deletedOffer = await OfferCollection.findByIdAndRemove(offerId);
    if (!deletedOffer) {
      res.status(404).json({ error: "Offer not found." });
      return;
    }
    res.json({ success: true, message: "Offer deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// For errors
app.get("/*", (req, res) => {
    res.send("You got the route error");
});
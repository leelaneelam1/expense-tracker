// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI
  ,
  console.log("Mongo DB connected")
);

// User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

// Expense Model
const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Transportation",
      "Utilities",
      "Entertainment",
      "Shopping",
      "Healthcare",
      "Other",
    ],
  },
  date: { type: Date, required: true, default: Date.now },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Cash", "Bank Transfer"],
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace with a secure secret
    const user = await User.findById(decoded._id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

// Routes
// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Invalid login credentials");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) throw new Error("Invalid login credentials");

    const token = jwt.sign({ _id: user._id }, "your_jwt_secret");
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Expenses Routes
// Get all expenses
app.get("/api/expenses", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create expense
app.post("/api/expenses", auth, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user._id,
    });
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update expense
app.put("/api/expenses/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).send();
    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete expense
app.delete("/api/expenses/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!expense) return res.status(404).send();
    res.send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

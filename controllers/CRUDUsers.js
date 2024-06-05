const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    // Create new user
    const newUser = new User({
      email,
      // password,
      name,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save user to database
    await newUser.save();

    res.status(201).send({ newUser });
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

const editUser = async (req, res) => {
  const { id: _id, email, name, role } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(_id, {
      email,
      name,
      role,
    });
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updateUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Check if _id is provided
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    console.log(`Attempting to delete user with ID: ${id}`);

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      console.log(`User with ID: ${id} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User with ID: ${id} successfully deleted`);
    res.json({ message: "User successfully deleted", user: deleteUser });
  } catch (err) {
    console.error(`Error deleting user with ID: ${id}`, err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUser, editUser, deleteUser };

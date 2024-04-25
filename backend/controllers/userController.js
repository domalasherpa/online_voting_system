const User = require("../models/user");

const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get user by id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update user by id
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete user by id
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = userController;

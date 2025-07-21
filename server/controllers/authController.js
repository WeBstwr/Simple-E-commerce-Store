import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await client.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await client.user.create({
      data: {
        fullName,
        phoneNumber,
        email,
        password: hashedPassword,
        role, // should be 'user' or 'admin'
      },
    });

    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await client.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid login credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Invalid login credentials" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      phoneNumber: user.phoneNumber,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        // secure: true, // Uncomment in production (HTTPS)
        sameSite: "strict",
      })
      .json({ success: true, data: payload });
  } catch (e) {
    console.error("Error during login:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await client.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });
    res.json({ success: true, users });
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get current user's profile (from DB)
export const getProfile = async (req, res) => {
  try {
    const user = await client.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (e) {
    console.error("Error fetching profile:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update current user's profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber } = req.body;
    const updatedUser = await client.user.update({
      where: { id: req.user.id },
      data: { fullName, phoneNumber },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });
    res.json({ success: true, user: updatedUser });
  } catch (e) {
    console.error("Error updating profile:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Change current user's password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Old and new password required" });
    }
    const user = await client.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await client.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });
    res.json({ success: true, message: "Password updated successfully" });
  } catch (e) {
    console.error("Error changing password:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete current user's account
export const deleteProfile = async (req, res) => {
  try {
    await client.user.delete({ where: { id: req.user.id } });
    res.json({ success: true, message: "Account deleted successfully" });
  } catch (e) {
    console.error("Error deleting profile:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Admin: update any user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phoneNumber, role } = req.body;
    const updatedUser = await client.user.update({
      where: { id: parseInt(id) },
      data: { fullName, phoneNumber, role },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });
    res.json({ success: true, user: updatedUser });
  } catch (e) {
    console.error("Error updating user:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Admin: delete any user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await client.user.delete({ where: { id: parseInt(id) } });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (e) {
    console.error("Error deleting user:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
    res.clearCookie("access_token").json({ success: true, message: "Logged out" });
}; 
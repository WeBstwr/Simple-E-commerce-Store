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
import { genSalt, hash, compare } from 'bcryptjs';
import pkg  from 'jsonwebtoken';
const { sign } = pkg;
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, profilePic } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create new user object
    const newUserPayload = {
      name,
      email,
      password: hashedPassword,
      profilePic: profilePic || null,
    };

    // Insert user into the database
    const [newUser] = await db.insert(users).values(newUserPayload).returning();

    // Generate JWT
    const token = sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '24h', // Token expires in 24 hours
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Consider 'strict' for more security or 'none' for cross-domain
      maxAge: 24 * 60 * 60 * 1000, // 24 hours, matches token expiration
    };

    res.status(201).cookie('token', token, cookieOptions).json({
        message: 'User created successfully',
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error during user registration.' });
  }
};

/**
 * @description Authenticate a user and return a token
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    };

    res.status(200).cookie('token', token, cookieOptions).json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

export { signup, login };
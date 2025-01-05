import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../db/db.js";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    try {
        const { username, email, firstname, lastname, password } = req.body;
        // Check if user already exists
        const user = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert user into db
        const result = await db.query(
            "INSERT INTO users (username, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, email, firstname, lastname, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "User does not exist" });
        }
        // Check if password is correct
        if (!(await bcrypt.compare(password, user.rows[0].password))) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);

export default authRouter;
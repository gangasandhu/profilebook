import db from '../db/db.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

userRouter.post('/', async (req, res) => {
    const { username, email, firstname, lastname, bio } = req.body;
    try {
      const result = await db.query(
        'INSERT INTO users (username, email, firstname, lastname, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, email, firstname, lastname, bio]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default userRouter;
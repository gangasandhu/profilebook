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


userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default userRouter;
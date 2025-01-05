import db from '../db/db.js';
import { Router } from 'express';

const userRouter = Router();

// Get all users
userRouter.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT id, username, email, firstname, lastname, bio FROM users');
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Create a new user
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


// Get a single user by id
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT id, username, email, firstname, lastname, bio FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Update a user
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, firstname, lastname, bio } = req.body;
    try {
      const result = await db.query(
        'UPDATE users SET username = $1, email = $2, firstname = $3, lastname = $4, bio = $5 WHERE id = $6 RETURNING username, email, firstname, lastname, bio, id',
        [username, email, firstname, lastname, bio, id]
      );
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
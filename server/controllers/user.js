import dotenv from 'dotenv/config'
import db from '../db/db.js';
import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { s3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '../config/s3.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { cacheUser, invalidateUserCache } from '../middleware/redis.js';
import redisClient from "../config/redis.js";


const userRouter = Router();

// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 10mb
  },
});
const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, firstname, lastname, bio, image FROM users');
    const users = result.rows;
    for (let user of users) {
      if (user.image) {
        user.image = await getImageUrl(user.image)
      }
    }

    res.json(users);
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
    const user = result.rows[0];
    // cache the user
    await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
      EX: 3600,
      NX: true
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get a single user by id
userRouter.get('/:id', cacheUser, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT id, username, email, firstname, lastname, bio, image FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    if (user.image) {
      user.image = await getImageUrl(user.image)
    }
    await redisClient.set(`user:${id}`, JSON.stringify(user), {
      EX: 3600,
      NX: true
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);

// Update a user
userRouter.put('/:id', invalidateUserCache, async (req, res) => {
  const { id } = req.params;
  const { username, email, firstname, lastname, bio } = req.body;
  try {
    const result = await db.query(
      'UPDATE users SET username = $1, email = $2, firstname = $3, lastname = $4, bio = $5 WHERE id = $6 RETURNING id, username, email, firstname, lastname, bio',
      [username, email, firstname, lastname, bio, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = result.rows[0];

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);

// upload a profile picture
userRouter.put('/:id/profilePicture', invalidateUserCache, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1200, width: 720, fit: "cover" })
    .toBuffer()

  // upload to s3
  const imageName = generateFileName()
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageName,
    Body: fileBuffer,
    ContentType: file.mimetype
  }
  const command = new PutObjectCommand(params)
  await s3Client.send(command)

  // update the user with the image name
  try {
    const result = await db.query(
      'UPDATE users SET image = $1 WHERE id = $2 RETURNING id, username, email, firstname, lastname, bio, image',
      [imageName, id]
    );
    const user = result.rows[0]
    user.image = await getImageUrl(user.image)

    // cache the user
    await redisClient.set(`user:${user.id}`, JSON.stringify(user), {
      EX: 180,
      NX: true
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
);

// Delete a user image
userRouter.delete('/:id/profilePicture', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'SELECT image FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const imageName = result.rows[0].image
    if (!imageName) {
      return res.json({ error: 'User does not have an image' });
    }
    const command = new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: imageName
    })
    await s3Client.send(command)
    const result2 = await db.query(
      'UPDATE users SET image = NULL WHERE id = $1 RETURNING id, username, email, firstname, lastname, bio, image',
      [id]
    );
    const user = result2.rows[0]
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
);


// Get a signed URL for the image
const getImageUrl = async (imageName) => {
  return await getSignedUrl(s3Client, new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: imageName,
    Expires: 3600,
  }))
}


export default userRouter;
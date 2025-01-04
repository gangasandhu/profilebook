import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import userRouter from './controllers/userController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);

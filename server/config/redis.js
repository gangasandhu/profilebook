import dotenv from 'dotenv/config';
import redis from 'redis';


const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
});
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});
try {
    await redisClient.connect();
    console.log('Connected to Redis');
} catch (err) {
    console.log('Error connecting to Redis: ', err);
}


export default redisClient;
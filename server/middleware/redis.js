import redisClient from "../config/redis.js";

const cacheUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const cachedUser = await redisClient.get(`user:${id}`);
        if (cachedUser) {
            res.json(JSON.parse(cachedUser));
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: 'An error occurred while getting cached user' });
    }

};

const invalidateUserCache = async(req, res, next) => {
    const { id } = req.params;
    try {
        const cachedUser = await redisClient.get(`user:${id}`);
        if (cachedUser) {
            await redisClient.del(`user:${id}`);
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: 'An error occurred while invalidating cached user' });
    }
}


export { cacheUser, invalidateUserCache };

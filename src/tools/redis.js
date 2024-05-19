import {createClient} from 'redis'

const REDIS_CLIENT_URL = 'redis://127.0.0.1:6379'

let redisClient;

async function initRedisClient() {
    try {
        redisClient = await createClient({url: REDIS_CLIENT_URL}).connect();
        console.log('Redis is successfully connected');
    }
    catch (e) {
        console.log(`Redis is broken, error: ${e.message}`)
    }
}

export {redisClient, initRedisClient};
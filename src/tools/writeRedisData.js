import {redisClient} from "./redis.js";

export const writeRedisData = (redisKey, data) => {
    if (!redisClient?.isReady) {
        return;
    }

    if (typeof data === 'object') {
        redisClient.set(redisKey, JSON.stringify(data));
    }
    else {
        redisClient.set(redisKey, data);
    }
}
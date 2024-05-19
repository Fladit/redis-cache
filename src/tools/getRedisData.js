import {redisClient} from "./redis.js";

export const getRedisData = async (redisKey) => {
    if (!redisClient?.isReady) {
        return;
    }

    const redisData = await redisClient.get(redisKey);

    if (redisData) {
        try {
            const JsonRedisData = JSON.parse(redisData);

            return JsonRedisData;
        } catch (e) {
            return redisData;
        }
    }
}
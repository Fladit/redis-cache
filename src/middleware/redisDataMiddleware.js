import {redisClient} from "../tools/redis.js";
import getHash from "object-hash"
import {getRedisData} from "../tools/getRedisData.js";
import {writeRedisData} from "../tools/writeRedisData.js";

export const redisDataMiddleware = (options) => {
    return async (req, res, next) => {
        if (!redisClient?.isReady) {
            next();
            return;
        }

        const currentPath = req.originalUrl;
        const reqBody = req.body;
        const reqData = {url: currentPath, data: reqBody};

        const redisKey = getHash(reqData);
        const redisData = await getRedisData(redisKey)

        if (redisData) {
            res.send(redisData);

            return;
        }


        const oldSendFunction = res.send;
        res.send = function (data) {
            writeRedisData(redisKey, data);

            res.send = oldSendFunction;
            res.send(data);
        }
        next()
    }
}
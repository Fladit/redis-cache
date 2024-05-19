import express from 'express';
import {postsRouter} from "./routes/posts.js";
import {initRedisClient, redisClient} from "./tools/redis.js";
import {redisDataMiddleware} from "./middleware/redisDataMiddleware.js";

const port = 3000;
const app = express();

app.use('/api/v1/posts/', redisDataMiddleware(), postsRouter);

startApp();

async function startApp() {
    await initRedisClient();
    app.listen(port, (err) => {
        if (err) {
            console.log("Error in server setup");
            if (redisClient.isReady) {
                redisClient.disconnect();
            }

        }
        else {
            console.log(`Server started at port ${port}`);
        }
    })
}
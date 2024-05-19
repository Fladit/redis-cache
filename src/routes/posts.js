import express from 'express';
import {postsController} from "../controller/posts.js";

const postsRouter = express.Router();

postsRouter.get('/', postsController.getPosts)

postsRouter.get('/:id', postsController.getPostById)


export {postsRouter};
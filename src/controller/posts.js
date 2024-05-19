import axios from 'axios';

class PostsController {
    async getPosts(req, res) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

        const posts = response.data;

        res.send(posts);
    }

    async getPostById(req, res) {
        const id = req.params.id;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

        const post = response.data;

        res.send(post);
    }
}

export const postsController = new PostsController();
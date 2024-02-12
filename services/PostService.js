import Post from "../models/Post.js";
import ApiError from "../exceptions/ApiError.js";

class PostService {
    async index(user_id) {
        const posts = await Post.find({ user: user_id })
        return posts;
    }
    async store(postDto) {
        const post = await Post.create({ ...postDto });
        return post;
    }
    async update(id, postDto) {
        const updatedPost = await Post.findByIdAndUpdate(id, postDto, { new: true });

        if (!updatedPost) {
            throw ApiError.notFound();
        }
        return updatedPost;
    }

    async delete() {

    }
}

export default new PostService();
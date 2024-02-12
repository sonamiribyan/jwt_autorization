import PostService from "../services/PostService.js";
import PostDto from "../DTOs/PostDto.js";
class PostController {
    async index(req, res, next) {
        try {
            const { id } = req.params;
            const posts = await PostService.index(id);
            res.json({ 'success': true, posts });
        } catch (error) {
            next(error);
        }
    }
    async store(req, res, next) {
        try {
            const { id } = req.params;
            const { title, descriprion } = req.body;
            const postDto = new PostDto(title, descriprion, id);
            const post = await PostService.store(postDto);
            res.json({ success: true, post });
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, user_id } = req.body;
            const postDto = new PostDto(title, description, user_id);
            const post = await PostService.update(id, postDto);
            res.json({ success: true, post })
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

export default new PostController();
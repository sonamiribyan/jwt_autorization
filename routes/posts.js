import Router from 'express';
import PostController from '../controllers/PostController.js';
import { postStoreSchema, postUpdateSchema } from '../Jois/PostJoi.js';
import validateRequest from '../middlewares/ValidationMiddleware.js';
import authMiddleware from '../middlewares/AuthMiddleware.js';
const router = new Router();


router.get('/:id', authMiddleware, PostController.index);
router.post('/:id', authMiddleware, validateRequest(postStoreSchema), PostController.store);
router.put('/:id', authMiddleware, validateRequest(postUpdateSchema), PostController.update);
router.delete('/:id', authMiddleware, PostController.delete);


export default router;
import Router from 'express';
import userRouter from './users.js'
import postRouter from './posts.js';
const router = new Router();

router.use('/user', userRouter);
router.use('/posts', postRouter);

export default router;
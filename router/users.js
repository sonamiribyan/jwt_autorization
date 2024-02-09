import Router from 'express';

const userRouter = new Router();
userRouter.post('/login', (req, res) => { res.json({ message: '1111' }) });
userRouter.post('/registration', (req, res) => { res.json({ message: '1111' }) });
userRouter.get('/logout', (req, res) => { res.json({ message: '1111' }) });
userRouter.get('/refresh', (req, res) => { res.json({ message: '1111' }) });
userRouter.get('/activate/:link', (req, res) => { res.json({ message: '1111' }) });
userRouter.get('/users', (req, res) => { res.json({ message: '1111' }) });


export default userRouter;
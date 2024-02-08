import Router from 'express';
import UserController from '../controllers/UserController.js';
const router = new Router();

router.post('/login', UserController.login);
router.post('/registration', UserController.register);
router.post('/activate/:link', UserController.activate);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.post('/', UserController.all);


export default router;
import Router from 'express';
import UserController from '../controllers/UserController.js';
import validateRequest from '../middlewares/ValidationMiddleware.js';
import registerSchema from '../Jois/RegisterJoi.js';
import loginShcema from '../Jois/LoginJoi.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
const router = new Router();

router.post('/login', validateRequest(loginShcema), UserController.login);
router.post('/registration', validateRequest(registerSchema), UserController.register);
router.get('/activate/:link', UserController.activate);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.post('/', AuthMiddleware, UserController.all);


export default router;
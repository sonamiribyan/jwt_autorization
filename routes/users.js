import Router from 'express';
import UserController from '../controllers/UserController.js';
import validateRequest from '../middlewares/ValidationMiddleware.js';
import registerSchema from '../Jois/RegisterJoi.js';
const router = new Router();

router.post('/login', UserController.login);
router.post('/registration', validateRequest(registerSchema), UserController.register);
router.post('/activate/:link', UserController.activate);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refresh);
router.post('/', UserController.all);


export default router;
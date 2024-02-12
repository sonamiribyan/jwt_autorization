import UserService from "../services/UserService.js";
import TokenService from "../services/TokenService.js";
class UserController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await UserService.login(email, password);
            res.cookie('refreshToken', result.tokens.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await UserService.register(email, password);
            res.cookie('refreshToken', result.tokens.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.json(result.user);

        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await TokenService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json({ success: true, message: "User logged out successfully" });
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const data = await TokenService.refresh(refreshToken);
            res.cookie('refreshToken', data.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            res.json({ success: true, data });
        } catch (error) {
            next(error);
        }
    }
    async all(_, res, next) {
        try {
            const users = await UserService.all();
            res.json({ users });
        } catch (error) {
            next(error);
        }
    }
    async activate(req, res, next) {
        try {
            const { activationLink } = req.params;
            await UserService.activate(activationLink);
            res.redirect(process.env.WEB_URL);
        } catch (error) {
            next(error);
        }
    }
}
export default new UserController();
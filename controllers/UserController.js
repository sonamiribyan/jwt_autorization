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
            console.log(error)
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log(refreshToken);
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
            const tokens = await TokenService.refresh(refreshToken);
            res.json(tokens);

        } catch (error) {
            next(error);
        }
    }
    async all(_, res) {
        try {
            const users = await UserService.all();
            res.json({ users });
        } catch (error) {
            console.log(error);
        }
    }
    async activate(req, res) {
        try {
            res.json({ success: true });

        } catch (error) {
            console.log(error);
        }
    }
}
export default new UserController();
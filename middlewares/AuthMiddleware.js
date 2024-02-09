import ApiError from "../exceptions/ApiError";
import tokenService from "../services/TokenService";
export default function (req, res, next) {
    try {
        const autentificationHeader = req.headers.autorization;
        if (!autentificationHeader) {
            return next(ApiError(401, 'anauthenticated error'));
        }
        const accessToken = autentificationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError(401, 'anauthenticated error'));
        }
        const userData = tokenService.validateAccesToken(accessToken);
        if (!userData) {
            return next(ApiError(401, 'anauthenticated error'));
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError(401, 'anauthenticated error'));
    }
}
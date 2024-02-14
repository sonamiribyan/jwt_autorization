import ApiError from "../exceptions/ApiError.js";
import tokenService from "../services/TokenService.js";
export default function (req, res, next) {
    try {
        const autentificationHeader = req.headers.authorization;
        if (!autentificationHeader) {
            return next(ApiError.unauthorizedError('unauthorizedError'));
        }
        const accessToken = autentificationHeader.split(' ')[2];
        if (!accessToken) {

            return next(ApiError.unauthorizedError('unauthorizedError'));
        }

        const userData = tokenService.validateAccesToken(accessToken); // Await the result
        if (!userData) {

            return next(ApiError.unauthorizedError('unauthorizedError'));
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError.unauthorizedError('unauthorizedError'));
    }
}
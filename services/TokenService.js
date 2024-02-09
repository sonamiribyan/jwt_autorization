import ApiError from '../exceptions/ApiError.js';
import Token from '../models/Token.js';
import JWT from 'jsonwebtoken';


class TokenService {
    generateTokens(payload) {
        const accessToken = JWT.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' });
        const refreshToken = JWT.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveTokensToDatabase(user_id, refreshToken) {
        let existingToken = await Token.findOne({ user_id }).exec();
        console.log(existingToken);
        if (existingToken) {
            existingToken.token = refreshToken;
            await existingToken.save();
        } else {
            await Token.create({
                user_id,
                token: refreshToken,
            });
        }
    }

    async refresh(refreshToken) {

    }
    async validateAccesToken(accessToken) {

    }
    async validateRefreshToken(refreshToken) {

    }

    async logout(refreshToken) {
        const tokenRecord = await Token.findOneAndDelete({ token: refreshToken });
        if (!tokenRecord) {
            throw ApiError.badRequest('refreshToken not found');
        }
    }
}

export default new TokenService();
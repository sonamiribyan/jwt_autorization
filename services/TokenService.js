import ApiError from '../exceptions/ApiError.js';
import Token from '../models/Token.js';
import JWT from 'jsonwebtoken';
import User from '../models/User.js';
import UserDto from '../DTOs/UserDto.js';

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
        if (!refreshToken) {
            throw ApiError.unautorizedError('unauthorizedError');
        }
        const userData = await this.validateRefreshToken(refreshToken);
        const token = await this.getTokenFromDatabase(refreshToken);
        if (!token || !userData) {
            throw ApiError.unauthorizedError('unauthorizedError'); // Assuming unautorizedError() is a method for creating an unauthorized error
        }
        const userId = userData?._doc?._id || (userData.email && userData.email._id);

        const user = await User.findById(userId);

        const userDto = new UserDto(user);
        const tokens = this.generateTokens({ ...userDto });
        await this.saveTokensToDatabase(user.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }
     validateAccesToken(accessToken) {
        try {
            const user = JWT.verify(accessToken, process.env.JWT_ACCESS_KEY)
            return user;
        } catch (error) {
            return null;
        }
    }
    async validateRefreshToken(refreshToken) {
        try {
            const user = JWT.verify(refreshToken, process.env.JWT_REFRESH_KEY)
            return user;
        } catch (error) {
            return null;
        }
    }

    async logout(refreshToken) {
        const tokenRecord = await Token.findOneAndDelete({ token: refreshToken });
        if (!tokenRecord) {
            throw ApiError.badRequest('refreshToken not found');
        }
    }
    async getTokenFromDatabase(refreshToken) {
        const token = await Token.findOne({ token: refreshToken }).exec();
        return token;
    }
}

export default new TokenService();
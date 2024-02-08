import User from '../models/User.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import UserDto from '../DTOs/UserDto.js';
import tokenService from './TokenService.js';
import ApiError from '../exceptions/ApiError.js';
import mailService from './MailService.js';
class UserService {
    async login(email, password) {
        const user = await User.findOne({ email }).exec();
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const tokens = tokenService.generateTokens({ ...user });
                await tokenService.saveTokensToDatabase(user.id, tokens.refreshToken);
                return {
                    user: new UserDto(user.email, user.password),
                    tokens
                };
            }
            else {
                throw new ApiError(400, 'Invalid email or password');
            }
        }
        else {
            throw new ApiError(400, 'Invalid email or password');
        }
    }
    async register(email, password) {
        const credential = await User.findOne({ email }).exec();
        if (credential) {
            if (credential) {
                throw ApiError.badRequest('User already registered');
            }
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        const activationLink = uuid.v4();
        const userData = await User.create({ email, password: hashPassword, activationLink });
        const tokens = tokenService.generateTokens({ ...userData });
        await tokenService.saveTokensToDatabase(userData.id, tokens.refreshToken);
        await mailService.sendActivationEmail(userData.email, `${process.env.API_URL}/api/activate/activationLink`);
        return {
            user: new UserDto(userData.email, userData.password, userData.activationLink),
            tokens
        };
    }


    async all() {
        const users = User.find();
        return users;
    }
    async activate() {

    }
}


export default new UserService();
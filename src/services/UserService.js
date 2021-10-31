import { BaseService } from './baseService';

class UserService extends BaseService {

    signinCyberbugs = (userLogin) => {
        return this.post('Users/signin', userLogin)
    }
}

export const userService = new UserService();
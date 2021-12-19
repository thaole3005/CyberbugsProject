import { BaseService } from './baseService';
import Axios from 'axios';
import { CYBERBUGS_DOMAIN } from './../utils/constants/settingSystem';


class UserService extends BaseService {

    signinCyberbugs = (userLogin) => {
        // console.log("userLogin in service", userLogin);
        // return this.post('Users/signin', userLogin)
        
            return Axios({
                url: `${CYBERBUGS_DOMAIN}/Users/signin`,
                method: 'POST',
                data: userLogin,
    
            });
    
    }

    getUserCyberbugsSearch = (kewWordName) => {
        return this.get(`Users/getUser?keyword=${kewWordName}`)
    }

    assignUserToProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    }

    removeUserFromProject = (userProject) => {
        return this.post('Project/removeUserFromProject', userProject);
    }

    getUserByProjectId = (projectId) => {
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`);
    }
}

export const userService = new UserService();
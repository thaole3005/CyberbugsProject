import Axios from 'axios';
import { CYBERBUGS_DOMAIN } from '../utils/constants/settingSystem';
import { CYBERBUGS_TOKEN } from '../utils/constants/settingSystem';

export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc";


export class BaseService {
    put = (url, model) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN),
                TokenCybersoft: TOKEN_CYBERSOFT,
                
            }

        })
    }


    post = (url, model) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN),
                TokenCybersoft: TOKEN_CYBERSOFT,
                
            }

        })
    }



    get = (url) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN),
                TokenCybersoft: TOKEN_CYBERSOFT,
                
            }

        })
    }



    delete = (url) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN),
                TokenCybersoft: TOKEN_CYBERSOFT,
                
            }

        })
    }



}
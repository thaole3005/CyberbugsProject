import Axios from 'axios';
import { CYBERBUGS_DOMAIN } from '../utils/constants/settingSystem';
import { CYBERBUGS_TOKEN } from '../utils/constants/settingSystem';


export class BaseService {
    put = (url, model) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN)}

        })
    }


    post = (url, model) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN)}

        })
    }



    get = (url) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN)}

        })
    }



    delete = (url) => {
        return Axios({
            url: `${CYBERBUGS_DOMAIN}/${url}`,
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(CYBERBUGS_TOKEN)}

        })
    }



}
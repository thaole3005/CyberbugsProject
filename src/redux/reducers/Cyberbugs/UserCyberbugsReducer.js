import { USER_LOGIN_CYBERBUGS, USER_SIGNIN_CYBERBUGS } from './../../constants/Cyberbugs/UserConst';
let userLogin = {};

if(localStorage.getItem(USER_LOGIN_CYBERBUGS)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN_CYBERBUGS));
}


const initialState = {
    userLogin: userLogin,
}

export const UserCyberbugsReducer =  (state = initialState, action) => {
    switch (action.type) {

    case USER_SIGNIN_CYBERBUGS: {
        state.userLogin = action.userLogin;
        return { ...state}
    }

    default:
        return state
    }
}

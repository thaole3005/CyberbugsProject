import { USER_LOGIN_CYBERBUGS, USER_SIGNIN_CYBERBUGS, GET_USER_CYBERBUGS_SEARCH, GET_USER_BY_PROJECT_ID, LOG_OUT } from './../../constants/Cyberbugs/UserConst';
let userLogin = {};

if(localStorage.getItem(USER_LOGIN_CYBERBUGS)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN_CYBERBUGS));
}


const initialState = {
    userLogin: userLogin,
    userSearchList: [], //khi search user (mảng này lấy giá trị theo userNameKeyWord) => nếu keyWord = '' nghĩa là lấy tất cả user
    
   arrUserByProjectId: [],
}

export const UserCyberbugsReducer =  (state = initialState, action) => {
    switch (action.type) {

    case USER_SIGNIN_CYBERBUGS: {
        state.userLogin = action.userLogin;
        return { ...state}
    }
    
    case GET_USER_CYBERBUGS_SEARCH: {
        state.userSearchList = action.userSearchList;
        // console.log("state.userSearchList", state.userSearchList);
        return { ...state}

    }

    case GET_USER_BY_PROJECT_ID: {
        return { ...state, arrUserByProjectId: action.arrUserByProjectId};
    }

    case LOG_OUT: {
        localStorage.removeItem(USER_LOGIN_CYBERBUGS);
        return {...state, userLogin: {}};
    }

    default:
        return state
    }
}

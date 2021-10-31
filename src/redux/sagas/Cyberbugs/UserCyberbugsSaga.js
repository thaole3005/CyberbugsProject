import {fork, take, takeEvery,delay, takeLatest,call, put, select } from 'redux-saga/effects';
import { USER_SIGNIN_CYBERBUGS_SAGA } from '../../constants/Cyberbugs/UserConst';
import { userService } from './../../../services/UserService';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { STATUS_CODE } from './../../../utils/constants/settingSystem';
import {CYBERBUGS_TOKEN} from '../../../utils/constants/settingSystem';
import { USER_LOGIN_CYBERBUGS, USER_SIGNIN_CYBERBUGS } from './../../constants/Cyberbugs/UserConst';
// import { history } from './../../../utils/libs/history';


function * signinCyberbugsSaga(action) {
    // console.log("action in signinCyberbugsSaga", action);     
    let {userLogin} = action;
    
    //dispatch normal action để thay đổi isLoading trên reducer
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(1000);

    try {
        let {data, status} = yield call (() => userService.signinCyberbugs(userLogin));
        // console.log("data in signinCyberbugsSaga", data);

        //lưu token và infor của user vào local storage
        if(status === STATUS_CODE.SUCCESS) {
            localStorage.setItem(CYBERBUGS_TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN_CYBERBUGS, JSON.stringify(data.content));


            //dăng nhập thành công thì chuyển về trang home
            //!c1:
            // action.history.push('/home');


            //!c2: lấy history từ HistoryReducer về 
            let history = yield select(state => state.HistoryReducer);
            console.log("history lấy đc ở UserCyberbugsSaga", history);
            history.push('/home');

            yield put({
                type: USER_SIGNIN_CYBERBUGS,
                userLogin: data.content,
            })
        }
    } catch (error) {
        console.log("error", error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiSigninCyberbugsSaga() {
    yield takeLatest(USER_SIGNIN_CYBERBUGS_SAGA, signinCyberbugsSaga)
}
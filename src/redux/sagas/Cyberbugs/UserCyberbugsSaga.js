import {fork, take, takeEvery,delay, takeLatest,call, put, select } from 'redux-saga/effects';
import { ASSIGN_USER_TO_PROJECT_SAGA, LOG_OUT_SAGA, USER_SIGNIN_CYBERBUGS_SAGA } from '../../constants/Cyberbugs/UserConst';
import { userService } from './../../../services/UserService';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { STATUS_CODE } from './../../../utils/constants/settingSystem';
import {CYBERBUGS_TOKEN} from '../../../utils/constants/settingSystem';
import { USER_LOGIN_CYBERBUGS, USER_SIGNIN_CYBERBUGS, GET_USER_CYBERBUGS_SEARCH_SAGA, GET_USER_CYBERBUGS_SEARCH, REMOVE_USER__PROJECT_SAGA, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_BY_PROJECT_ID, LOG_OUT, REMOVE_USER_FROM_PROJECT_SAGA } from './../../constants/Cyberbugs/UserConst';
// import { history } from './../../../utils/libs/history';
import { GET_PROJECT_LIST_SAGA } from './../../constants/Cyberbugs/ProjectConst/ProjectConst';


function * signinCyberbugsSaga(action) {
    console.log("action in signinCyberbugsSaga", action);     
    let {userLogin} = action;
    
    //dispatch normal action để thay đổi isLoading trên reducer
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(1000);

    try {
        let {data, status} = yield call (() => userService.signinCyberbugs(userLogin));
        console.log("data in signinCyberbugsSaga", data);

        //lưu token và infor của user vào local storage
        if(status === STATUS_CODE.SUCCESS) {
            localStorage.setItem(CYBERBUGS_TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN_CYBERBUGS, JSON.stringify(data.content));

            yield put({
                type: USER_SIGNIN_CYBERBUGS,
                userLogin: data.content,
            })

            //dăng nhập thành công thì chuyển về trang home
            //!c1:
            // action.history.push('/home');


            //!c2: lấy history từ HistoryReducer về 
            let history = yield select(state => state.HistoryReducer);
            console.log("history lấy đc ở UserCyberbugsSaga", history);
            history.push('/projectmanagement');

          
        }
    } catch (error) {
        console.log("error", error.response.data);
        yield put({
            type: HIDE_LOADING,
          });
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiSigninCyberbugsSaga() {
    yield takeLatest(USER_SIGNIN_CYBERBUGS_SAGA, signinCyberbugsSaga)
}






//--------------NHIỆM VỤ GET USERS theo searchValue khi bấm vào dấu + để thêm Usser---------------
//!hàm getUser lấy ra 1 mảng các đối tượng user có user.name chứa keyWord mà ng dùng nhập vào

function * getUserCyberbugsSearchSaga(action) {
    // console.log("ACTION in getUserCyberbugsSearchSaga", action);
    let {kewWordName} = action;
   
    try {
        let {data, status} = yield call (() => userService.getUserCyberbugsSearch(kewWordName));
        // console.log("data in getUserCyberbugsSearchSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
            //dispatch userList lấy đc từ server lên reduxStore
            yield put({
                type: GET_USER_CYBERBUGS_SEARCH,
                userSearchList: data.content,
            })
        }
    } catch (error) {
        console.log("err", error.response.data);
    }

  
}


export function * theoDoiGetProjectListSaga() {
    yield takeLatest (GET_USER_CYBERBUGS_SEARCH_SAGA, getUserCyberbugsSearchSaga);
}





//--------------NHIỆM VỤ ASSIGN USER TO PROJECT---------------
//!hàm getUser lấy ra 1 mảng các đối tượng user có user.name chứa keyWord mà ng dùng nhập vào

function * assignUserToProjectSaga(action) {
    // console.log("ACTION in assignUserToProjectSaga", action);
    let {userProject} = action;
   
    try {
        let {data, status} = yield call (() => userService.assignUserToProject(userProject));
        // console.log("data in assignUserToProjectSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
          //nếu assign user thành công thì dispatch lại action saga get projjectList
          yield put ({
              type: GET_PROJECT_LIST_SAGA,
          })
        }
    } catch (error) {
        console.log("err", error.response.data);
    }

  
}


export function * theoDoiAssignUserToProjectSaga() {
    yield takeLatest (ASSIGN_USER_TO_PROJECT_SAGA, assignUserToProjectSaga);
}




//--------------NHIỆM VỤ REMOVE USER FROM PROJECT---------------
//!hàm getUser lấy ra 1 mảng các đối tượng user có user.name chứa keyWord mà ng dùng nhập vào

function * removeUserFromProjectSaga(action) {
    console.log("ACTION in removeUserFromProjectSaga", action);
    let {userProject} = action;
   
    try {
        let {data, status} = yield call (() => userService.removeUserFromProject(userProject));
        console.log("data in removeUserFromProjectSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
          //nếu remove user thành công thì dispatch lại action saga get projjectList
          yield put ({
              type: GET_PROJECT_LIST_SAGA,
          })
        }
    } catch (error) {
        console.log("err", error.response.data);
    }

  
}


export function * theoDoiRemoveUserFromProjectSaga() {
    yield takeLatest (REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProjectSaga);
}






//--------------NHIỆM VỤ GET USERS BY PROJECT ID (sử dụng trong formCreateTask, khi chọn project nào ở dropdown trong form CreateTask thì ở phần assigner user chỉ hiện userList của project đó mà thôi)---------------

//!hàm getUserByProjectId lấy ra 1 mảng users ứng vs project đc chọn trong dropdown của formCreateTask

function * getUserByProjectId(action) {
    // console.log("ACTION in getUserByProjectId", action);
    let {projectId} = action;
   
    try {
        let {data, status} = yield call (() => userService.getUserByProjectId(projectId));
        // console.log("data in getUserByProjectId", data);
        if(status === STATUS_CODE.SUCCESS) {
            // dispatch userList theo projectId lấy đc từ server lên reduxStore
            yield put({
               type: GET_USER_BY_PROJECT_ID,
               arrUserByProjectId: data.content,
            })
        }
    } catch (error) {
        console.log("err", error.response.data);
    }

  
}


export function * theoDoiGetUserByProjectIdSaga() {
    yield takeLatest (GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectId);
}








function * logOutSaga(action) {
    // console.log("ACTION in removeUserFromProjectSaga", action);
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(1000);

    yield put ({
        type: LOG_OUT,
    })

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiLogOutSaga() {
    yield takeLatest (LOG_OUT_SAGA, logOutSaga);
}

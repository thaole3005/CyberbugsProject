import {fork, take, takeEvery,delay, takeLatest,call, put, select } from 'redux-saga/effects';
import { GET_ALL_PROJECT_CATEGORY_SAGA, GET_ALL_PROJECT_CATEGORY } from './../../../constants/Cyberbugs/ProjectConst/ProjectCategoryConst';
import { projectService } from './../../../../services/ProjectService';
import { STATUS_CODE } from './../../../../utils/constants/settingSystem';
import { CREATE_PROJECT_SAGA, GET_PROJECT_LIST_SAGA, GET_PROJECT_LIST, UPDATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_PROJECT_DETAIL_SAGA, PUT_PROJECT_DETAIL } from './../../../constants/Cyberbugs/ProjectConst/ProjectConst';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../../constants/LoadingConst';
import { CLOSE_DRAWER } from '../../../constants/Cyberbugs/DrawConst/DrawConst';
import { displayNotifyFunction } from './../../../../utils/Notification/Notification';
import { GET_USER_BY_PROJECT_ID_SAGA } from './../../../constants/Cyberbugs/UserConst';


//--------------NHIỆM VỤ CREATE PROJECT tại /createproject---------------

function * createProjectSaga(action) {
    // console.log("ACTION in createProjectSaga", action);
    let {newProject} = action;
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(500);
    try {
        let {data, status} = yield call (() => projectService.createProject(newProject));
        // console.log("data in createProjectSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
            //nếu tạo projject mới thành công thì chuyển hướng sang trang /projectmanagemnt
             //lấy history từ HistoryReducer về 
              let history = yield select(state => state.HistoryReducer);
            //   console.log("history lấy đc ở HistoryReducer", history);
              history.push('/projectmanagement');
        }
    } catch (error) {
        console.log("err", error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiCreateProjectSaga() {
    yield takeLatest (CREATE_PROJECT_SAGA, createProjectSaga);
}




//--------------NHIỆM VỤ GET ALL PROJECT---------------
function * getProjectListSaga(action) {
    // console.log("ACTION in createProjectSaga", action);
  
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(500);
    try {
        let {data, status} = yield call (() => projectService.getProjectList());
        // console.log("data in getProjectListSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
            //dispatch projectList lấy đc từ server lên reduxStore
            yield put({
                type: GET_PROJECT_LIST,
                projectList: data.content,
            })

               if(data.content[0]?.members.length > 0) {
                //mặc định khi mở form createTask thì ở mục ASSIGNERS sẽ lấy userList ủa project đầu tiên trong dropdown Project Name (nếu projject đầu tiên có member)
                yield put({
                type: GET_USER_BY_PROJECT_ID_SAGA,
                projectId: data.content[0]?.id,
                })
            }

        }
    } catch (error) {
        console.log("err", error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiGetProjectListSaga() {
    yield takeLatest (GET_PROJECT_LIST_SAGA, getProjectListSaga);
}







//--------------NHIỆM VỤ UPDATE PROJECT---------------
function * updateProjectSaga(action) {
    // console.log("ACTION in updateProjectSaga", action);
    const {updatedProject} = action;
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(500);
    try {
        let {data, status} = yield call (() => projectService.updateProject(updatedProject));
        // console.log("data in updateProjectSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
          //nếu updateProject thành công thì gọi lại action getTaskList
          yield put({
              type: GET_PROJECT_LIST_SAGA,
          });

          yield put({
              type: CLOSE_DRAWER,
          })
        }
    } catch (error) {
        console.log("err", error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiUpdateProjectSaga() {
    yield takeLatest (UPDATE_PROJECT_SAGA, updateProjectSaga);
}





//--------------NHIỆM VỤ DELETE PROJECT---------------
function * deleteProjectSaga(action) {
    // console.log("ACTION in deleteProjectSaga", action);
    const {projectId, projectName} = action;
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(500);
    try {
        let {data, status} = yield call (() => projectService.deleteProject(projectId));
        // console.log("data in updateProjectSaga", data);
        if(status === STATUS_CODE.SUCCESS) {
          //nếu deleteProjectSaga thành công thì hiển thị nofify xóa thành công rồi gọi lại action getTaskList
          displayNotifyFunction("success", `Xóa Project ${projectName} thành công`)
          yield put({
              type: GET_PROJECT_LIST_SAGA,
          });

        }
    } catch (error) {
        displayNotifyFunction("error", `Xóa Project ${projectName} không thành công`)
        console.log("err", error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiDeleteProjectSaga() {
    yield takeLatest (DELETE_PROJECT_SAGA, deleteProjectSaga);
}








//--------------NHIỆM VỤ GET PROJECT DETAIL---------------
function * getProjectDetailSaga(action) {
    // console.log("ACTION in getProjectDetailSaga", action);
    const {projectId} = action;
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(500);
    try {
        let {data, status} = yield call (() => projectService.getProjectDetail(projectId));
        // console.log("data in getProjectDetailSaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            //?nếu lấy đc thông tin của projectDetail thành công thì đưa nó lên reduxStỏe của ProjectReducer để trang projectDetail biding lại dữ liệu 
            yield put ({
                type: PUT_PROJECT_DETAIL,
                projectDetail: data.content,
            })
        }

    } catch (error) {
        displayNotifyFunction("error", "getProject detail fails");
        let history = yield select(state => state.HistoryReducer);
        history.push('/projectmanagement');
        console.log("err", error.response.data);
    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiGetProjectDetailSaga() {
    yield takeLatest (GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}


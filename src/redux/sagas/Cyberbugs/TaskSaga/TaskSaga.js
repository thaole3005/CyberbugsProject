import {fork, take, takeEvery,delay, takeLatest,call, put, select } from 'redux-saga/effects';
import { STATUS_CODE } from './../../../../utils/constants/settingSystem';
import { displayNotifyFunction } from './../../../../utils/Notification/Notification';
import { taskService } from './../../../../services/TaskService';
import { GET_ALL_TASK_PRIORITY, GET_ALL_TASK_PRIORITY_SAGA, GET_ALL_TASK_STATUS, GET_ALL_TASK_STATUS_SAGA, GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA, CREATE_NEW_TASK_SAGA, GET_TASK_DETAIL_SAGA, GET_TASK_DETAIL, UPDATE_STATUS_TASK_SAGA, HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK, CHANGE_TASK_DETAIL_MODAL, CHANGE_TASK_ASSIGNESS, REMOVE_USER_ASSIGN } from './../../../constants/Cyberbugs/TaskConst/TaskConst';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../../constants/LoadingConst';
import { CLOSE_DRAWER } from '../../../constants/Cyberbugs/DrawConst/DrawConst';
import { GET_PROJECT_DETAIL_SAGA } from './../../../constants/Cyberbugs/ProjectConst/ProjectConst';



//NHIỆM VỤ GET ALL TASK TYPE

function * getAllTaskTypeSaga(action) {
    // console.log("action in getAllTaskTypeSaga", action);
    try {
        let {data, status} = yield call (() => taskService.getAllTaskType());
        // console.log("data in getAllTaskTypeSaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_TYPE,
                arrTaskType: data.content,
            })
        }
    } catch (error) {
        console.log("error", error.response.data);
    }
}


export function * theoDoiGetAllTaskTypeSaga() {
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}



//NHIỆM VỤ GET ALL TASK PRIORITY

function * getAllTaskPrioritySaga(action) {
    // console.log("action in getAllTaskPrioritySaga", action);
  
    try {
        let {data, status} = yield call (() => taskService.getAllTaskPriority());
        // console.log("data in getAllTaskPrioritySaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_PRIORITY,
                arrPriority: data.content,
            })
        }
    } catch (error) {
        console.log("error", error.response.data);
    }
}


export function * theoDoiGetAllTaskPrioritySaga() {
    yield takeLatest(GET_ALL_TASK_PRIORITY_SAGA, getAllTaskPrioritySaga);
}





//NHIỆM VỤ GET ALL TASK STATUS

function * getAllTaskStatusSaga(action) {
    // console.log("action in getAllTaskStatusSaga", action);
  
    try {
        let {data, status} = yield call (() => taskService.getAllTaskStatus());
        // console.log("data in getAllTaskStatusSaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TASK_STATUS,
                arrStatus: data.content,
            })
        }
    } catch (error) {
        console.log("error", error.response.data);
    }
}


export function * theoDoiGetAllTaskStatusSaga() {
    yield takeLatest(GET_ALL_TASK_STATUS_SAGA, getAllTaskStatusSaga);
}







//NHIỆM VỤ CRETATE NEW TASK

function * createNewTaskSaga(action) {
    // console.log("action in createNewTaskSaga", action);
    const {newTask} = action;
    console.log("newTask", newTask)
    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(500);
    try {
        let {data, status} = yield call (() => taskService.createNewTask(newTask));
        // console.log("data in createNewTaskSaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            yield put ({
                type: CLOSE_DRAWER,
            });

            displayNotifyFunction("success", "Create new task successfully");
            yield put({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: newTask.projectId,
            })
        }
    } catch (error) {
        console.log("error", error.response.data);
        displayNotifyFunction("error", "Create new task fail");

    }

    yield put({
        type: HIDE_LOADING,
      });
}


export function * theoDoiCreateNewTaskSagaSaga() {
    yield takeLatest(CREATE_NEW_TASK_SAGA, createNewTaskSaga);
}





//NHIỆM VỤ GET TASK DETAIL, khi click vào popup thì hiể thị chi tiết info của task

function * getTaskDetailSaga(action) {
    // console.log("action in getTaskDetailSaga", action);
    let {taskId} = action;
    try {
        let {data, status} = yield call (() => taskService.getTaskDetail(taskId));
        // console.log("data in getTaskDetailSaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content,
            })
        }
    } catch (error) {
        console.log("error", error.response.data);
    }
}


export function * theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}




//NHIỆM VỤ UPDATE TASK mỗi khi ng dùng change Status



  function * updateStatusTaskSaga(action) {
    let {updateStatusTask, projectId} = action;
    console.log("action in updateStatusTaskSaga", action);
    console.log("updateStatusTask", updateStatusTask);
    console.log("projectId", projectId)
 
    try {
        let {data, status} = yield call (() => taskService.updateTaskStatus(updateStatusTask));
        console.log("data in updateStatusTaskSaga", data);

        if(status === STATUS_CODE.SUCCESS) {
            //gọi lại action saga getTask detail để khi ta onchange vào thẻ select thay đổi Status thì option ta chọn để update sẽ đc biding lên giao diện
            yield put ({
                type: GET_TASK_DETAIL_SAGA,
                taskId: updateStatusTask.taskId,
            })
            yield put ({
                type: GET_PROJECT_DETAIL_SAGA,
                projectId: projectId,
            })
        
        }
    } catch (error) {
        console.log("error", error.response.data);
    }
}


export function * theoDoiUpdateStatusTaskSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}





//!NHIỆM VỤ UPDATE TASK SAGA (vừa xử lí handle change dữ liệu taskDetailModal ở taskReducer, sau đó lấy taskDetailModal đã đc update đưa lên post api )

function * handleChangeThenPostApiUpdateTask(action) {

    //?B1 Gọi action lmaf thay đổi taskDetailModal ở redux reduxStore
    //!yield put( xử lí xong code bên trên rồi mới gọi code bên dưới)  ==> nghĩa là thay đổi taskDetailModal ở taskReducer, sau đó lấy taskDetailModal đã đc cập nhật để gửi lên API
    switch(action.actionType) {

        case CHANGE_TASK_DETAIL_MODAL: {
            let {name, value} = action;
            yield put({
                type: CHANGE_TASK_DETAIL_MODAL,
                name,
                value
            });
            break;
        };

        case CHANGE_TASK_ASSIGNESS: {
            let {userSelect} = action;
            yield put ({
                type: CHANGE_TASK_ASSIGNESS,
                userSelect,
            });
            break;
        };

        case REMOVE_USER_ASSIGN: {
            let {userId} = action;
            yield put ({
                type: REMOVE_USER_ASSIGN,
                userId,
            });
            break;
        }

    }


    //?B2: Lấy dữ liệu taskDetailModal đã đc update ở taskReducer và đưa lên post api
    const {taskDetailModal} = yield select(state => state.TaskReducer);
    // console.log("taskDetailModal in taskSaga", taskDetailModal)
    //* biến đổi dữ liệu của taskDetailModal thành dữ liệu 
    const listUserAsign = taskDetailModal.assigness.map(user => user.id)
    const objectTaskUpdateApi = {...taskDetailModal, listUserAsign};
    // console.log("objectTaskUpdateApi", objectTaskUpdateApi)

    try {
        const {data, status} = yield call (() => taskService.updateTask(objectTaskUpdateApi));
    // console.log("data in handleChangeThenPostApiUpdateTask", data)
    if(status === STATUS_CODE.SUCCESS) {
        yield put ({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId: taskDetailModal.projectId,
        })

        yield put ({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskDetailModal.taskId,
        })
    }
    } catch (error) {
      console.log("error in updateTask", error.response.data);
    }

    
}


export function * TheoDoiHandleChangeThenPostApiUpdateTask() {
    yield takeLatest (HANDLE_CHANGE_COMBINE_POST_API_UPDATE_TASK, handleChangeThenPostApiUpdateTask)
}

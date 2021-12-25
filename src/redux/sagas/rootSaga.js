
import {fork, take, takeEvery,delay, takeLatest,call, put, all } from 'redux-saga/effects';
import { theoDoiGetAllProjectCategory } from './Cyberbugs/ProjectSaga/ProjectCategorySaga';
import *as UserCyberbugs from './Cyberbugs/UserCyberbugsSaga';
import * as ProjectCyberbugs from './Cyberbugs/ProjectSaga/ProjectSaga';
import * as TaskCyberbugs from './Cyberbugs/TaskSaga/TaskSaga';

export function * rootSaga() {

    //!yield all nhận vào mảng các generator function để theo dõi các actionSaga
   yield all([
    UserCyberbugs.theoDoiSigninCyberbugsSaga(),
    UserCyberbugs.theoDoiGetProjectListSaga(),
    UserCyberbugs.theoDoiAssignUserToProjectSaga(),
    UserCyberbugs.theoDoiRemoveUserFromProjectSaga(),
    UserCyberbugs.theoDoiGetUserByProjectIdSaga(),
    UserCyberbugs.theoDoiLogOutSaga(),
    UserCyberbugs.theoDoiSignUpSaga(),

    
    theoDoiGetAllProjectCategory(),
    ProjectCyberbugs.theoDoiCreateProjectSaga(),
    ProjectCyberbugs.theoDoiGetProjectListSaga(),
    ProjectCyberbugs.theoDoiUpdateProjectSaga(),
    ProjectCyberbugs.theoDoiDeleteProjectSaga(),
    ProjectCyberbugs.theoDoiGetProjectDetailSaga(),


    TaskCyberbugs.theoDoiGetAllTaskTypeSaga(),
    TaskCyberbugs.theoDoiGetAllTaskPrioritySaga(),
    TaskCyberbugs.theoDoiGetAllTaskStatusSaga(),
    TaskCyberbugs.theoDoiCreateNewTaskSagaSaga(),
    TaskCyberbugs.theoDoiGetTaskDetailSaga(),
    TaskCyberbugs.theoDoiUpdateStatusTaskSaga(),
    TaskCyberbugs.TheoDoiHandleChangeThenPostApiUpdateTask(),
   ])
}
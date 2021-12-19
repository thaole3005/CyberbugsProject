import {fork, take, takeEvery,delay, takeLatest,call, put, select } from 'redux-saga/effects';
import { GET_ALL_PROJECT_CATEGORY_SAGA, GET_ALL_PROJECT_CATEGORY } from './../../../constants/Cyberbugs/ProjectConst/ProjectCategoryConst';
import { projectService } from './../../../../services/ProjectService';
import { STATUS_CODE } from './../../../../utils/constants/settingSystem';


function * getAllProjectCategory(action) {
    // console.log("ACTION in getAllProjectCategory", action);

    try {
        let {data, status} = yield call (() => projectService.getAllProjectCategory());
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                arrProjectCategory: data.content,
            })
        }

    } catch (error) {
        console.log("err", error.response.data);
    }
}


export function * theoDoiGetAllProjectCategory() {
    yield takeLatest (GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
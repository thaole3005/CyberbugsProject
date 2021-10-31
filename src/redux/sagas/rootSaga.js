
import {fork, take, takeEvery,delay, takeLatest,call, put, all } from 'redux-saga/effects';
import *as UserCyberbugs from './Cyberbugs/UserCyberbugsSaga';

export function * rootSaga() {

    //!yield all nhận vào mảng các generator function để theo dõi các actionSaga
   yield all([
    UserCyberbugs.theoDoiSigninCyberbugsSaga(),
   ])
}
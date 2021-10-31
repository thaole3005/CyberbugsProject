import {combineReducers, createStore, applyMiddleware} from 'redux';
import { LoadingReducer } from './reducers/LoadingReducer';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserCyberbugsReducer } from './reducers/Cyberbugs/UserCyberbugsReducer';


//middleware saga
import createMiddWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddWareSaga();


const rootReducer = combineReducers({
    //nơi khai báo các state của ứng dụng
    LoadingReducer,
    HistoryReducer,
    UserCyberbugsReducer,
})


export const store = createStore(rootReducer, applyMiddleware(middleWareSaga));


//goij saga bằng hàm run, hàm run nhận vào rootsaga
middleWareSaga.run(rootSaga)

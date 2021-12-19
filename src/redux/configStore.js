import {combineReducers, createStore, applyMiddleware} from 'redux';
import { LoadingReducer } from './reducers/LoadingReducer';
import { HistoryReducer } from './reducers/HistoryReducer';
import { UserCyberbugsReducer } from './reducers/Cyberbugs/UserCyberbugsReducer';
import { ProjectCategoryReducer } from './reducers/Cyberbugs/ProjectReducer/ProjectCategoryReducer';
import { ProjectReducer } from './reducers/Cyberbugs/ProjectReducer/ProjectReducer';
import { DrawerReducer } from './reducers/Cyberbugs/DrawerReducer/DrawerReducer';
import { TaskPriorityReducer } from './reducers/Cyberbugs/TaskReducer/TaskPriorityReducer';
import { TaskTypeReducer } from './reducers/Cyberbugs/TaskReducer/TaskTypeReducer';
import { TaskStatusReducer } from './reducers/Cyberbugs/TaskReducer/TaskStatusReducer';
import { TaskReducer } from './reducers/Cyberbugs/TaskReducer/TaskReducer';



//middleware saga
import createMiddWareSaga from 'redux-saga';
import { rootSaga } from './sagas/rootSaga';
const middleWareSaga = createMiddWareSaga();


const rootReducer = combineReducers({
    //nơi khai báo các state của ứng dụng
    LoadingReducer,
    HistoryReducer,
    UserCyberbugsReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    DrawerReducer,
    TaskTypeReducer,
    TaskPriorityReducer,
    TaskStatusReducer,
    TaskReducer,
})


export const store = createStore(rootReducer, applyMiddleware(middleWareSaga));


//goij saga bằng hàm run, hàm run nhận vào rootsaga
middleWareSaga.run(rootSaga)

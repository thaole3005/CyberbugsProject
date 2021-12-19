import { GET_ALL_TASK_STATUS } from './../../../constants/Cyberbugs/TaskConst/TaskConst';

const initialState = {
    arrStatus: [],
}

export const TaskStatusReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_TASK_STATUS: {
        // console.log("GET_ALL_TASK_STATUS action in reducer", action)
        return { ...state, arrStatus: action.arrStatus};
    }
       

    default:
        return state
    }
}

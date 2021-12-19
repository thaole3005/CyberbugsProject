import { GET_ALL_TASK_TYPE } from "./../../../constants/Cyberbugs/TaskConst/TaskConst";


const initialState = {
    arrTaskType: [],
}

export const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_TASK_TYPE: {
        // console.log("action in TaskTypeReducer", action)
        return { ...state, arrTaskType: action.arrTaskType};
    }

    default:
        return state
    }
}

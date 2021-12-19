
import { GET_ALL_TASK_PRIORITY } from './../../../constants/Cyberbugs/TaskConst/TaskConst';

const initialState = {
    arrPriority: [],
}

export const TaskPriorityReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_TASK_PRIORITY: {

        return { ...state, arrPriority: action.arrPriority};
    }

    default:
        return state
    }
}

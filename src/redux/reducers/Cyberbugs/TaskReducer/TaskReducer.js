
import { GET_TASK_DETAIL, CHANGE_TASK_DETAIL_MODAL, CHANGE_TASK_ASSIGNESS, REMOVE_USER_ASSIGN } from './../../../constants/Cyberbugs/TaskConst/TaskConst';
const initialState = {
  
    taskDetailModal:  {
      "priorityTask": {
        "priorityId": 3,
        "priority": "Low"
      },
      "taskTypeDetail": {
        "id": 2,
        "taskType": "new task"
      },
      "assigness": [
        {
          "id": 376,
          "avatar": "https://ui-avatars.com/api/?name=min",
          "name": "min",
          "alias": "min"
        },
        {
          "id": 432,
          "avatar": "https://ui-avatars.com/api/?name=anh",
          "name": "anh",
          "alias": "anh"
        },
        {
          "id": 464,
          "avatar": "https://ui-avatars.com/api/?name=hau",
          "name": "hau",
          "alias": "hau"
        }
      ],
      "lstComment": [],
      "taskId": 1747,
      "taskName": "task1.1",
      "alias": "task1-1",
      "description": "<p><em><strong>task1.1</strong></em> n&egrave;eeeee</p>",
      "statusId": "3",
      "originalEstimate": 7,
      "timeTrackingSpent": 5,
      "timeTrackingRemaining": 10,
      "typeId": 1,
      "priorityId": 2,
      "projectId": 1922
    },
}

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_TASK_DETAIL: {
       
        return { ...state, taskDetailModal: action.taskDetailModal};
    }

    case CHANGE_TASK_DETAIL_MODAL: {
      let {name, value} = action;
      state.taskDetailModal = {...state.taskDetailModal, [name]: value};
      return { ...state};
    }

    case CHANGE_TASK_ASSIGNESS: {
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelect]
      return { ...state};

    }

    case REMOVE_USER_ASSIGN: {
      let taskDetailModalUpdate = {...state.taskDetailModal};
      taskDetailModalUpdate.assigness = taskDetailModalUpdate.assigness.filter(user => user.id !== action.userId);

      return { ...state, taskDetailModal: taskDetailModalUpdate}
    }

    default:
        return state;
    }
}

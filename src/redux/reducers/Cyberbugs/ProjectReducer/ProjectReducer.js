import { EDIT_PROJECT, GET_PROJECT_LIST, PUT_PROJECT_DETAIL } from './../../../constants/Cyberbugs/ProjectConst/ProjectConst';

const initialState = {
    projectList: [],
    projectEdit: {
        "id": 1500,
        "projectName": "jira",
        "creator": 0,
        "description": "<h1>đây là project jira</h1>",
        "categoryId": "2"
    },

    projectDetail: {

    },

    arrProject: [], //cho dropdown tại drawer CreateTaskForm

}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_PROJECT_LIST: {

        state.projectList = action.projectList;
        return { ...state};
    }

    case EDIT_PROJECT: {
        return {...state, projectEdit: action.projectEditModel};
    }


    case PUT_PROJECT_DETAIL: {
        return {...state, projectDetail: action.projectDetail};
    }


    default:
        return state
    }
}

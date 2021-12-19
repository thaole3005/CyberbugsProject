import { GET_ALL_PROJECT_CATEGORY } from "../../../constants/Cyberbugs/ProjectConst/ProjectCategoryConst";

const initialState = {
    arrProjectCategory: [],
}

export const ProjectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

    case GET_ALL_PROJECT_CATEGORY: {
        state.arrProjectCategory = action.arrProjectCategory;
        // console.log("state.arrProjectCategory", state.arrProjectCategory);
        return { ...state};
    }

    default:
        return state;
    }
}

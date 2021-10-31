import { ADD_HISTORY } from './../constants/HistoryConst';
const history = {};

export const HistoryReducer = (state = history, action) => {
    switch (action.type) {

    case ADD_HISTORY: {
        // console.log("history", action.history);
        
        state = action.history;
        return { ...state}
    }

    default:
        return state
    }
}

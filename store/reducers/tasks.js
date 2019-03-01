import { STORE_TASKS } from 'store/constants/tasks';

const tasksInitialState = {};

function storeTasks(state, action) {
    return {
        ...state,
        list: action.tasks
    };
}

function tasksReducer(state = tasksInitialState, action) {
    switch (action.type) {
        case STORE_TASKS:
            return storeTasks(state, action);
        default:
            return state;
    }
}

export default tasksReducer;

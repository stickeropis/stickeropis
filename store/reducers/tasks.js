/* eslint-disable */
import { STORE_TASKS } from 'store/constants/tasks';

const tasksInitialState = {
    list: []
};

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

export function filteredTasksSelector(state, filters) {
    return filterTasks(filters, state.tasks.list);
}

/**
 * @param {*} filters
 * @param {import('./tasks.types').Tasks} tasks
 */
export function filterTasks(filters, tasks) {
    return tasks.filter(t => {
        return filters.every(([key, value]) => {
            if (Array.isArray(value)) {
                return value.includes(t[key]);
            }
            if (typeof value === 'string') {
                return t[key] === value;
            }
            if (typeof value === 'object') {
                return filterByObject(value, t[key]);
            }

            return false;
        });
    });
}

/**
 *
 * @param {{from?:number,to?:number}} filterValue
 * @param {number|string|Date} taskValue
 */
function filterByObject({ from, to }, taskValue) {
    if (from != null && to != null) {
        return taskValue >= from && taskValue <= to;
    }
    if (from != null) {
        return taskValue >= from;
    }
    if (to != null) {
        return taskValue <= to;
    }

    return false;
}
export default tasksReducer;

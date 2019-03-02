/* eslint-disable */
import {
    STORE_TASKS,
    SET_FILTERS,
    SET_CHECKED_TASKS
} from 'store/constants/tasks';

const tasksInitialState = {
    list: [],
    filters: new Map(),
    checkedTaskIds: undefined
};

function storeTasks(state, action) {
    return {
        ...state,
        list: action.tasks
    };
}

function setFilters(state, action) {
    return {
        ...state,
        filters: action.filters
    };
}

function setCheckedTasks(state, action) {
    return {
        ...state,
        checkedTaskIds: action.checkedTaskIds
    };
}

function tasksReducer(state = tasksInitialState, action) {
    switch (action.type) {
        case SET_FILTERS:
            return setFilters(state, action);
        case SET_CHECKED_TASKS:
            return setCheckedTasks(state, action);
        case STORE_TASKS:
            return storeTasks(state, action);
        default:
            return state;
    }
}

export function filtersSelector(state) {
    return state.tasks.filters;
}

export function checkedTasksSelector(state) {
    return state.tasks.filter(task =>
        checkedTaskIdsSelector(state).has(task.id)
    );
}

export function checkedTaskIdsSelector(state) {
    return state.tasks.checkedTaskIds || new Set([]);
}

export function filteredTasksSelector(state) {
    const parsedFilters = Array.from(state.tasks.filters.values()).flatMap(
        item => Object.entries(item)
    );
    return filterTasks(parsedFilters, state.tasks.list);
}

/**
 * @param {*} filters
 * @param {import('./tasks.types').Tasks} tasks
 */
export function filterTasks(filters, tasks) {
    return tasks.filter(t => {
        return filters.every(([key, value] = []) => {
            if (Array.isArray(value)) {
                return value.includes(t[key]);
            }
            if (typeof value === 'string') {
                return (t[key] || '')
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }
            if (typeof value === 'object') {
                return filterByObject(value, t[key]);
            }

            return true;
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

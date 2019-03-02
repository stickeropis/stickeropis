import { STORE_TASKS, SET_FILTERS, SET_CHECKED_TASKS } from 'store/constants/tasks';

/* eslint import/prefer-default-export: 0 */
export function storeTasks(tasks) {
    return { type: STORE_TASKS, tasks };
}

export function setFilters(filters) {
    return { type: SET_FILTERS, filters };
}

export function setCheckedTasks(checkedTaskIds) {
    return { type: SET_CHECKED_TASKS, checkedTaskIds };
}

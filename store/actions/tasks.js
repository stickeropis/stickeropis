import { STORE_TASKS } from 'store/constants/tasks';

/* eslint import/prefer-default-export: 0 */
export function storeTasks(tasks) {
    return { type: STORE_TASKS, tasks };
}

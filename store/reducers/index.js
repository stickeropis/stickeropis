import { combineReducers } from 'redux';

import tasks from 'store/reducers/tasks';

const rootReducer = combineReducers({
    tasks
});

export default rootReducer;

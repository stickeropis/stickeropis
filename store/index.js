import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

import rootReducer from 'store/reducers';

function configureStore(state = {}) {
    return createStore(rootReducer, state, devToolsEnhancer());
}

export default configureStore;

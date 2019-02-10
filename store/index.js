import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'store/reducers';
import rootSaga from 'store/saga';

export default function configureStore(state = {}) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, state, composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    ));

    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga);
    };

    store.runSagaTask();

    return store;
}

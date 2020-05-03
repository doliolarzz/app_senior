import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import appReducer from './reducers';
import { createLogger } from 'redux-logger';
import { compose, applyMiddleware, createStore } from 'redux';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const store = createStore(
    appReducer,
    compose(
        applyMiddleware(sagaMiddleware, loggerMiddleware),
    )
);

sagaMiddleware.run(rootSaga);

export default store;

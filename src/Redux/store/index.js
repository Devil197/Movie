import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import logger, { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

// const log = createLogger({ diff: true, collapsed: true });

const middlewares = [thunkMiddleware];
// const middlewares = [thunk, logger, log];

// create store

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));

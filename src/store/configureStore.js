import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';

export default function configureStore(initialState = {}) {
  const logger = createLogger();
  const createStoreWithMiddleware = applyMiddleware(
    thunk,
    apiMiddleware,
    logger,
  );

  const finalCreateStore = compose(
    createStoreWithMiddleware,
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer.default || nextRootReducer);
    });
  }

  return store;
}

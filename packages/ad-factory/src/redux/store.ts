import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  Dispatch,
  Action
} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import mySaga from './sagas'
import notificationMiddleWare from './notifications'
const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(notificationMiddleWare as any, sagaMiddleware)
  )
)

// then run the saga
sagaMiddleware.run(mySaga)

export default store

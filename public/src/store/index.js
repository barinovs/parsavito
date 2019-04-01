import { createStore } from 'redux'
import { rootReducer } from '../reducers/index'

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;
//
// var preloadedState = []
//
// const configureStore = preloadState => (
//   createStore(
//     rootReducer,
//     preloadedState,
//     composeEnhancers(),
//   )
// );

export const store = createStore(rootReducer)

// export const store = configureStore({});

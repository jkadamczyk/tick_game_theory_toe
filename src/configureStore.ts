import { createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools()
  );
}

export default configureStore;

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer";

import { persistStore } from "redux-persist";

const initialState = {};
const middlewares = [thunk];
let devtools = (x) => x;

{
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
    RootReducer,
    initialState,
    compose(
        applyMiddleware(...middlewares),
        devtools
    )
);

const storAndPersistor = { store, persistor: persistStore(store) };

export default storAndPersistor
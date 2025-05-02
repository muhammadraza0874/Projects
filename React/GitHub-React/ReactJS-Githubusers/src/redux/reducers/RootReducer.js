import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import UserReducer from "./UserReducer";

import storage from "redux-persist/lib/storage";
export default persistReducer(
    {
        key: "rrsb", // key is required
        storage, // storage is now required
        whitelist: ["user"],
    },
    combineReducers({
        user: UserReducer

    })
);


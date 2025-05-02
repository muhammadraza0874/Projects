import {
   SHOW_MESSAGE,
} from "../actions/types";
import {toast} from "react-toastify";

const initialState = {};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE: {
      if (action.payload.title == "Failed") {
        toast.error(action.payload.message);
      } else {
        toast.success(action.payload.message);
      }
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

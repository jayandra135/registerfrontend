import { combineReducers } from "redux";
import registerReducer from "./register/Reducer";

const rootReducer = combineReducers({
  register: registerReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import CustomerReducer from "./CustomerReducer";

const Index = combineReducers({
    CommonReducer,
    CustomerReducer
});

export default Index;

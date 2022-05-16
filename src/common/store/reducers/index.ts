import {combineReducers} from "@reduxjs/toolkit";
import library from "./library";

const rootReducer = combineReducers({
    library,
});

export default rootReducer;

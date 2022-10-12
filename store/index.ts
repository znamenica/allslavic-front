import {Action} from 'redux';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {ThunkAction} from "redux-thunk";
import {configureStore, createSlice} from "@reduxjs/toolkit";
import library from "./reducers/library";
import library_old from "./reducers/library_old";
import me from "./reducers/me";
import news from "./reducers/news";
import {diff} from "jsondiffpatch";

const extra = createSlice({
    name: "root",
    initialState: {},
    reducers: {},
    extraReducers: {
        [HYDRATE]: (state: any, action) => {
            const stateDiff = diff(state, action.payload) as any;
            const wasBumpedOnClient = stateDiff?.page?.[0]?.endsWith('X');
            return {
                ...state,
                ...action.payload,
                library: wasBumpedOnClient ? state.library : action.payload.page,
            };
        }
    }
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

const makeStore = () => configureStore({
    reducer: {
        library,
        library_old,
        me,
        news,
        [extra.name]: extra.reducer,
    },
    devTools: true,
});

export const wrapper = createWrapper<AppStore>(makeStore);
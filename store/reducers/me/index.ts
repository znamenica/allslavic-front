import {} from "../../../pages/api/library";
import {createSlice, Dispatch, SliceCaseReducers} from "@reduxjs/toolkit";
import Api from "../../../pages/api";
import {MyResponse, OuterUser} from "../../../pages/api/users";

interface MyState {
    loggedIn: boolean;
    loading: boolean;
    item: OuterUser;
}

export const initialState: MyState = {
    loggedIn: false,
    loading: false,
    item: null,
};

export const librarySlice = createSlice<MyState, SliceCaseReducers<MyState>>({
    name: 'me',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
    }
});

export const getMe = (token: string) => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    Api.me.getMe(token).then((res: MyResponse) => {
        dispatch(setItem(res));
        dispatch(setLoading(false));
    });
};

export const { setLoggedIn, setItem, setLoading } = librarySlice.actions;

export default librarySlice.reducer;

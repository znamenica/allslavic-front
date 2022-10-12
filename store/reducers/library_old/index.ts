import {createSlice, Dispatch} from '@reduxjs/toolkit';
import Api from "../../../pages/api/index";
import {LibraryItem, LibraryType} from "../../../pages/api/library";
import {SliceCaseReducers} from "@reduxjs/toolkit";

interface LibraryState {
    loading: boolean;
    items: LibraryItem[];
    page: number;
    count: number;
    item?: LibraryItem|null;
}

export const initialState: LibraryState = {
    loading: false,
    count: 5,
    page: 1,
    items: [],
};

export const librarySlice = createSlice<LibraryState, SliceCaseReducers<LibraryState>>({
    name: 'library_old',
    initialState,
    reducers: {
        setLoading: (state, action) => {
          state.loading = action.payload;
        },
        setItems: (state, action) => {
            state.page = 1;
            state.items = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        setPage: (state, action) => {
          state.page = action.payload;
        },
    }
});

export const getLibraryItems = (params: { type: LibraryType[] }) => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    Api.library.getAll(params).then((res: LibraryItem[]) => {
        dispatch(setItems(res));
        dispatch(setLoading(false));
    });
};

export const getLibraryItem = (id: number) => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    Api.library.getById(id).then((res: LibraryItem|null) => {
        dispatch(setItem(res));
        dispatch(setLoading(false));
    });
};

export const totalPageSelector = (state: any) => Math.ceil(state.library_old.items.length / state.library_old.count);

export const currentPageItemsSelector = (state: any) =>
    [...state.library_old.items].sort((a,b) => b.id < a.id ? -1 : 1)
        .slice((state.library_old.page - 1) * state.library_old.count, state.library_old.page * state.library_old.count);

export const { setItems, setItem, setPage, setLoading } = librarySlice.actions

export default librarySlice.reducer
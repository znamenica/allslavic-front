import {createSlice, Dispatch} from '@reduxjs/toolkit';
import Api from "../../../pages/api/index";
import {LibraryItem, LibraryType} from "../../../pages/api/library";
import {SliceCaseReducers} from "@reduxjs/toolkit";
import {TextItem, TextItemResponse, TextItemsResponse} from "../../../pages/api/texts";

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
    name: 'library',
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

export const getLibraryItems = (itemTypes?: LibraryType[]) => (dispatch: Dispatch, getState) => {
    dispatch(setLoading(true));
    const {library} = getState();
    Api.texts.getAll({
        page: library.page,
        count: library.count,
    }).then((res: TextItemsResponse) => {
        dispatch(setItems(res.items));
        dispatch(setLoading(false));
    });
};

export const getLibraryItem = (id: number) => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    Api.texts.getById(id).then((res: TextItemResponse) => {
        dispatch(setItem(res.item));
        dispatch(setLoading(false));
    });
};

export const totalPageSelector = (state: any) => Math.ceil(state.library.items.length / state.library.count);

export const currentPageItemsSelector = (state: any) =>
    [...state.library.items].sort((a,b) => b.id < a.id ? -1 : 1)
        .slice((state.library.page - 1) * state.library.count, state.library.page * state.library.count);

export const { setItems, setItem, setPage, setLoading } = librarySlice.actions

export default librarySlice.reducer
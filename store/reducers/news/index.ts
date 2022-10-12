import {createSlice, Dispatch} from '@reduxjs/toolkit';
import Api from "../../../pages/api/index";
import {SliceCaseReducers} from "@reduxjs/toolkit";
import {NewsItem, NewsItemResponse, NewsItemsResponse} from "../../../pages/api/news";
import {AppState} from "../../index";

interface NewsState {
    loading: boolean;
    items: NewsItem[];
    page: number;
    count: number;
    item?: NewsItem|null;
    loadAll: boolean;
}

export const initialState: NewsState = {
    loading: false,
    count: 5,
    page: 1,
    items: [],
    loadAll: false,
};

export const librarySlice = createSlice<NewsState, SliceCaseReducers<NewsState>>({
    name: 'news',
    initialState,
    reducers: {
        setLoading: (state, action) => {
          state.loading = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        setPage: (state, action) => {
          state.page = action.payload;
        },
        setLoadAll: (state, action) => {
            state.loadAll = action.payload;
        },
    }
});

export const getNewsItems = () => (dispatch: Dispatch, getState) => {
    dispatch(setLoading(true));
    const {news} = getState();
    Api.news.getAll({
        page: news.page,
        count: news.count,
    }).then((res: NewsItemsResponse) => {
        if (news.page > 1) {
            dispatch(setItems([...news.items, ...res.items]));
        } else {
            dispatch(setItems(res.items));
        }
        if (res.items.length < news.count) {
            dispatch(setLoadAll(true));
        }
        dispatch(setLoading(false));
    });
};

export const getNewsItem = (id: number) => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    Api.news.getById(id).then((res: NewsItemResponse|null) => {
        dispatch(setItem(res.item));
        dispatch(setLoading(false));
    });
};

export const totalPageSelector = (state: any) => Math.ceil(state.library.items.length / state.library.count);

export const currentPageItemsSelector = (state: any) =>
    [...state.library.items].sort((a,b) => b.id < a.id ? -1 : 1)
        .slice((state.library.page - 1) * state.library.count, state.library.page * state.library.count);

export const { setItems, setLoadAll, setItem, setPage, setLoading } = librarySlice.actions

export default librarySlice.reducer
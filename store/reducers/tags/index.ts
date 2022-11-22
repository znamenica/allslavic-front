import {createSlice, Dispatch} from '@reduxjs/toolkit';
import Api from "../../../pages/api/index";
import {SliceCaseReducers} from "@reduxjs/toolkit";
import {TagItem, TagsItemsResponse} from "../../../pages/api/tags";

interface TagsState {
    loading: boolean;
    items: TagItem[];
    page: number;
    count: number;
    loadAll: boolean;
}

export const initialState: TagsState = {
    loading: false,
    count: 25,
    page: 1,
    items: [],
    loadAll: false,
};

export const tagsSlice = createSlice<TagsState, SliceCaseReducers<TagsState>>({
    name: 'tags',
    initialState,
    reducers: {
        setLoading: (state, action) => {
          state.loading = action.payload;
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setPage: (state, action) => {
          state.page = action.payload;
        },
        setLoadAll: (state, action) => {
            state.loadAll = action.payload;
        },
    }
});

export const getTagsItems = () => (dispatch: Dispatch, getState) => {
    dispatch(setLoading(true));
    const {tags} = getState();
    Api.tags.getAll({
        page: tags.page,
        count: tags.count,
    }).then((res: TagsItemsResponse) => {
        if (tags.page > 1) {
            dispatch(setItems([...tags.items, ...res.items]));
        } else {
            dispatch(setItems(res.items));
        }
        if (res.items.length < tags.count) {
            dispatch(setLoadAll(true));
        }
        dispatch(setLoading(false));
    });
};

export const totalPageSelector = (state: any) => Math.ceil(state.tags.items.length / state.tags.count);

export const currentPageItemsSelector = (state: any) =>
    [...state.tags.items].sort((a,b) => b.id < a.id ? -1 : 1)
        .slice((state.tags.page - 1) * state.tags.count, state.tags.page * state.tags.count);

export const { setItems, setLoadAll, setPage, setLoading } = tagsSlice.actions

export default tagsSlice.reducer
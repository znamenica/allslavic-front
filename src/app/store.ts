import { configureStore } from '@reduxjs/toolkit';
import library from "./store/library";

const store = configureStore({
    reducer: {
        library,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

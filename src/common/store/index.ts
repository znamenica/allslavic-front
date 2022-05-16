import {configureStore} from '@reduxjs/toolkit';
import rootReducer from "./reducers";

export default function configureAppStore(preloadedState: any) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    })

    if (
        // process.env.NODE_ENV !== 'production' &&
        module.hot
    ) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store
}

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../services/redux-token-slice.service";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware({
        //   thunk: {
            // extraArgument: myCustomApiService
        //   }
        // })
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
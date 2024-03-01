import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../services/redux-token-slice.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { siaApi } from "../services/api-rtkquery-service";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, tokenReducer)

export const store = configureStore({
    reducer: {
        persisted: persistedReducer,   
        [siaApi.reducerPath]: siaApi.reducer, 
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
                                        .concat(siaApi.middleware)
});

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
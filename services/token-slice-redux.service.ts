import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStorage } from "./app-storage.service";
import { IToken } from "../features/entities/token";


function getInitialState(): IToken {
    let initialState = null;
    AppStorage.getToken().then((hasil) => {
        if(hasil !== null) {
            initialState = JSON.parse(hasil);
        }
        else {
            initialState = {
                userId: null,
                userName: null,
                userEmail: null,    
                hakAkses: null,
                accessToken: null,
                refreshToken: null,
                expireIn: null,
                sessionId: null,
            };
        }
    }).catch((error) => {
        initialState = {
            userId: null,
            userName: null,
            userEmail: null,    
            hakAkses: null,
            accessToken: null,
            refreshToken: null,
            expireIn: null,
            sessionId: null,
        };
    });

    return initialState!;
}

const initialState = getInitialState();

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<IToken>) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.expireIn = action.payload.expireIn;
            state.hakAkses = action.payload.hakAkses;
            state.sessionId = action.payload.sessionId;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setUserNama: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        resetToken: (state, action: PayloadAction<void>) => {
            state.userId = null;
            state.userName = null;
            state.userEmail = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.expireIn = null;
            state.hakAkses = null;
            state.sessionId = null;
        },
    },
});

export const { setToken, setUserId, setUserNama, setUserEmail, setAccessToken, setRefreshToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppStorage } from "./app-storage.service";
import { IToken } from "../features/entities/token";
import * as _ from "lodash";
import { ICredential } from "../features/entities/credential";
import { TokenAPI } from "./api-service";


function getInitialTokenState(): IToken {
    let initialTokenState = null;
    AppStorage.getToken().then((hasil) => {
        if(hasil !== null) {
            initialTokenState = JSON.parse(hasil);
        }
        else {
            initialTokenState = {
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
        initialTokenState = {
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

    return initialTokenState!;
}

const initialTokenState = getInitialTokenState();

const fetchToken = createAsyncThunk(
    'token/fetchToken',
    async (credential: ICredential, thunkApi: any) => {
        // thunkApi.dispatch()
        let data: IToken = {
            userId: null,
            userName: null,
            userEmail: null,    
            hakAkses: null,
            accessToken: null,
            refreshToken: null,
            expireIn: null,
            sessionId: null,
        };;
        const response = await TokenAPI.getToken(credential);
        return data;
    }
);

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        loading: 'idle',
        token: initialTokenState
    },
    reducers: {
        // tokenLoading: (state, action: PayloadAction<null>) => {
        //     if (state.loading === 'idle') {
        //         state.loading = 'pending'
        //     }
        // },
        // tokenReceived: (state, action: PayloadAction<IToken>) => {
        //     if (state.loading === 'pending') {
        //       state.loading = 'idle'
        //       state.token = _.cloneDeep(action.payload);
        //     }
        // },
        setToken: (state, action: PayloadAction<IToken>) => {
            state.token = _.cloneDeep(action.payload);
        },
        resetToken: (state, action: PayloadAction<IToken>) => {
            state.token = _.cloneDeep(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            // Add user to the state array
            state.token = _.cloneDeep(action.payload);
        })
    }
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
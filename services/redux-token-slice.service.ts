import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { IToken } from "../features/entities/token";
import { ICredential } from "../features/entities/credential";
import { TokenAPI } from "./api-rtkquery-service";


export const fetchToken = createAsyncThunk(
    'token/fetchToken',
    async (credential: ICredential, thunkApi: any) => {    
        const response = await TokenAPI.getToken(credential); 
        let data: IToken = {
            id: null,
            nama: null,
            token: null,
            refreshToken: null
        };

        if(response.status == 200) {
            data = await response.json().then((dataJson) => {    
                return dataJson;
            });
        }

        return data;
    }
);

const initialState: IToken =  {
    id: null,
    nama: null,
    token: null,
    refreshToken: null
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<IToken>) => {
            state.id = action.payload.id;
            state.nama = action.payload.nama;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        },
        resetToken: (state, action: PayloadAction<null>) => {
            state.id = null;
            state.nama = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.nama = action.payload.nama;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        });
    }
});

export const { setToken, resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
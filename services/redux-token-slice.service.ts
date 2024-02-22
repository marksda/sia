import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppStorageToken } from "./app-storage.service";
import { IToken } from "../features/entities/token";
import * as _ from "lodash";
import { ICredential } from "../features/entities/credential";
import { TokenAPI } from "./api-service";


export const fetchToken = createAsyncThunk(
    'token/fetchToken',
    async (credential: ICredential, thunkApi: any) => {    
        const response = await TokenAPI.getToken(credential); 
        let data: IToken|null = null;
        if(response.status != 500) {
            data = await response.json().then((dataJson) => {
                AppStorageToken.setToken(dataJson);
                return dataJson;
            });
        }

        return data;
    }
);

function getInitialTokenState(): IToken|null {
    const response = AppStorageToken.getToken();
    let data: IToken|null = null;

    if(response !== undefined) {
        response.then((dataStr) => { return JSON.parse(dataStr!) as IToken });
    }

    return data;
}

const initialTokenState = getInitialTokenState();

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        authorized: initialTokenState
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
        // setToken: (state, action: PayloadAction<IToken>) => {
        //     state.token = _.cloneDeep(action.payload);
        // },
        // resetToken: (state, action: PayloadAction<IToken>) => {
        //     state.token = null;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.authorized = action.payload != null ? _.cloneDeep(action.payload):null;
        });
    }
});

// export const { resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
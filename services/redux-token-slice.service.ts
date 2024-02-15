import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { AppStorageToken } from "./app-storage.service";
import { IToken } from "../features/entities/token";
import * as _ from "lodash";
import { ICredential } from "../features/entities/credential";
import { TokenAPI } from "./api-service";


export const fetchToken = createAsyncThunk(
    'token/fetchToken',
    async (credential: ICredential, thunkApi: any): Promise<IToken|null> => {
        let data = null;
        const response = await TokenAPI.getToken(credential);        
        response.json()
                .then((dataJson)=> {
                    if(dataJson != null) {
                        data = dataJson;
                        AppStorageToken.setToken(data);
                    }
                    else {
                        AppStorageToken.deleteToken();
                    }
                })
                .catch((error) => {
                    AppStorageToken.deleteToken();
                    console.log(error);
                });

        return data;
    }
);

function getInitialTokenState(): IToken|null {
    let initialTokenState = null;
    AppStorageToken.getToken().then((hasil) => {
        if(hasil !== null) {
            initialTokenState = JSON.parse(hasil);
        }
    }).catch((error) => {
        console.log(error);
    });

    return initialTokenState!;
}

// const initialTokenState = getInitialTokenState();

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: getInitialTokenState()
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
        resetToken: (state, action: PayloadAction<IToken>) => {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.token = action.payload != null ? _.cloneDeep(action.payload):null;
        });
    }
});

export const { resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { IToken } from "../features/entities/token";
import * as _ from "lodash";
import { ICredential } from "../features/entities/credential";
import { TokenAPI } from "./api-service";


export const fetchToken = createAsyncThunk(
    'token/fetchToken',
    async (credential: ICredential, thunkApi: any) => {    
        const response = await TokenAPI.getToken(credential); 
        let data: IToken = {
            id: null,
            nama: null,
            token: null
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
    token: null
};

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
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
            state = _.cloneDeep(action.payload);

        });
    }
});

// export const { resetToken } = tokenSlice.actions;

export default tokenSlice.reducer;
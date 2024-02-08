import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStorage } from "./app-storage.service";
import { IToken } from "../features/entities/token";
import * as _ from "lodash";
import { ICredential } from "../features/entities/credential";


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
            state = _.cloneDeep(action.payload);
        },
        resetToken: (state, action: PayloadAction<IToken>) => {
            state = _.cloneDeep(action.payload);
        },
    },
});

export const { setToken, resetToken } = tokenSlice.actions;

export const fetchToken = (credential: ICredential) => {
    return async function fetchTokenThunk(dispatch: any, getState: any) {
        const response = await fetch(
            `https://dlhk.ddns.net/siaAPI/token?credential=${JSON.stringify(credential)}`, 
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );
        //simpan token ke storage

        //update token state
        // dispatch(setToken(response));
    };
}

export default tokenSlice.reducer;
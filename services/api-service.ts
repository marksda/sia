import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICredential } from "../features/entities/credential";
import { Mutex } from "async-mutex";
import { RootState } from "../app/redux-store";


const urlApiSia:string = 'https://dlhk.ddns.net/api';

export class TokenAPI {
    static getToken = async (credential: ICredential) => {
        // let data = null;
        return fetch(
            `${urlApiSia}/tokens/new`, 
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credential)
            }
        )
        // .then((response) => {
        //     response.json()
        //             .then((dataJson) => {
        //                 return dataJson;
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        ;        
    }
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({ 
    baseUrl: urlApiSia,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).persisted.token;
        if(accessToken != null){
            headers.set("authorization", `Bearer ${accessToken}`);
        }            
        return headers;
    },

});

export const baseQueryWithReauth: BaseQueryFn<string|FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = (api.getState() as RootState).persisted.refreshToken;
            } catch (error) {
                release();
            } finally {
                release();
            }
        }
        else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
}

export const siaApi = createApi({
    reducerPath: 'siaApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => {
        return {

        }
    }
});
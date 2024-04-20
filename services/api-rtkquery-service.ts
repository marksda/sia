import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICredential } from "../features/entities/credential";
import { Mutex } from "async-mutex";
import { RootState } from "../app/redux-store";
import { IToken } from "../features/entities/token";
import { resetToken, setToken } from "./redux-token-slice.service";
import { IBarang } from "../features/entities/barang";
import { IQueryParamFilters } from "../features/entities/query-param-filters";
import { ITransaki } from "../features/entities/transaksi";

const urlApiSia: string = 'https://dlhk.ddns.net/api';

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
                const userId = (api.getState() as RootState).persisted.id;
                const refreshResult = await baseQuery(
                    {
                        url: `/token/${userId}`,
                        method: 'PUT',
                        body: refreshToken
                    },
                    api,
                    extraOptions,
                );

                if(refreshResult.data) {
                    api.dispatch(setToken(refreshResult.data as IToken));
                    result = await baseQuery(args, api, extraOptions);
                } 
                else {                    
                    api.dispatch(resetToken(null));
                }

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
    tagTypes: ['Barang','Kosong', 'Transaksi'],
    endpoints: builder => {
        return {
            saveBarang: builder.mutation<IBarang, Partial<IBarang>>({
                query: (body) => ({
                    url: '/barang',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: (result) => result ? ['Barang']:['Kosong']
            }),
            getDaftarBarang: builder.query<IBarang[], IQueryParamFilters>({
                query: (queryParams) => ({
                    url: `/barang/list`,
                    method: 'GET',
                }),
                providesTags: ['Barang']
            }),
            saveTransaksi: builder.mutation<ITransaki, Partial<ITransaki>>({
                query: (body) => ({
                    url: '/transaksi',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: (result) => result ? ['Transaksi']:['Kosong']
            }),
        }
    }
});

export const {useSaveBarangMutation, useGetDaftarBarangQuery, useSaveTransaksiMutation} = siaApi;
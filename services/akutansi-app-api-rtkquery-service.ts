import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICredential } from "../features/entities/credential";
import { Mutex } from "async-mutex";
import { RootState } from "../app/akutansi-app-redux-store";
import { IToken } from "../features/entities/token";
import { resetToken, setToken } from "./redux-token-slice.service";
import { IBarang } from "../features/entities/barang";
import { IQueryParamFilters } from "../features/entities/query-param-filters";
import { ITransaksi } from "../features/entities/transaksi";
import { IKelompokAkun } from "../features/entities/akutansi-app/kelompok-akun";
import { IAkun } from "../features/entities/akutansi-app/akun";

const urlApiSia: string = 'https://dlhk.ddns.net/api';

export class TokenAPI {
    static getToken = async (credential: ICredential) => {
        // let data = null;
        return fetch(
            `${urlApiSia}/token/new`, 
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
                const refreshToken = (api.getState() as RootState).persisted.token.refresh_token;
                const userId = (api.getState() as RootState).persisted.token.id;
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
    tagTypes: ['Akun','Barang','KelompokAkun','Kosong', 'Transaksi'],
    endpoints: builder => {
        return {
            //Kelompok akun
            saveKelompokAkun: builder.mutation<IKelompokAkun, Partial<IKelompokAkun>>({
                query: (body) => ({
                    url: '/kelompok_akun',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: (result) => result ? ['KelompokAkun']:['Kosong']
            }),
            getDaftarKelompokAkun: builder.query<IKelompokAkun[], IQueryParamFilters>({
                query: (_queryParams) => ({
                    url: `/kelompok_akun/list`,
                    method: 'GET',
                }),
                providesTags: ['KelompokAkun']
            }),
            updateKelompokAkun: builder.mutation<IKelompokAkun, {idLama: string; idPerusahaanLama: String; kelompokAkunBaru: Partial<IKelompokAkun>;}>({
                query: ({idLama, idPerusahaanLama, kelompokAkunBaru}) => ({
                    url: `/kelompok_akun/${idLama}}/${idPerusahaanLama}`,
                    method: 'PUT',
                    body: kelompokAkunBaru,
                }),
                invalidatesTags: (result) => result? ['KelompokAkun']:['Kosong']
            }),
            deleteKelompokAkun: builder.mutation<Partial<IKelompokAkun>, {idKelompokAkun: string; idPerusahaan: String;}>({
                query: ({idKelompokAkun, idPerusahaan}) => ({                  
                    url: `/kelompok_akun/${idKelompokAkun}/${idPerusahaan}`,
                    method: 'DELETE',            
                }),
                invalidatesTags: (result) => result? ['KelompokAkun']:['Kosong']
            }),
            //akun
            saveAkun: builder.mutation<IAkun, Partial<IAkun>>({
                query: (body) => ({
                    url: '/akun',
                    method: 'POST',
                    body,
                }),
                invalidatesTags: (result) => result ? ['Akun']:['Kosong']
            }),
            getDaftarAkun: builder.query<IAkun[], IQueryParamFilters>({
                query: (queryParams) => ({
                    url: `/akun/list?filter=${JSON.stringify(queryParams)}`,
                    method: 'GET',
                }),
                providesTags: ['Akun']
            }),
            updateAkun: builder.mutation<IAkun, {idLama: string; idPerusahaanLama: String; akunBaru: Partial<IAkun>;}>({
                query: ({idLama, idPerusahaanLama, akunBaru}) => ({
                    url: `/akun/${idLama}}/${idPerusahaanLama}`,
                    method: 'PUT',
                    body: akunBaru,
                }),
                invalidatesTags: (result) => result? ['Akun']:['Kosong']
            }),
            deleteAkun: builder.mutation<Partial<IAkun>, {idAkun: string; idPerusahaan: String;}>({
                query: ({idAkun, idPerusahaan}) => ({                  
                    url: `/akun/${idAkun}/${idPerusahaan}`,
                    method: 'DELETE',            
                }),
                invalidatesTags: (result) => result? ['Akun']:['Kosong']
            }),
            //barang
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
            //transaksi
            saveTransaksi: builder.mutation<ITransaksi, Partial<ITransaksi>>({
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

export const {
    useSaveKelompokAkunMutation, useGetDaftarKelompokAkunQuery, useUpdateKelompokAkunMutation, useDeleteKelompokAkunMutation,
    useSaveAkunMutation, useGetDaftarAkunQuery, useUpdateAkunMutation, useDeleteAkunMutation,
    useSaveBarangMutation, useGetDaftarBarangQuery, useSaveTransaksiMutation
} = siaApi;
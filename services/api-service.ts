import { ICredential } from "../features/entities/credential";

export const TokenAPI ={
    getToken: (credential: ICredential) => {
        return async function fetchTokenThunk(dispatch: any, getState: any) {
            const response = await fetch(
                'https://dlhk.ddns.net/rest/api/token', 
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credential)
                }
            );

            return response;
        };
    }
}
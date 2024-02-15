import { ICredential } from "../features/entities/credential";
import { IToken } from "../features/entities/token";

export const TokenAPI ={
    getToken: (credential: ICredential): Promise<Response> => {
        // let data = null;
        return fetch(
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
            // .then((response) => {
            //     return response.json().then((data) => {
            //         return data as IToken;
            //     }).catch((error) => {
            //         console.log(error);
            //     });
            // })
            // .catch((error) => {
            //     console.log(error);
            // });

        // return data;
    }
}
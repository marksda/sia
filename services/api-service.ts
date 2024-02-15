import { ICredential } from "../features/entities/credential";

export class TokenAPI {
    static getToken = async (credential: ICredential) => {
        // let data = null;
        return await fetch(
            'https://dlhk.ddns.net/rest/api/token', 
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
        //                 data = dataJson;
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        ;

        // return data;
    }
}
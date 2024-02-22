import EncryptedStorage from "react-native-encrypted-storage";
import { IToken } from "../features/entities/token";

const TOKEN_KEY: string = 'token';

export class AppStorageToken {

  static getToken = async () => {

    try {
      // const session = await EncryptedStorage.getItem(TOKEN_KEY);
      // return session;
      await EncryptedStorage.getItem(TOKEN_KEY);      
    } catch (error) {
      // console.log(error);
    }
    
  };

  static setToken = (token: IToken): boolean => {

    try {
      EncryptedStorage.setItem(TOKEN_KEY, JSON.stringify(token));
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
     
  };

  static deleteToken = () => {
    EncryptedStorage.removeItem(TOKEN_KEY);
  }

}
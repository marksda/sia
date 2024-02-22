import EncryptedStorage from "react-native-encrypted-storage";
import { IToken } from "../features/entities/token";

const TOKEN_KEY: string = 'token';

export class AppStorageToken {

  static getToken = async () => {

    try {
      const session = await EncryptedStorage.getItem(TOKEN_KEY);
      return session;
      
    } catch (error) {
      console.log(error);
    }
    
  };

  static setToken = async (token: IToken): Promise<void> => {

    try {
      await EncryptedStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
     
  };

  static deleteToken = () => {
    EncryptedStorage.removeItem(TOKEN_KEY);
  }

}
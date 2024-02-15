import EncryptedStorage from "react-native-encrypted-storage";
import { IToken } from "../features/entities/token";

const TOKEN_KEY: string = 'token';

export class AppStorageToken {

  static getToken = () => {
    return EncryptedStorage.getItem(TOKEN_KEY);
  };

  static setToken = (token: IToken): Promise<void> => {
    return EncryptedStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  };

  static deleteToken = () => {
    EncryptedStorage.removeItem(TOKEN_KEY);
  }

}
import { IToken } from "../features/entities/token";
import EncryptedStorage from "react-native-encrypted-storage/lib/typescript/EncryptedStorage";

const TOKEN_KEY: string = 'token';

export class AppStorage {

  static getToken = () => {
    return EncryptedStorage.getItem(TOKEN_KEY);
  };

  static setToken = (token: IToken): Promise<void> => {
    return EncryptedStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  };

}

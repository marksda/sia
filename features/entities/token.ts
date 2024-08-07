import { IOfficeStoreOutlet } from "./akutansi-app/office-store-outlet";

export interface IToken {
    id: string|null;
    nama: string|null;
    office: Partial<IOfficeStoreOutlet>|null;
    token: string|null;
    refresh_token: string|null;
};
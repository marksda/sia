import { IItemTransaki } from "./item-transaksi";

export interface ITransaki {
    id: string|null;
    tanggal: Date;
    daftarItemTransaksi: IItemTransaki[];
}
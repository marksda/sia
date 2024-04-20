import { IItemTransaki } from "./item-transaksi";

export interface ITransaksi {
    id: string|null;
    tanggal: Date;
    keterangan: string|null;
    daftarItemTransaksi: IItemTransaki[];
    total: number|null;
    potongan: number|null;
    ppn: number|null;
}
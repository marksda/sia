import { IBarang } from "./barang";

export interface IItemTransaki {
    item: IBarang|null;
    harga: number;
    jumlah: number;
    total: number;
}
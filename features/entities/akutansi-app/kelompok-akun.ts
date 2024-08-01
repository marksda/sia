import { IJenisAkun } from "./jenis-akun";

export interface IKelompokAkun {
    id: string|null;
    nama: string|null;
    jenis_akun: Pick<IJenisAkun, 'id'> & Partial<IJenisAkun> | null;
};
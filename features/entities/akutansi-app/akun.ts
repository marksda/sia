import { IKelompokAkun } from "./kelompok-akun";
import { IPerusahaan } from "./perusahaan";

export interface IAkun {
    id: string|null;
    perusahaan: Pick<IPerusahaan, 'id'> & Partial<IPerusahaan> | null;
    header: boolean|null;
    level: number|null;
    nama: string|null;
    kode: string|null;   
    kelompok_akun: Pick<IKelompokAkun, 'id'> & Partial<IKelompokAkun> | null;
};
import { IDesa } from "../desa";
import { IKabupaten } from "../kabupaten";
import { IKecamatan } from "../kecamatan";
import { IPropinsi } from "../propinsi";


export interface IPerusahaan {
    id: string|null;
    nama: string|null;
    npwp: string|null;
    propinsi: Partial<IPropinsi> | null;
    kabupaten: Partial<IKabupaten> | null;
    kecamatan: Partial<IKecamatan> | null;
    desa: Partial<IDesa> | null;
    detail_alamat: string|null;
    telepone: string|null;
    email: string|null;
    tanggal_registrasi: string|null;
};
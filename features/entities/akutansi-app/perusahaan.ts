import { IDesa } from "../desa";
import { IKabupaten } from "../kabupaten";
import { IKecamatan } from "../kecamatan";
import { IPropinsi } from "../propinsi";

export interface IPerusahaan {
    id: string|null;
    nama: string|null;
    npwp: string|null;
    propinsi: Pick<IPropinsi, 'id'> & Partial<IPropinsi> | null;
    kabupaten: Pick<IKabupaten, 'id'> & Partial<IKabupaten> | null;
    kecamatan: Pick<IKecamatan, 'id'> & Partial<IKecamatan> | null;
    desa: Pick<IDesa, 'id'> & Partial<IDesa> | null;
    detail_alamat: string|null;
    telepone: string|null;
    email: string|null;
    tanggal_registrasi: string|null;
};
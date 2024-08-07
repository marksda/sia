import { IDesa } from "../desa";
import { IKabupaten } from "../kabupaten";
import { IKecamatan } from "../kecamatan";
import { IPropinsi } from "../propinsi";
import { IPerusahaan } from "./perusahaan";

export interface IOfficeStoreOutlet {
    id: string|null;
    nama: string|null;
    propinsi: Partial<IPropinsi>|null;
    kabupaten: Partial<IKabupaten>|null;
    kecamatan: Partial<IKecamatan>|null;
    desa: Partial<IDesa>|null;
    detail_alamat: string|null
    perusahaan: Partial<IPerusahaan>|null;
    telepone: string|null
};
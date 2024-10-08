import { object, z } from "zod";

export const CredentialSchema = object({
    userName: z.string(),
    password: z.string()
});

export const BarangSchema = object({
    id: z.string().nullable(),
    nama: z.string(),
    harga_satuan: z.number(),
});

export const ItemTransaksiSchema = object({
    item: BarangSchema.pick({id: true}),
    harga: z.number(),
    jumlah: z.number(),
    total: z.number(),
});

export const TransaksiSchema = object({
    id: z.string().nullable(),
    tanggal: z.string().nullable(),
    keterangan: z.string().nullable(),
    daftarItemTransaksi: z.array(ItemTransaksiSchema).nonempty(),
    total: z.number(),
    potongan: z.number().nullable(),
    ppn: z.number().nullable()
});

export const PrinterScannerSchema = object({
    connection_type: z.number(),
    name: z.string(),
    address: z.string().min(2, {message: 'Must be at least 2 characters'}),
    alias: z.string().min(2, {message: 'Must be at least 2 characters'}),
    is_connect: z.boolean(),
});
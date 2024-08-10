export enum JenisKoneksiPrinter {
    BLUETOOTH = 0,
    USB = 1,
    PRINT_SERVER = 2,
    WIFI_DIRECT = 3,
    QRCODE_SCAN = 4,
}
export interface IPrinterScanner {
    connection_type: JenisKoneksiPrinter;
    name: string;
    address: string;
    alias: string;
    is_connect: boolean;
}
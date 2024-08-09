export enum JenisKoneksiPrinter {
    BLUETOOTH = 0,
    USB = 1,
    PRINT_SERVER = 2,
    WIFI_DIRECT = 3,
}
export interface IPrinterScanner {
    type: JenisKoneksiPrinter;
    name: string;
    address: string;
}
export enum typeKoneksiPrinter {
    BLUETOOTH = 1,
    USB,
    PRINT_SERVER,
    WIFI_DIRECT,
}
export interface IPrinterScanner {
    type: typeKoneksiPrinter;
    name: string;
    address: string;
}
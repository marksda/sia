import { createSlice } from "@reduxjs/toolkit";
import { IPrinterScanner } from "../features/entities/printer-scanner";

const initialState: IPrinterScanner =  {
    printers: [],
};

export const PrinterScannerSlice = createSlice({
    name: 'printer_scanner',
    initialState,
    reducers: {
        
    }
});
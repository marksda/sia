import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPrinterScanner, JenisKoneksiPrinter } from "../features/entities/printer-scanner";
import * as _ from "lodash";

type ListPrinter = {
    printers: IPrinterScanner[];
};

const initialState: ListPrinter =  {
    printers: [],
};

export const PrinterScannerSlice = createSlice({
    name: 'printer',
    initialState,
    reducers: {
        setPrinterScanner: (state, action: PayloadAction<IPrinterScanner[]>) => {
            state.printers = _.cloneDeep(action.payload);
        },
        removePrinterScanner: (state, action: PayloadAction<IPrinterScanner>) => {
            state.printers = _.remove(state.printers, (item) => _.isEqual(item, action.payload));
        },
        addPrinterScanner: (state, action: PayloadAction<IPrinterScanner>) => {
            state.printers = _.concat(state.printers, action.payload)
        },
        resetPrinterScanner: (state, action: PayloadAction<null>) => {
            state.printers = [];
        },
    }
});

export const { setPrinterScanner, removePrinterScanner, addPrinterScanner, resetPrinterScanner } = PrinterScannerSlice.actions;

export default PrinterScannerSlice.reducer;
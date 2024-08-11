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
            let tmp = _.cloneDeep(state.printers);
            _.remove(tmp, (item) => {return item.address == action.payload.address});
            state.printers = tmp;
        },
        addPrinterScanner: (state, action: PayloadAction<IPrinterScanner>) => {
            let i = _.findIndex(state.printers, (o) => { return o.address == action.payload.address });
            if( i == -1){
                state.printers = _.concat(state.printers, action.payload);
            }            
        },
        updatePrinterScanner: (state, action: PayloadAction<{dtLama:IPrinterScanner; dtBaru:IPrinterScanner}>) => {            
            let tmp = _.cloneDeep(state.printers);
            let i = _.findIndex(tmp, (o) => { return o.address == action.payload.dtLama.address });

            if( i >= 0){
                tmp.splice(i, 1, action.payload.dtBaru);
                state.printers = tmp;
            }            
        },
        resetPrinterScanner: (state, action: PayloadAction<null>) => {
            state.printers = [];
        },
    }
});

export const { setPrinterScanner, removePrinterScanner, addPrinterScanner, updatePrinterScanner, resetPrinterScanner } = PrinterScannerSlice.actions;

export default PrinterScannerSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPrinterScanner } from "../features/entities/printer-scanner";
import * as _ from "lodash";
import { DeviceInfo } from "react-native-esc-pos-printer";

const initialState: IPrinterScanner =  {
    printers: [],
};

export const PrinterScannerSlice = createSlice({
    name: 'printer_scanner',
    initialState,
    reducers: {
        setPrinterScanner: (state, action: PayloadAction<IPrinterScanner>) => {
            state.printers = _.cloneDeep(action.payload.printers);
        },
        removePrinterScanner: (state, action: PayloadAction<DeviceInfo>) => {
            state.printers = _.remove(state.printers, (item) => item.deviceName == action.payload.deviceName)
        },
        addPrinterScanner: (state, action: PayloadAction<DeviceInfo>) => {
            state.printers = _.concat(state.printers, action.payload)
        },
        resetPrinterScanner: (state, action: PayloadAction<null>) => {
            state.printers = [];
        },
    }
});

export const { setPrinterScanner, removePrinterScanner, addPrinterScanner, resetPrinterScanner } = PrinterScannerSlice.actions;

export default PrinterScannerSlice.reducer;
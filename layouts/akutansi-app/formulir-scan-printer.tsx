import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { FC, useEffect, useState} from "react";
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from "react-native"; 
import { BluetoothDevice, BluetoothManager, ScannedBluetoothDevices } from "tp-react-native-bluetooth-printer";
import { IPrinterScanner, JenisKoneksiPrinter } from "../../features/entities/printer-scanner";



const DaftarJenisKoneksiPrinter = Object.keys(JenisKoneksiPrinter).filter((v) => isNaN(Number(v)));

const FormulirScanPrinterLayout: FC = () => {
    const {width} = useWindowDimensions();
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    
    return (
        <View style={[styles.container, {width: width-16}]}>
            <Select
                value={DaftarJenisKoneksiPrinter[selectedIndex.row]}
                selectedIndex={selectedIndex}
                onSelect={(index: IndexPath|IndexPath[]) => setSelectedIndex(index as IndexPath)}
                label='Jenis koneksi printer'
            >  
            {   
                DaftarJenisKoneksiPrinter.map(
                    (item, index) => <SelectItem key={index} title={item} />
                )
            }
            </Select>
            {
                (selectedIndex.row == JenisKoneksiPrinter.BLUETOOTH) && (<FormulirScanPrinterBtLayout />)
            }            
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: "column",
        // justifyContent: 'center',
        // columnGap: 24,
        rowGap: 8,
        padding: 10,
    },
    horizontal: {
        // flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
    },
    buttonText: {
        marginHorizontal: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 20,
    },
});

const FormulirScanPrinterBtLayout: FC = () => { 
    const [loading, setLoading] = useState<boolean>(true);    
    const [listPrinterBt, setListPrinterBt] = useState<IPrinterScanner[]>([]);
    console.log(listPrinterBt);

    useEffect(        
        () => {
            (BluetoothManager.isBluetoothEnabled() as PromiseLike<boolean>).then(
                (enabled) => {
                  if(enabled == true) {
                    (BluetoothManager.scanDevices() as PromiseLike<string>).then(
                        (scannedDevices) => {
                            let scannedDevicesObj: ScannedBluetoothDevices = JSON.parse(scannedDevices);
                            let deviceBTPrinter: IPrinterScanner[] = [];
                            let temp: BluetoothDevice;
                            let printerItem: IPrinterScanner;

                            if (scannedDevicesObj.paired && scannedDevicesObj.paired.length > 0) {
                                for (var i = 0; i < scannedDevicesObj.paired.length; i++) {
                                    try {
                                        temp = scannedDevicesObj.paired[i];
                                        printerItem = {
                                            connection_type: JenisKoneksiPrinter.BLUETOOTH,
                                            name: temp.name,
                                            address: temp.address,
                                            alias: temp.name,
                                            is_connect: true,
                                        }
                                        deviceBTPrinter.push(printerItem);
                                    } catch (e) {
                                        return [];
                                    }
                                }
                            }

                            if (scannedDevicesObj.found && scannedDevicesObj.found.length > 0) {
                                for (var i = 0; i < scannedDevicesObj.found.length; i++) {
                                    try {
                                        temp = scannedDevicesObj.found[i];
                                        printerItem = {
                                            connection_type: JenisKoneksiPrinter.BLUETOOTH,
                                            name: temp.name,
                                            address: temp.address,
                                            alias: temp.name,
                                            is_connect: false,
                                        }
                                        deviceBTPrinter.push(printerItem);
                                    } catch (e) {
                                        return [];
                                    }
                                }
                            }

                            setListPrinterBt(deviceBTPrinter);
                            setLoading(false);
                        },
                        (er) => {
                            setListPrinterBt([]);
                            setLoading(false);
                        }
                      );
                  }
                  else {
                    (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
                        (item) => {
                            let paired: IPrinterScanner[] = [];
                            if (item && item.length > 0) {
                                for (var i = 0; i < item.length; i++) {
                                    try {
                                        let temp: BluetoothDevice = JSON.parse(item[i]);
                                        let printerItem: IPrinterScanner = {
                                            connection_type: JenisKoneksiPrinter.BLUETOOTH,
                                            name: temp.name,
                                            address: temp.address,
                                            alias: temp.name,
                                            is_connect: true,
                                        }
                                        paired.push(printerItem);
                                    } catch (e) {
                                        return [];
                                    }
                                }
                            }
                            setListPrinterBt(paired);
                            setLoading(false);
                        },
                        (err) => {
                            setListPrinterBt([]);
                            setLoading(false);
                        }
                    );
                  }
                },
                (err) => {
                  //error
                }
              );
        }, 
        []
    ); 

    return (
        <View style={stylesBTForm.container}>
            {loading &&  <ActivityIndicator size="large" color="#00ff00" />}   
        </View>
    );
}

const stylesBTForm = StyleSheet.create({
    container: {
        display: "flex",
        gap: 8,
    },
    buttonText: {
        marginHorizontal: 8,
    },
});

export default FormulirScanPrinterLayout;
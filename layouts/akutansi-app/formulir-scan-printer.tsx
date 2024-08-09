import { Button, IndexPath, Select, SelectItem, Toggle} from "@ui-kitten/components";
import { FC, useEffect, useState} from "react";
import { DeviceEventEmitter, StyleSheet, useWindowDimensions, View } from "react-native"; 
import { BluetoothDevice, BluetoothManager } from "tp-react-native-bluetooth-printer";
import { JenisKoneksiPrinter } from "../../features/entities/printer-scanner";

const CekBluetooth = () => {
    let status = 
    (BluetoothManager.isBluetoothEnabled() as PromiseLike<boolean>).then(
        (enabled) => {
           return enabled as boolean;
        },
        (err) => {
           return false;
        }
    ).then((data: boolean) => {
        return data;
    });

    return status;
};

const EnableBluetooth =  () => {
    // let dataPrinter =
    // (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
    //     (item) => {
    //         let paired: BluetoothDevice[] = [];
    //         if (item && item.length > 0) {
    //             for (var i = 0; i < item.length; i++) {
    //                 try {
    //                     paired.push(JSON.parse(item[i]));
    //                 } catch (e) {
    //                     return [];
    //                 }
    //             }
    //         }
    //         return paired;
    //     },
    //     (err) => {
    //         return [];
    //     }
    // ).then((data) => {
    //     return data;
    // });

    // return dataPrinter;
};

const DaftarKoneksiPrinter = Object.keys(JenisKoneksiPrinter).filter((v) => isNaN(Number(v)));

const FormulirScanPrinterLayout: FC = () => {
    const {width} = useWindowDimensions();
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    
    return (
        <View style={[styles.container, {width: width-16}]}>
            <Select
                value={DaftarKoneksiPrinter[selectedIndex.row]}
                selectedIndex={selectedIndex}
                onSelect={(index: IndexPath|IndexPath[]) => setSelectedIndex(index as IndexPath)}
                label='Jenis koneksi printer'
            >  
            {   
                DaftarKoneksiPrinter.map(
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
    const [btStatus, setBtStatus] = useState<boolean>(false);    
    const [listPrinterBt, setListPrinterBt] = useState<BluetoothDevice[]>([]);

    const onCheckedBTChange = async (isChecked: boolean) => {
        if(isChecked) {            
            // setListPrinterBt(await EnableBluetooth());
            (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
                (s) => {
                    setBtStatus(isChecked);
                },
                (e) => {
                    //error
                }
            );
            
        }
        else {
            BluetoothManager.disableBluetooth();
            setBtStatus(isChecked);
        }

        
    };  

    const _getBtPrinter = async () => {
        // setListPrinterBt(await EnableBluetooth());
        (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
            (s) => {
                setBtStatus(true);
            },
            (e) => {
                //error
            }
        );
    }

    useEffect(        
        () => {
            async function status() {
                setBtStatus(await CekBluetooth());
            }   

            status(); 

            // const handlerEvent = DeviceEventEmitter.addListener(
            //     "EVENT_DEVICE_DISCOVER_DONE", 
            //     (rsp) => {
            //         setBtStatus(true);
            //     }
            // );

            // return () => {
            //     handlerEvent.remove();
            // };
                     
        }, 
        []
    ); 

    return (
        <View style={stylesBTForm.container}>
            <Toggle
                    checked={btStatus}
                    onChange={onCheckedBTChange}
                >
                {
                    `bluetooth ${btStatus? 'on':'off'}`
                }
            </Toggle>
            <Button style={stylesBTForm.buttonText} onPress={_getBtPrinter}>Scan printer</Button>
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
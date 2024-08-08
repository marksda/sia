import { Button} from "@ui-kitten/components";
import { FC, useState} from "react";
import { StyleSheet, View } from "react-native"; 
import { BluetoothDevice, BluetoothManager } from "tp-react-native-bluetooth-printer";
import { IPrinterScanner } from "../../features/entities/printer-scanner";

// const _cekBluetooth = () => {
//     (BluetoothManager.isBluetoothEnabled() as PromiseLike<boolean>).then(
//         (enabled: boolean) => {
//             // console.log(enabled); 
//         }, 
//         (err: any) => {
//             // console.log(err);
//         }
//     );        
// };

const enableBluetooth =  () => {
    let dataPrinter =
    (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
        (item) => {
            let paired: BluetoothDevice[] = [];
            if (item && item.length > 0) {
                for (var i = 0; i < item.length; i++) {
                    try {
                        paired.push(JSON.parse(item[i]));
                    } catch (e) {
                        return [];
                    }
                }
            }
            return paired;
        },
        (err) => {
            return [];
        }
    ).then((data) => {
        return data;
    });

    return dataPrinter;
};

// const _disableBluetooth = () => {
//     (BluetoothManager.disableBluetooth() as PromiseLike<boolean>).then(
//         (status: boolean)=>{
//             // do something.
//         },
//         (err)=>{
//             // console.log(err);
//         }
//     );
// };

// const _connectBluetooth = (deviceAddress: string) => {
    //     (BluetoothManager.connect(deviceAddress) as PromiseLike<void>)
    //     .then(
    //         (s)=>{
    //             BluetoothManager.setState({
    //                 loading:false,
    //                 boundAddress:rowData.address
    //             })
    //         },
    //         (err)=>{
    //             BluetoothManager.setState({
    //                 loading:false
    //             })
    //               alert(e);
    //            }
    //         }
    //     );
    // };


const FormulirScanPrinterLayout: FC = () => {
    const [listPrinterBt, setListPrinterBt] = useState<BluetoothDevice[]>([]);
    console.log(listPrinterBt);

    const _getBtPrinter = async () => {
        let hasil = await enableBluetooth();
        setListPrinterBt(hasil);
    }

    return (
        <View style={[styles.container, styles.horizontal]}>
            <Button style={styles.buttonText} onPress={_getBtPrinter}>Cek Bluetooth</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
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

export default FormulirScanPrinterLayout;
import { Button, IndexPath, Select, SelectItem, Toggle} from "@ui-kitten/components";
import { FC, useEffect, useState} from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native"; 
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

const DaftarKoneksiPrinter = Object.keys(JenisKoneksiPrinter).filter((v) => isNaN(Number(v)));

const FormulirScanPrinterLayout: FC = () => {
    const {width} = useWindowDimensions();
    const [listPrinterBt, setListPrinterBt] = useState<BluetoothDevice[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const [btStatus, setBtStatus] = useState<boolean>(false);

    const onCheckedBTChange = (isChecked: boolean): void => {
        setBtStatus(isChecked);
    };
    

    const _getBtPrinter = async () => {
        setListPrinterBt(await EnableBluetooth());
    }

    useEffect(        
        () => {
            async function status() {
                setBtStatus(await CekBluetooth());
            }            
            status();
        }, 
        []
    );

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
            <Toggle
                checked={btStatus}
                onChange={onCheckedBTChange}
            >
            {`bluetooth ${btStatus? 'on':'off'}`}
            </Toggle>
            <Button style={styles.buttonText} onPress={_getBtPrinter}>Cek Bluetooth</Button>
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

export default FormulirScanPrinterLayout;
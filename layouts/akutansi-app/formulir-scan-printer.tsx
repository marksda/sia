import { Button, IndexPath, Select, SelectItem} from "@ui-kitten/components";
import { FC, useState} from "react";
import { StyleSheet, View } from "react-native"; 
import { BluetoothDevice, BluetoothManager } from "tp-react-native-bluetooth-printer";
import { JenisKoneksiPrinter } from "../../features/entities/printer-scanner";
import * as _ from "lodash";

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

const DaftarKoneksiPrinter = Object.keys(JenisKoneksiPrinter);

const FormulirScanPrinterLayout: FC = () => {
    const [listPrinterBt, setListPrinterBt] = useState<BluetoothDevice[]>([]);
    const [jenisKoneksiPrinter, setJenisKoneksiPrinter] = useState<string>('BLUETOOTH');
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));

    const _getBtPrinter = async () => {
        setListPrinterBt(await enableBluetooth());
    }

    return (
        <View style={[styles.container, styles.horizontal]}>
            <Select
                value={DaftarKoneksiPrinter[selectedIndex.row]}
                selectedIndex={selectedIndex}
                onSelect={(index: IndexPath|IndexPath[]) => setSelectedIndex(index as IndexPath)}
                label='Jenis koneksi printer'
                style={{flex: 1}}
            >  
            {   
                DaftarKoneksiPrinter.map(
                    (item, index) => <SelectItem key={index} title={item} />
                )
            }
            </Select>
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
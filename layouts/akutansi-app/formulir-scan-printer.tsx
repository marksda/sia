import { Button} from "@ui-kitten/components";
import { FC} from "react";
import { StyleSheet, View } from "react-native";    

const FormulirScanPrinterLayout: FC = () => {
    
    const _cekBluetooth = async () => {
        // const isEnabled = await BluetoothManager.checkBluetoothEnabled();
        // console.log(isEnabled); // true/false
    }

    return (
        <View style={[styles.container, styles.horizontal]}>
            <Button style={styles.buttonText} onPress={_cekBluetooth}>Cek Bluetooth</Button>
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
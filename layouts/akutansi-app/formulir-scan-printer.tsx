import { ProgressBar} from "@ui-kitten/components";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { usePrintersDiscovery } from "react-native-esc-pos-printer";
import { useProgress } from "../../components/progress.hook";
const FormulirScanPrinterLayout: FC = () => {
    const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();
    const progress = useProgress();
    console.log(isDiscovering);

    return (
        <View style={[styles.container, styles.horizontal]}>

            <ProgressBar
                progress={progress}
                style={{width: '100%'}}
            />
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
});

export default FormulirScanPrinterLayout;
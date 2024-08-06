import { Text } from "@ui-kitten/components";
import { FC } from "react";
import { usePrintersDiscovery } from "react-native-esc-pos-printer";

const FormulirScanPrinterLayout: FC = () => {
    const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();

    return (
        <Text>Scan printer</Text>
    );
};

export default FormulirScanPrinterLayout;
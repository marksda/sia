import { Button, Text } from "@ui-kitten/components";
import { FC } from "react";
import { usePrintersDiscovery } from "react-native-esc-pos-printer";

const FormulirScanPrinterLayout: FC = () => {
    const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();

    return (
        <>
            <Button>
                
            </Button>
        </>
    );
};

export default FormulirScanPrinterLayout;
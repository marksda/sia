import { Button, Spinner, Text } from "@ui-kitten/components";
import { FC } from "react";
import { ImageProps, StyleSheet, View } from "react-native";
import { usePrintersDiscovery } from "react-native-esc-pos-printer";

const FormulirScanPrinterLayout: FC = () => {
    const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();

    const LoadingIndicator = (props: Partial<ImageProps> | undefined): React.ReactElement => (
        <View style={[props!.style, styles.indicator]}>
          <Spinner size='small' />
        </View>
      );
    return (
        <Button
            style={styles.button}
            appearance='outline'
            accessoryLeft={LoadingIndicator}
        >
            Loading
        </Button>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      margin: 2,
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default FormulirScanPrinterLayout;
import { IndexPath, Select, SelectItem, Button, Text, IconElement, Icon} from "@ui-kitten/components";
import React, { FC, useEffect, useState} from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, PixelRatio, StyleSheet, useWindowDimensions, View } from "react-native"; 
import { BluetoothDevice, BluetoothManager, ScannedBluetoothDevices } from "tp-react-native-bluetooth-printer";
import { IPrinterScanner, JenisKoneksiPrinter } from "../../features/entities/printer-scanner";
import { useAppDispatch } from "../../app/akutansi-app-redux-hooks";
import { addPrinterScanner } from "../../services/redux-printer-slice.service";

const BluetoothIcon = (props: any): IconElement => (
    <Icon name='bluetooth' {...props} pack='material'/>
);

const AddIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='link-2-outline'
    />
);

const DaftarJenisKoneksiPrinter = Object.keys(JenisKoneksiPrinter).filter((v) => isNaN(Number(v)));

const FormulirScanPrinterLayout: FC = () => {
    const {width, height} = useWindowDimensions();
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
                (selectedIndex.row == JenisKoneksiPrinter.BLUETOOTH) && (<FormulirScanPrinterBtLayout maxHeight={PixelRatio.roundToNearestPixel(height*0.7)}/>)
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

const FormulirScanPrinterBtLayout: FC<{maxHeight: number;}> = ({maxHeight}) => { 
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);    
    const [listPrinterBt, setListPrinterBt] = useState<IPrinterScanner[]>([]);

    const scanPrinter = () => {
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
    };

    const enableBluetooth = () => {
        (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
            (item) => {
                scanPrinter();
            },
            (err) => {
                setListPrinterBt([]);
                setLoading(false);
            }
        );
    }

    const reScanPrinter = () => {
        setLoading(true);
        scanPrinter();
    }

    const addPrinter = (index: number) => {
        dispatch(addPrinterScanner(listPrinterBt[index]));
    }

    const renderItemFlatList = ({item, index}: ListRenderItemInfo<IPrinterScanner>) => (
        <View style={[stylesBTForm.itemFlatList, {maxHeight: maxHeight}]}>
            <View style={{alignSelf: "center", flex: 1}}>
                <BluetoothIcon style={{height: 24, color: item.is_connect ? "#0055F5":"#A89595", marginRight: 8}} />
            </View>
            <View style={{flex: 6}}>
                <Text>{item.name}</Text>
                <Text category="c1">{item.address}</Text>
            </View>
            <Button 
                appearance='filled'
                size='small' 
                accessoryLeft={AddIcon}
                onPress={() => addPrinter(index)}
            >
                Add
            </Button>
        </View>
    );

    useEffect(        
        () => {
            (BluetoothManager.isBluetoothEnabled() as PromiseLike<boolean>).then(
                (enabled) => {
                  if(enabled == true) {
                    scanPrinter();
                  }
                  else {
                    enableBluetooth();
                  }
                },
                (err) => {
                    setLoading(false);
                }
            );
        }, 
        []
    ); 

    return (
        <View style={stylesBTForm.container}>
            { loading && (
                <View style={{alignItems: "center"}}>
                    <ActivityIndicator size="large" color="#FB6422" />
                    <Text category="label" style={{color: "#FB6422"}}>scan process</Text>
                </View>
            ) }   
            { !loading && (
                <FlatList
                    data={listPrinterBt}
                    renderItem={renderItemFlatList}
                    keyExtractor={(item, index) => (`${index}`)}
                />
            )}
            <Button disabled={loading} onPress={reScanPrinter}>Scan</Button>
        </View>
    );
}

const stylesBTForm = StyleSheet.create({
    container: {
        display: "flex",
        // alignContent: "center",
        // alignItems: "center",
        gap: 8,
    },
    buttonText: {
        marginHorizontal: 8,
    },
    itemFlatList: {
        display: "flex",
        // flex: 1,
        flexDirection: "row",
        backgroundColor: '#FADAC2',
        padding: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: "#FA4E00",
        // marginHorizontal: 8,
    },    
});

export default FormulirScanPrinterLayout;
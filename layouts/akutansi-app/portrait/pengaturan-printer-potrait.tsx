import { Button, Divider, Icon, IconElement, Input, Layout, List, Modal, Popover, Text} from "@ui-kitten/components";
import { FC, useMemo, useState } from "react";
import { ListRenderItemInfo, Modal as RNModal, StyleSheet, ToastAndroid, useWindowDimensions, View } from "react-native";
import { normalizePxToDp } from "../../../features/utils/android-dp-px-converter";
import FormulirScanPrinterLayout from "../formulir-scan-printer";
import * as _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../app/akutansi-app-redux-hooks";
import { IPrinterScanner } from "../../../features/entities/printer-scanner";
import { removePrinterScanner, updatePrinterScanner } from "../../../services/redux-printer-slice.service";
import FormulirEditPrinterLayout from "../formulir-edit-printer";
import { BARCODETYPE, BluetoothEscposPrinter, BluetoothManager, ERROR_CORRECTION } from "tp-react-native-bluetooth-printer";


const MenuIcon = (props: any): IconElement => (
    <Icon name='menu' {...props} pack='material'/>
);

const FilterIcon = (props: any): IconElement => (
    <Icon name='line-scan' {...props} pack='material'/>
);

const BluetoothIcon = (props: any): IconElement => (
    <Icon name='bluetooth' {...props} pack='material'/>
);

const DeleteIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='trash-2-outline'
    />
);

const EditIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='edit-outline'
    />
);

const CloseIcon = (props: any): IconElement => (
    <Icon name='close-circle-outline' {...props} pack='material'/>
);

const cekAndConnectBt = async (printer: IPrinterScanner): Promise<IPrinterScanner | string> => {
    let dataBaru: IPrinterScanner =  _.cloneDeep(printer);
    let isBTEnabled: boolean|null = null;
    let hasil: IPrinterScanner|string|null = null;

    await (BluetoothManager.isBluetoothEnabled() as PromiseLike<boolean>).then(
        (enabled) => {
          if(enabled == true) {
            isBTEnabled = true;
          }
          else {
            isBTEnabled= false;
          }
        },
        (err) => {
            //err
        }
    );

    if(isBTEnabled == false) { //nyalakan bluetooth
        await (BluetoothManager.enableBluetooth() as PromiseLike<string[]>).then(
            async (_i) => {                
                await (BluetoothManager.connect(printer.address) as PromiseLike<void>).then(
                    (_i) => {
                        dataBaru.is_connect = true;
                        hasil = dataBaru;
                    },
                    (_err) => {
                        hasil = "error: bluetooth not paired"
                    }
                );
            },
            (_err) => {
                hasil = "error: bluetooth off"
            }
        );
    }
    else {
        await (BluetoothManager.connect(printer.address) as PromiseLike<void>).then(
            (_i) => {
                dataBaru.is_connect = true;
                hasil = dataBaru;
            },
            (_err) => {
                hasil = "error: bluetooth not paired"
            }
        );
    }
    
    return new Promise<IPrinterScanner|string>((resolve, reject) => {
        if( typeof(hasil) === "object") {
            resolve(hasil as IPrinterScanner);
        }
        else {
            reject(hasil as string);
        }
    });

};

interface IPengaturanPrinterPortraitLayoutProps {
    navigation: any;
};

const PengaturanPrinterPortraitLayout: FC<IPengaturanPrinterPortraitLayoutProps> = ({navigation}) => {
    const dimensions = useWindowDimensions();
    const dispatch = useAppDispatch();
    const printers = useAppSelector(state => state.persisted.printer.printers); 
    const [printer, setPrinter] = useState<IPrinterScanner|null>(null);
    const [visibleScan, setVisibleScan] = useState<boolean>(false);
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
    const [dataPrinter, setDataPrinter] = useState<IPrinterScanner|undefined>(undefined);

    const styles = useMemo(
        () => createStyle(dimensions.scale),
        [dimensions.scale]
    ); 

    const removePrinter = (index: number) => {
        dispatch(removePrinterScanner(printers[index]));
    }

    const editPrinter = (index: number) => {
        // dispatch(removePrinterScanner(printers[index]));
        setDataPrinter(printers[index]);
        setVisibleEdit(true);
    }

    const testPrint = async (item: IPrinterScanner) => {
        if(_.isEqual(printer, item) == true) {
            await  (BluetoothEscposPrinter.printText("I am an english\r\n", {}) as PromiseLike<void>).then(
                () => {},
                (e) => {
                    let dataBaru: IPrinterScanner =  _.cloneDeep(item);
                    cekAndConnectBt(item).then(
                        (r) => {
                            testPrint(item);
                            dispatch(updatePrinterScanner({dtLama: item, dtBaru: r as IPrinterScanner}));
                        },
                        (er) => {
                            ToastAndroid.showWithGravity(
                                er,
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                            );
                            dataBaru.is_connect = false;
                            dispatch(updatePrinterScanner({dtLama: item, dtBaru: dataBaru}));
                            // process.exit();
                        }
                    );
                }
            );
        }
        else {
            let dataBaru: IPrinterScanner =  _.cloneDeep(item);
            cekAndConnectBt(item).then(
                (r) => {
                    setPrinter(r as IPrinterScanner);
                    dispatch(updatePrinterScanner({dtLama: item, dtBaru: r as IPrinterScanner}));                    
                    // testPrint(item);
                },
                (er) => {
                    ToastAndroid.showWithGravity(
                        er,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                    );
                    dataBaru.is_connect = false;
                    dispatch(updatePrinterScanner({dtLama: item, dtBaru: dataBaru}));
                }
            );
        }
    }

    const renderItem = ({item, index}: ListRenderItemInfo<IPrinterScanner>) => {
        return (
            <Layout style={styles.item}>
                <Layout style={{alignSelf: "center"}}>
                    <BluetoothIcon style={{height: 24, color: item.is_connect ? "#0055F5":"#A89595", marginRight: 8}} onPress={() => {testPrint(item);}} />
                </Layout>
                <Layout style={{flex: 1}}>
                    <Text>{item.alias}</Text>
                    <Text category="c1">{item.address}</Text>
                </Layout>
                <Button 
                    appearance='outline'
                    size='small' 
                    accessoryLeft={EditIcon}
                    onPress={() => editPrinter(index)} />
                <Button 
                    appearance='outline'
                    size='small' 
                    accessoryLeft={DeleteIcon}
                    onPress={() => removePrinter(index)} />
            </Layout>
        );
    };

    const renderAccessoryRight = (props: any): React.ReactElement => (
        <>
        { visibleScan == false ? <FilterIcon {...props} style={{height: 24, color: "#FA8105", marginRight: 8}} onPress={() => setVisibleScan(true)}/> : null }
        </>
    );

    const renderAccessoryLeft = (props: any): React.ReactElement => (
        <MenuIcon {...props} onPress={() => navigation.openDrawer(true)} />
    );

    const renderHeader = (): React.ReactElement => (
        <Layout style={styles.containerTopNav}>
            <Input
                style={styles.inputSearch}
                placeholder='Pencarian'
                accessoryLeft={renderAccessoryLeft}
                accessoryRight={renderAccessoryRight}
            />
        </Layout> 
    );

    return (
        <> 
            <Popover
                visible={visibleScan}
                anchor={renderHeader}
                placement="inner top"
                onBackdropPress={() => setVisibleScan(false)}
                backdropStyle={styles.backdrop}
                fullWidth={true}
                style={{marginHorizontal: 8, marginTop: 8}}
            >
                <FormulirScanPrinterLayout />
            </Popover>  
            <List
                style={styles.containerList}                
                data={printers}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />         
            <RNModal 
                visible={visibleEdit}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setVisibleEdit(false);
                }}
                style={{flex: 1}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>     
                        <View style={{alignSelf: "flex-end"}}> 
                            <CloseIcon 
                                style={{height: 32, color: '#FA4E00', margin: 8} }
                                onPress={() => setVisibleEdit(false)}
                            /> 
                        </View>                  
                        {dataPrinter && <FormulirEditPrinterLayout data={dataPrinter} setVisibleEdit={setVisibleEdit}/>}
                    </View>
                </View>
            </RNModal>   
        </>
    );
};

function createStyle(skala: number) {
    return StyleSheet.create({
        containerTopNav: {
            padding: 8,
            borderBottomWidth: 1, 
            borderBottomColor: "#EBE9EA",
        },
        containerFilter: {
            display: "flex",
            flexDirection: "row",
            columnGap: 8,
            alignItems: "center",
            paddingHorizontal: 8,
            paddingTop: 8,
        },
        containerGroupFilter: {
            display: "flex",
            flex: 1,
            flexDirection: "row",
            columnGap: 8,
            alignContent: "center",
            alignItems: "center",
        },
        containerList: {
            marginBottom: 4,
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 12,
            gap: 2,
            // marginVertical: 2,
        },
        boldKodeText: {            
            fontSize: normalizePxToDp(7, skala),
            fontWeight: 'bold',
        },
        normalKodeText: {            
            fontSize: normalizePxToDp(7, skala),
            fontFamily: 'Cochin',
        },
        boldNamaText: {
            fontSize: normalizePxToDp(7, skala),
            fontWeight: 'bold',
            marginLeft: 16,
        },
        normalNamaText: {
            fontSize: normalizePxToDp(7, skala),
            fontFamily: 'Cochin',
            marginLeft: 16,
        },
        inputSearch: {
            // borderRadius: 32,
            // backgroundColor: "orange"
        },
        button: {
            // maxWidth: 80,
            borderRadius: 16,
        },
        backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        backdropModal: {
            backgroundColor: "#4C4C4CEB",
        },
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'center',
            // marginTop: 22,
        },
        modalView: {
            margin: 8,
            backgroundColor: 'white',
            borderRadius: 20,
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            paddingBottom: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    }
    )
};

export default PengaturanPrinterPortraitLayout;
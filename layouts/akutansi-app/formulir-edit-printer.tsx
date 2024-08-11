import { Button, Input, Text, Select, IndexPath, SelectItem} from "@ui-kitten/components";
import React, { FC } from "react";
import { StyleSheet,  View } from "react-native"; 
import { IPrinterScanner, JenisKoneksiPrinter } from "../../features/entities/printer-scanner";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as _ from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrinterScannerSchema } from "../../features/schema-resolver/zod-schema";
import { useAppDispatch } from "../../app/akutansi-app-redux-hooks";
import { updatePrinterScanner } from "../../services/redux-printer-slice.service";


const DaftarJenisKoneksiPrinter = Object.keys(JenisKoneksiPrinter).filter((v) => isNaN(Number(v)));

interface IFormulirEditPrinterLayoutProps {
    data: IPrinterScanner; 
    setVisibleEdit: any
};

const FormulirEditPrinterLayout: FC<IFormulirEditPrinterLayoutProps> = ({data, setVisibleEdit}) => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm<IPrinterScanner>({
        defaultValues: _.cloneDeep(data),
        resolver: zodResolver(PrinterScannerSchema),
    });

    const renderCaption = (message: string|undefined): React.ReactElement => {
        return (
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>
            {message}
            </Text>
          </View>
        );
    };

    const onSubmit: SubmitHandler<IPrinterScanner> = (dataBaru) => {
        dispatch(updatePrinterScanner({dtLama: data, dtBaru: dataBaru}));        
        setVisibleEdit(false);
    };

    // const onError = (errors: any, e: any) => console.log(errors, e);

    const onPressUpdate = () => {
        handleSubmit(onSubmit)();
    };

    return (
        <View style={[styles.container]}>      
            <Controller
                control={control}
                name="alias"
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label='Nama printer'
                        placeholder='Isikan nama printer'
                        value={value}
                        onChangeText={onChange}
                        caption={errors.alias ? renderCaption(errors.alias.message):undefined}
                        style={{alignSelf: "flex-start"}}
                    />   
                )}
            />     
            <Controller
                control={control}
                name="connection_type"
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                        value={DaftarJenisKoneksiPrinter[value]}
                        selectedIndex={new IndexPath(value)}
                        onSelect={(index: IndexPath|IndexPath[]) => onChange((index as IndexPath).row)}
                        label='Jenis koneksi printer'
                    >  
                    {   
                        DaftarJenisKoneksiPrinter.map(
                            (item, index) => <SelectItem key={index} title={item} />
                        )
                    }
                    </Select>  
                )}
            />     
            <Controller
                control={control}
                name="address"
                rules={{
                 required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label='Identifier'
                        placeholder='Isikan identifier printer'
                        value={value}
                        onChangeText={onChange}
                        caption={errors.address ? renderCaption(errors.address.message):undefined}
                        style={{alignSelf: "flex-start"}}
                    />    
                )}
            />
            <Button 
                appearance='filled'
                // size='small' 
                onPress={onPressUpdate}
            >
                Update
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        rowGap: 8,
        padding: 10,
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
    },
    // captionIcon: {
    //     width: 10,
    //     height: 10,
    //     marginRight: 5,
    // },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        color: '#FA4E00',
    },
});

export default FormulirEditPrinterLayout;
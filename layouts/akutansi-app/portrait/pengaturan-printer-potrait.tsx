import { Divider, Icon, IconElement, Input, Layout, List, Popover} from "@ui-kitten/components";
import { FC, useMemo, useState } from "react";
import { IQueryParamFilters } from "../../../features/entities/query-param-filters";
import { useGetDaftarAkunQuery } from "../../../services/akutansi-app-api-rtkquery-service";
import { IAkun } from "../../../features/entities/akutansi-app/akun";
import { ListRenderItemInfo, StyleSheet, Text, useWindowDimensions } from "react-native";
import { normalizePxToDp } from "../../../features/utils/android-dp-px-converter";
import FormulirScanPrinterLayout from "../formulir-scan-printer";


const MenuIcon = (props: any): IconElement => (
    <Icon name='menu' {...props} pack='material'/>
);

const FilterIcon = (props: any): IconElement => (
    <Icon name='line-scan' {...props} pack='material'/>
);

interface IPengaturanPrinterPortraitLayoutProps {
    navigation: any;
};

const PengaturanPrinterPortraitLayout: FC<IPengaturanPrinterPortraitLayoutProps> = ({navigation}) => {
    const dimensions = useWindowDimensions();
    const [filter] = useState<IQueryParamFilters>({
        pageNumber: 1,
        pageSize: 25,
        filters: [
            {
            fieldName: 'kelompok_akun',
            value: '0'
            },
        ],
        sortOrders: [
            {
                fieldName: 'kelompok_akun',
                value: 'ASC'
            },
            {
                fieldName: 'kode',
                value: 'ASC'
            },
            {
                fieldName: 'level',
                value: 'ASC'
            },
        ],
    });
    const [visibleScan, setVisibleScan] = useState<boolean>(false);
    const { data: items, isLoading } = useGetDaftarAkunQuery(filter);

    const styles = useMemo(
        () => createStyle(dimensions.scale),
        [dimensions.scale]
    ); 

    const renderItem = ({item}: ListRenderItemInfo<IAkun>) => {
        return (
            <Layout style={styles.item}>
                <Text style={[ item.header ? styles.boldKodeText : styles.normalKodeText, {marginLeft: 16 * (item.level!-1)}]}>{item.kode!}</Text>
                <Text style={item.header ? styles.boldNamaText : styles.normalNamaText}>{item.nama!}</Text>
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

    const renderListPrinter = (): React.ReactElement => (
        <List
            style={styles.containerList}
            data={items == undefined ? [] : items}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />     
    );

    return (
        <>      
            <Layout style={styles.containerTopNav}>
                <Input
                    style={styles.inputSearch}
                    placeholder='Pencarian'
                    accessoryLeft={renderAccessoryLeft}
                    accessoryRight={renderAccessoryRight}
                />
            </Layout> 
            <Popover
                visible={visibleScan}
                anchor={renderListPrinter}
                placement="inner"
                onBackdropPress={() => setVisibleScan(false)}
                backdropStyle={styles.backdrop}
            >
                <FormulirScanPrinterLayout />
            </Popover>              
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
    }
    )
};

export default PengaturanPrinterPortraitLayout;
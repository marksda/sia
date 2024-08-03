import { Divider, Icon, IconElement, Input, Layout, List} from "@ui-kitten/components";
import { FC, useMemo, useState } from "react";
import { IQueryParamFilters } from "../../features/entities/query-param-filters";
import { useGetDaftarAkunQuery } from "../../services/api-rtkquery-service";
import { IAkun } from "../../features/entities/akutansi-app/akun";
import { ListRenderItemInfo, StyleSheet, Text, useWindowDimensions } from "react-native";
import { normalizePxToDp } from "../../features/utils/android-dp-px-converter";


const MenuIcon = (props: any): IconElement => (
    <Icon
      {...props}
      name='menu-outline'
    />
);

const FilterIcon = (props: any) => (
    <Icon name='filter-variant' {...props} pack='material'/>
);


interface IPembukuanAkunPortraitLayoutProps {
    navigation: any;
};
const PembukuanAkunPortraitLayout: FC<IPembukuanAkunPortraitLayoutProps> = ({navigation}) => {
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

    return (
        <>
            <Layout style={styles.containerTopNav}>
                <Input
                    placeholder='Pencarian'
                    accessoryLeft={<MenuIcon onPress={() => navigation.openDrawer()}/>}
                    accessoryRight={<FilterIcon onPress={() => navigation.openDrawer()}/>}
                />
            </Layout>
            <List
                style={styles.containerList}
                data={items == undefined ? [] : items}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </>
    );
};

function createStyle(skala: number) {
    return StyleSheet.create({
        containerTopNav: {
            height: normalizePxToDp(28, skala), 
            padding: 8,
        },
        containerList: {
            // marginBottom: 24,
        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 8,
            paddingHorizontal: 12,
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
    }
    )
};

export default PembukuanAkunPortraitLayout;
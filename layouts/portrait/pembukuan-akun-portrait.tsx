import { Divider, Layout, List, } from "@ui-kitten/components";
import { FC, useMemo, useState } from "react";
import { IQueryParamFilters } from "../../features/entities/query-param-filters";
import { useGetDaftarAkunQuery } from "../../services/api-rtkquery-service";
import { IAkun } from "../../features/entities/akutansi-app/akun";
import { ListRenderItemInfo, StyleSheet, Text, useWindowDimensions } from "react-native";
import { normalizePxToDp } from "../../features/utils/android-dp-px-converter";




const PembukuanAkunPortraitLayout: FC = () => {
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
            fieldName: 'kode',
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
        console.log(item);
        return (
            <Layout style={styles.item}>
                <Text style={[styles.kodeText, {marginLeft: 16 * (item.level!-1)}]}>{item.kode!}</Text>
                <Text style={styles.namaText}>{item.nama!}</Text>
            </Layout>
        );
    };

    return (
        <List
            style={styles.containerList}
            data={items == undefined ? [] : items}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
    );
};

function createStyle(skala: number) {
    return StyleSheet.create({
        containerList: {

        },
        item: {
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 8,
            paddingHorizontal: 12,
            // marginVertical: 4,
        },
        kodeText: {            
            fontSize: normalizePxToDp(7, skala),
            fontWeight: 'bold',
        },
        namaText: {
            fontSize: normalizePxToDp(7, skala),
            fontFamily: 'Cochin',
            marginLeft: 16,
        },
    }
    )
};

export default PembukuanAkunPortraitLayout;
import { List, ListItem } from "@ui-kitten/components";
import { FC, useState } from "react";
import { IQueryParamFilters } from "../../features/entities/query-param-filters";
import { useGetDaftarAkunQuery } from "../../services/api-rtkquery-service";
import { IAkun } from "../../features/entities/akutansi-app/akun";
import { ListRenderItemInfo, StyleSheet } from "react-native";


const renderItem = ({item}: ListRenderItemInfo<IAkun>) => {
    console.log(item);
    return (
        <ListItem
            title={item.kode!}
            description={item.nama!}
        />
    );
};

const PembukuanAkunPortraitLayout: FC = () => {
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
            fieldName: 'id',
            value: 'ASC'
            },
        ],
    });
    const { data: items, isLoading } = useGetDaftarAkunQuery(filter);

    return (
        <List
            style={styles.containerList}
            data={items == undefined ? [] : items}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    containerList: {
    //   maxHeight: 180,
    },
  });

export default PembukuanAkunPortraitLayout;
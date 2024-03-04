import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, List, Text } from '@ui-kitten/components';
import { useGetDaftarBarangQuery } from '../../services/api-rtkquery-service';
import { IQueryParamFilters } from '../../features/entities/query-param-filters';
import { IBarang } from '../../features/entities/barang';
import { ITransaki } from '../../features/entities/transaksi';
import * as _ from "lodash";
import { IItemTransaki } from '../../features/entities/item-transaksi';

interface ITransaksiScreenProps {
  initSelectedFilters?: IQueryParamFilters;
  navigation: any;
};

export const TransaksiScreen: FC<ITransaksiScreenProps> = ({initSelectedFilters, navigation}) => {
  
  const [transaksi, seTransaksi] = useState<ITransaki|null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initSelectedFilters?.pageNumber!);
  const [pageSize, setPageSize] = useState<number>(initSelectedFilters?.pageSize!);
  const [queryParams, setQueryParams] = useState<IQueryParamFilters>({
    ...initSelectedFilters!, pageNumber: currentPage, pageSize
  });
  const { data: daftarBarang, isLoading: isLoadingFetchDaftarBarang } = useGetDaftarBarangQuery(queryParams);    

  const navigateDetails = () => {
    navigation.navigate('Laporan');
  };

  const _onHandlePressItem = (id: string) => {
    if(transaksi === null) {  //belum ada transaksi
      let transaksi: ITransaki = {
        id: null,
        tanggal: new Date(),
        keterangan: null,
        daftarItemTransaksi: []
      };
      let itemSelected = _.find(daftarBarang, (item) => (item.id === id));      

      if(itemSelected !== undefined) {
        let itemTransaksi: IItemTransaki = {
          item: itemSelected,
          harga: 123,
          jumlah: 1,
          total: 123
        };

        transaksi.daftarItemTransaksi.push(itemTransaksi);
        seTransaksi(transaksi);
      }     
    }
    else {  //sudah ada transaksi

    }
  };

  const Header = (item: IBarang): React.ReactElement => (
    <View>
      <Text category='s1'>
        {`${item.id} - ${item.nama}`}
      </Text>
      <Text category='s2'>
        Rp. 100,00
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.containerTop} level='1'>   
        { daftarBarang ? (
            daftarBarang.map((item) => (
              <Card
                key={item.id as string}
                style={styles.card}
                header={Header(item)}
                onPress={(e) => {_onHandlePressItem(item.id!)}}
              >
                <Text>
                  With Header
                </Text>
              </Card>
            ))            
          ) : null
        }        
      </Layout>
      <Layout style={styles.containerBottom}>
        <Button onPress={navigateDetails}>OPEN Laporan</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 2,
  },
  containerBottom: {
    paddingHorizontal: 8
  }
});
import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Layout, List, ListItem, Text } from '@ui-kitten/components';
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

const data = new Array(53).fill({
  title: 'Item',
});

export const TransaksiScreen: FC<ITransaksiScreenProps> = ({initSelectedFilters, navigation}) => {
  
  const [transaksi, setTransaksi] = useState<ITransaki|null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initSelectedFilters?.pageNumber!);
  const [pageSize, setPageSize] = useState<number>(initSelectedFilters?.pageSize!);
  const [queryParams, setQueryParams] = useState<IQueryParamFilters>({
    ...initSelectedFilters!, pageNumber: currentPage, pageSize
  });
  const { data: daftarBarang, isLoading: isLoadingFetchDaftarBarang } = useGetDaftarBarangQuery(queryParams);   
  
  console.log(transaksi);

  const navigateDetails = () => {
    navigation.navigate('Laporan');
  };

  const _onHandlePressItem = (id: string) => {
    if(transaksi === null) {  //belum ada object transaksi
      let transaksi: ITransaki = {
        id: null,
        tanggal: new Date(),
        keterangan: null,
        daftarItemTransaksi: []
      };      
      let itemSelected = _.find(daftarBarang, (item) => (item.id == id));      

      if(itemSelected !== undefined) {
        let itemTransaksi: IItemTransaki = {
          item: itemSelected,
          harga: 123,
          jumlah: 1,
          total: 123
        };

        transaksi.daftarItemTransaksi.push(itemTransaksi);
        setTransaksi(transaksi);
      }     
    }
    else {  //sudah ada object transaksi
      setTransaksi((prev) => {
        let newTransaksi = _.cloneDeep(prev);
        let itemSelected = _.find(daftarBarang, (item) => (item.id === id));

        if(itemSelected !== undefined) {
          let itemTransaksi: IItemTransaki = {
            item: itemSelected,
            harga: 123,
            jumlah: 1,
            total: 123
          };
  
          newTransaksi!.daftarItemTransaksi.push(itemTransaksi);
          setTransaksi(transaksi);
        }  

        return newTransaksi;
      })
    }
  };

  const _renderCardHeader = (item: IBarang): React.ReactElement => (
    <View>
      <Text category='s1'>
        {`${item.id} - ${item.nama}`}
      </Text>
      <Text category='s2'>
        Rp. 100,00
      </Text>
    </View>
  );

  const _renderListItem = ({ item, index }: { item: IItemTransaki ; index: number }): React.ReactElement => (
    <ListItem title={`${item.item?.nama} `} />
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Layout style={styles.containerTop}>   
        { daftarBarang ? (
            daftarBarang.map((item) => (
              <Card
                key={item.id as string}
                style={styles.card}
                header={_renderCardHeader(item)}
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
      <Layout style={styles.containerMiddle}>
        <Text
          style={styles.notaTitle}
          category='h6'>
            Nota transaksi
        </Text>
        <Divider />
        <List
          contentContainerStyle={styles.contentListContainer}
          data={transaksi ? transaksi.daftarItemTransaksi: null}
          renderItem={_renderListItem}
        />        
      </Layout>
      <Layout style={styles.containerBottom}>
        <Button onPress={navigateDetails}>OPEN Laporan</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerTop: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  containerMiddle: {
    flex: 9,
    flexDirection: 'column',
    padding: 8,
  },
  card: {
    flex: 1,
    margin: 2,
  },
  containerBottom: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  notaTitle: {
    margin: 8
  },
  contentListContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
import React, { FC, useState } from 'react';
import { ListRenderItemInfo, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Layout, List, ListItem } from '@ui-kitten/components';
import { useGetDaftarBarangQuery } from '../../services/api-rtkquery-service';
import { IQueryParamFilters } from '../../features/entities/query-param-filters';
import { IBarang } from '../../features/entities/barang';


interface ITransaksiScreenProps {
  initSelectedFilters?: IQueryParamFilters;
  navigation: any;
};

const data = new Array(8).fill({
  title: 'Item',
});

export const TransaksiScreen: FC<ITransaksiScreenProps> = ({initSelectedFilters, navigation}) => {
  
  const [currentPage, setCurrentPage] = useState<number>(initSelectedFilters?.pageNumber!);
  const [pageSize, setPageSize] = useState<number>(initSelectedFilters?.pageSize!);
  const [queryParams, setQueryParams] = useState<IQueryParamFilters>({
    ...initSelectedFilters!, pageNumber: currentPage, pageSize
  });
  const { data: daftarBarang, isLoading: isLoadingFetchDaftarBarang } = useGetDaftarBarangQuery(queryParams);    

  const navigateDetails = () => {
    navigation.navigate('Laporan');
  };

  const renderItem = ({item}: ListRenderItemInfo<IBarang>): React.ReactElement => {
    return <ListItem title={`${item.id} - ${item.nama}`} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List style={styles.container}
          data={daftarBarang}
          renderItem={renderItem} />    
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>   
        <Button onPress={navigateDetails}>OPEN Laporan</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 180,
  },
});
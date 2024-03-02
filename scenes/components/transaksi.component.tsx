import React, { FC, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
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

  // const renderItem = ({item}: ListRenderItemInfo<IBarang>): React.ReactElement => {
  //   return <ListItem title={`${item.id} - ${item.nama}`} />;
  // };

  const Header = (item: IBarang): React.ReactElement => (
    <View>
      <Text category='h6'>
        {`${item.id}`}
      </Text>
      <Text category='s1'>
        {`${item.nama}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <List style={styles.container}
          data={daftarBarang}
          renderItem={renderItem} />     */}
      <Layout style={styles.containerTop} level='1'>   
        { daftarBarang ? (
            daftarBarang.map((item) => (
              <Card
                key={item.id as string}
                style={styles.card}
                header={Header(item)}
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
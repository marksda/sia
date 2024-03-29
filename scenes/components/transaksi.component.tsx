import React, { FC, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Button, Card, Divider, Icon, List, Text } from '@ui-kitten/components';
import { useGetDaftarBarangQuery } from '../../services/api-rtkquery-service';
import { IQueryParamFilters } from '../../features/entities/query-param-filters';
import { IBarang } from '../../features/entities/barang';
import { ITransaki } from '../../features/entities/transaksi';
import * as _ from "lodash";
import { IItemTransaki } from '../../features/entities/item-transaksi';
import { TouchableHighlight } from 'react-native-gesture-handler';

interface ITransaksiScreenProps {
  initSelectedFilters?: IQueryParamFilters;
  navigation: any;
};

export const TransaksiScreen: FC<ITransaksiScreenProps> = ({initSelectedFilters, navigation}) => {
  
  const [transaksi, setTransaksi] = useState<ITransaki|null>(null);
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
          harga: itemSelected.harga_satuan!,
          jumlah: 1,
          total: itemSelected.harga_satuan!
        };

        transaksi.daftarItemTransaksi.push(itemTransaksi);
        setTransaksi(transaksi);
      }     
    }
    else {  //sudah ada object transaksi

      setTransaksi((prev) => {
        let newTransaksi = _.cloneDeep(prev);

        //cari apakah item sudah ada dalam transaksi        
        let existItem = _.find(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));
        
        if(existItem != undefined) {
          let indexItem = _.findIndex(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));

          existItem.jumlah += 1;
          existItem.total = existItem.jumlah * existItem.harga;

          newTransaksi?.daftarItemTransaksi.splice(indexItem, 1, existItem);
        }
        else {
          let itemSelected = _.find(daftarBarang, (item) => (item.id === id));

          if(itemSelected !== undefined) {
            let itemTransaksi: IItemTransaki = {
              item: itemSelected,
              harga: itemSelected.harga_satuan!,
              jumlah: 1,
              total: 100
            };
    
            newTransaksi!.daftarItemTransaksi.push(itemTransaksi);
            setTransaksi(transaksi);
          }  
        }

        return newTransaksi;
      });
    }
  };

  const _onPressIconDelete = (id: string) => {
    if(transaksi != null) {  
      setTransaksi((prev) => {
        let newTransaksi = _.cloneDeep(prev);
        _.remove(newTransaksi!.daftarItemTransaksi, (currentObject) => {
          return currentObject.item?.id === id;
        });

        return newTransaksi;
      })
    }
  };

  const _onPressIconMinus = (id: string) => {
    if(transaksi != null) {  
      setTransaksi((prev) => {
        let newTransaksi = _.cloneDeep(prev);
        let existItem = _.find(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));
        if(existItem != undefined) {
          if(existItem.jumlah == 1) {
            _.remove(newTransaksi!.daftarItemTransaksi, (currentObject) => {
              return currentObject.item?.id === id;
            });
          }
          else {
            let indexItem = _.findIndex(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));

            existItem.jumlah -= 1;
            existItem.total = existItem.jumlah * existItem.harga;

            newTransaksi?.daftarItemTransaksi.splice(indexItem, 1, existItem);
          }          
        }

        return newTransaksi;
      })
    }
  };

  const _onPressIconPlus = (id: string) => {
    if(transaksi != null) {  
      setTransaksi((prev) => {
        let newTransaksi = _.cloneDeep(prev);
        let existItem = _.find(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));
        if(existItem != undefined) {
          let indexItem = _.findIndex(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));

          existItem.jumlah += 1;
          existItem.total = existItem.jumlah * existItem.harga;

          newTransaksi?.daftarItemTransaksi.splice(indexItem, 1, existItem);
        }

        return newTransaksi;
      })
    }
  };

  const _onChangeInputNumber = (id: string, val: string) => {
    if(transaksi != null) {  
      let count = 0;
      if(val == '') {
        count = 0;
      }
      else {
        count = Number(val);
      }      

      setTransaksi((prev) => {
        let newTransaksi = _.cloneDeep(prev);
        let existItem = _.find(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));
        if(existItem != undefined) {
          if(count < 0) {
            _.remove(newTransaksi!.daftarItemTransaksi, (currentObject) => {
              return currentObject.item?.id === id;
            });
          }
          else {
            let indexItem = _.findIndex(newTransaksi!.daftarItemTransaksi, (currentObject) => (currentObject.item?.id === id));

            existItem.jumlah = count;
            existItem.total = existItem.jumlah * existItem.harga;

            newTransaksi?.daftarItemTransaksi.splice(indexItem, 1, existItem);
          }          
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
        {`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 2 }).format(item.harga_satuan!)}`}
      </Text>
    </View>
  );
  
  const _renderListItem = ({ item, index }: { item: IItemTransaki ; index: number }): React.ReactElement => (
    <View style={styles.layoutContentDetailItem}>
      <View style={styles.itemImage}>

      </View>
      <View style={styles.contentItemDetail}>
        <View style={styles.itemDetailTop}>
          <Text style={styles.title}>{`${item.item?.id} - ${item.item?.nama!}`}</Text>
          <TouchableHighlight onPress={() => _onPressIconDelete(item.item?.id!)} underlayColor="#FCD4F2">
            <Icon
              style={styles.iconDelete}
              name='trash-2-outline'              
            />
          </TouchableHighlight>          
        </View>
        <View style={styles.itemDetailBottom}>
          <Text style={styles.titleHarga}>{`${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 2 }).format(item.harga)}`}</Text>
          <View style={styles.itemDetailCount}>
            <TouchableHighlight onPress={() => _onPressIconPlus(item.item?.id!)} underlayColor="#FCD4F2">
              <Icon
                style={styles.icon}
                name='plus-outline'
              />
            </TouchableHighlight>
            <TextInput
              style={styles.input}
              caretHidden={false}
              onChangeText={(val) => _onChangeInputNumber(item.item?.id!, val)}
              value={item.jumlah == 0 ? '':item.jumlah.toString()}
              keyboardType="numeric"
            />
            <TouchableHighlight onPress={() => _onPressIconMinus(item.item?.id!)} underlayColor="#FCD4F2">
              <Icon
                style={styles.icon}
                name='minus-outline'
              />
            </TouchableHighlight>
          </View>
        </View>        
      </View>
    </View>    
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.containerTop}>   
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
      </View>
      <View style={styles.containerMiddle}>
        <Text
          style={styles.notaTitle}
          category='h6'>
            Nota transaksi
        </Text>
        <Divider />
        <List
          keyExtractor={item => item.item?.id!}
          contentContainerStyle={styles.contentListContainer}
          data={transaksi ? transaksi.daftarItemTransaksi: null}
          renderItem={_renderListItem}
        />       
      </View>
      <View style={styles.containerBottom}>
        <Button onPress={navigateDetails}>OPEN Laporan</Button>
      </View>
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
  layoutContentDetailItem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 4,
  },
  itemImage: {
    flex: 1,    
    backgroundColor: 'grey',
  },
  contentItemDetail: {
    flex: 4,
    flexDirection: 'column',
  },
  itemDetailTop: {   
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: '#f9c2ff',
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 36,
    justifyContent: 'space-between',
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  itemDetailBottom: {   
    flex: 1,
    flexDirection: 'row', 
    backgroundColor: '#f9c2ff',
    padding: 8,
    justifyContent: 'space-between',
  },
  itemDetailCount: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'grey',
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  }, 
  titleHarga: {
    fontSize: 14,
  },  
  input: {
    height: 20,
    width: 30,
    // borderWidth: 1,
    fontSize: 14,
    textAlignVertical: 'top',
    textAlign: 'center',
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
  icon: {
    width: 18,
    height: 18,
    color: 'grey',
  },
  iconDelete: {
    width: 22,
    height: 22,
    color: 'grey',
  },
});
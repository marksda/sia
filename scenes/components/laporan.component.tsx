import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { useAppDispatch } from '../../app/akutansi-app-redux-hooks';
import { resetToken } from '../../services/redux-token-slice.service';


export const LaporanScreen = ({ navigation }: { navigation: any; }) => {

  const dispatch = useAppDispatch();

  // const navigateDetails = () => {
  //   navigation.navigate('Transaksi');
  // };

  const logOut = () => {
    dispatch(resetToken(null));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={logOut}>OPEN Transaksi</Button>
      </Layout>
    </SafeAreaView>
  );
};
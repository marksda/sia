import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const TransaksiScreen = ({ navigation }: { navigation: any; }) => {

  const navigateDetails = () => {
    navigation.navigate('Laporan');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Transaksi' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN Laporan</Button>
      </Layout>
    </SafeAreaView>
  );
};
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';

export const LaporanScreen = ({ navigation }: { navigation: any; }) => {

  const navigateDetails = () => {
    navigation.navigate('Transaksi');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>OPEN Transaksi</Button>
      </Layout>
    </SafeAreaView>
  );
};
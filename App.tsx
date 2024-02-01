import React from 'react';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
    <Button>HOME</Button>
  </Layout>
);

export default () => (
  <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
    <HomeScreen />
  </ApplicationProvider>
);
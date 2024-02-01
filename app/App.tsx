import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '../navigation/app.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssetIconsPack } from './app-icons-pack';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
  </Layout>
);

export const App = (): React.ReactElement => (
  <>
    <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>      
    </ApplicationProvider>
  </>  
);
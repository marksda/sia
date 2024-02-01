import React from 'react';
import * as eva from '@eva-design/eva';
import { default as theme } from '../theme.json';
import { ApplicationProvider, Button, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '../navigation/app.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppIconsPack } from './app-icons-pack';

export default () => (
  <>
    <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
    <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>      
    </ApplicationProvider>
  </>  
);
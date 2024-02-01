import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '../navigation/app.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssetIconsPack } from './app-icons-pack';

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
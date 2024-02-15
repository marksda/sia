import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from '../navigation/app.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssetIconsPack } from './app-icons-pack';
import { default as theme } from './theme.json';
import { StatusBar } from '../components/status-bar.component';
import { default as mapping } from './mapping.json';
import { SignInScreen } from '../scenes/auth/sign-in.component';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useAppSelector } from './redux-hooks';

export const App = (): React.ReactElement => {
  const token = useAppSelector(state => state.token); 
  return (
    <>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ApplicationProvider 
        {...eva} 
        customMapping={mapping}
        theme={{ ...eva.light, ...theme }}>
        <SafeAreaProvider>
          <SignInScreen />
        </SafeAreaProvider>      
      </ApplicationProvider>
    </>
  );  
};
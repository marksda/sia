import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Icon, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from '../navigation/app.navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssetIconsPack } from './app-icons-pack';
import { default as theme } from '../theme.json';


const FacebookIcon = (props: any) => (
  <Icon name='laporan' {...props} pack='assets'/>
);

export const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <LoginButton />
  </Layout>
);

export const App = (): React.ReactElement => (
  <>
    <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>      
    </ApplicationProvider>
  </>  
);
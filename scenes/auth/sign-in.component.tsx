import React from 'react';
import ContentView from '../../layouts/auth/sign-in';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const SignInScreen = (): React.ReactElement => (
  <SafeAreaProvider>
    <ContentView />
  </SafeAreaProvider>  
);
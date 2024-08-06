import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { persistor, store } from './akutansi-app-redux-store';
import MainAkutansiScreen from '../scenes/akutansi-app/akutansi-main-page';
import { PersistGate } from 'redux-persist/integration/react';
import { MaterialIconsPack } from './material-icons-pack';

export const App = (): React.ReactElement => {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={[EvaIconsPack, MaterialIconsPack]} />
        <ApplicationProvider 
          {...eva} 
          customMapping={{ ...eva.mapping, ...mapping }}
          theme={{ ...eva.light, ...theme }}>
          <MainAkutansiScreen />      
        </ApplicationProvider>
      </PersistGate>      
    </Provider>
  );  
};
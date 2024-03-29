import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AssetIconsPack } from './app-icons-pack';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { persistor, store } from './redux-store';
import { Main } from './Main';
import { PersistGate } from 'redux-persist/integration/react';

export const App = (): React.ReactElement => {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
        <ApplicationProvider 
          {...eva} 
          customMapping={mapping}
          theme={{ ...eva.light, ...theme }}>
          <Main />      
        </ApplicationProvider>
      </PersistGate>      
    </Provider>
  );  
};
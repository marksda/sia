import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AssetIconsPack } from './app-icons-pack';
import { default as theme } from './theme.json';
import { default as mapping } from './mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { store } from './redux-store';
import { Main } from './Main';

export const App = (): React.ReactElement => {
  
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ApplicationProvider 
        {...eva} 
        customMapping={mapping}
        theme={{ ...eva.light, ...theme }}>
        <Main />      
      </ApplicationProvider>
    </Provider>
  );  
};
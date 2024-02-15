import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';
import { App } from './app/App';
import {name as appName} from './app.json';
import { store } from './app/redux-store';

const Main = <Provider store={store}>
        <App />
    </Provider>;


AppRegistry.registerComponent(appName, () => Main);

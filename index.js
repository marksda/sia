import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import { App } from './app/App';
import {name as appName} from './app.json';

const Main = <Provider store={store}>
        <App />
    </Provider>;


AppRegistry.registerComponent(appName, () => App);

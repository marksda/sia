import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import { App } from './app/akutansi-app-App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);

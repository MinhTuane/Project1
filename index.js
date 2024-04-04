/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs([
    "Require cycle: node_modules/victory",
  ]);
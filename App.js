
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

import AuthLoadingScreen from './screens/auth_loading'

import LoginScreen from "./screens/login"
import SignupScreen from "./screens/signup"
import MapScreen from "./screens/map"
import BarcodeReader from "./screens/barcode_reader"


const AppStack = createStackNavigator(
  {
    Map:  MapScreen,
    BarcodeReader: BarcodeReader
  },
  {
    initialRouteName: "Map"
  }
)

const AuthStack = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
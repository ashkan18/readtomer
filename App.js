
import { createStackNavigator } from 'react-navigation'

import LoginScreen from "./screens/login"
import MapScreen from "./screens/map"


export default App = createStackNavigator(
  {
    Login: LoginScreen,
    Map:  MapScreen
  },
{
  initialRouteName: "Login"
})


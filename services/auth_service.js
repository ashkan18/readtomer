import axios, { AxiosResponse } from 'axios'
import { AsyncStorage } from 'react-native';

export default class AuthService {
  // Initializing important variables
  constructor() {
    this.login = this.login.bind(this)
  }

  login(username, pass){
    return new Promise((resolve, rejected) =>
      axios.post("https://readtome.herokuapp.com/api/login", { user: { username: username, password: pass } })
      .then( response => {
        this.setToken(response.data.data.token)
        return resolve(response.data.data.token)
      })
      .catch( error => {
        return rejected(error)
      })
    )
  }

  setToken = (idToken) => {
    // Saves user token to localStorage
    AsyncStorage.setItem('userToken', idToken)
  }

  getToken() {
    token = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    }
    return token
  }
}

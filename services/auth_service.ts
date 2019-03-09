import axios, { AxiosResponse } from 'axios'
import { AsyncStorage } from 'react-native';

export default class AuthService {
  // Initializing important variables
  constructor() {
    this.login = this.login.bind(this)
  }

  login(username: string, pass: string){
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

  setToken = (token: string) => {
    // Saves user token to localStorage
    AsyncStorage.setItem('userToken', token)
  }

  getToken(): Promise<String|null> {
    return new Promise((resolve, rejected) =>
      AsyncStorage.getItem('userToken')
      .then( value => resolve(value))
      .catch( error => rejected(error) )
    )
  }
}

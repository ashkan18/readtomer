import React from 'react'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native'
import { bold } from 'ansi-colors';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {username: '', password: '', error: ''}
  }

  static navigationOptions = {
    title: "Login"
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        { this.state.error && <FormValidationMessage> {this.state.error} </FormValidationMessage> }
        <FormLabel> Username </FormLabel>
        <FormInput
          style={styles.base}
          textContentType="username"
          keyboardType="email-address"
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={(username) => this.setState({username})}
        />
        <FormLabel> Password </FormLabel>
        <FormInput
          secureTextEntry={true}
          style={styles.base}
          textContentType="password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Login!" onPress={this.login}/>
        <View style={styles.base}>
          <Text>
              Don't have an account? 
              <Text style={styles.link} onPress={ () => navigate('Signup')}> Signup </Text>
          </Text>
        </View>
      </View>
    )
  }

  login(_event){
    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:{
          username: this.state.username,
          password: this.state.password
        }
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw Error("Unknown username or password.")
      }
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson)
      AsyncStorage.setItem('userToken', 'responseJson.data.token')
      this.props.navigation.navigate('App')
    })
    .catch((error) => {
      console.error(error)
      this.setState({error: "Username and Password don't match. Please try again."})
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  base: {
    marginTop: 20,
    marginBottom: 10
  },
  link: {
    fontWeight: 'bold'
  },
  error:{
    height: 60,
    width: 100,
    color: 'red'
  }
})

import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {username: '', password: '', error: ''}
  }
  render() {
    console.log("hello")
    console.log(this.state.error)
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Passeword"
          onChangeText={(password) => this.setState({password})}
        />
        <Button title="Login!" onPress={this.login}/>
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
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson)
      return responseJson.movies;
    })
    .catch((error) => {
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
  input: {
    height: 60,
    width: 100
  },
  error:{
    height: 60,
    width: 100,
    color: 'red'
  }
})

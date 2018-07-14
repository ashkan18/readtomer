import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView } from 'react-native'

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props)
    this.signup = this.signup.bind(this)
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      sex: 'F',
      error: ''
    }
  }

  static navigationOptions = {
    title: "Signup"
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
        <TextInput
          style={styles.input}
          textContentType="name"
          placeholder="Name"
          autoCapitalize={'words'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={(name) => this.setState({name})}
        />
        <TextInput
          style={styles.input}
          textContentType="username"
          keyboardType="email-address"
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={styles.input}
          textContentType="email"
          keyboardType="email-address"
          placeholder="Email"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          textContentType="password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          textContentType="password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholder="Password"
          onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
        />
        <Button title="Signup!" onPress={this.signup}/>
        <View>
          <Text> Already have an account? </Text>
          <Button title="Login!" onPress={ () => navigate('Login')} />
        </View>
      </KeyboardAvoidingView>
    )
  }

  signup(_event) {
    fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:{
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          name: this.state.name,
          sex: this.state.sex
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
  input: {
    flex: 1,
    borderWidth:1
  },
  error:{
    height: 60,
    width: 100,
    color: 'red'
  }
})

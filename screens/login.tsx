import React from "react"
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import AuthService from '../services/auth_service'

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


interface State {
  username: string
  password: string
  error: string | null
}

interface Props {
  navigation: any
}

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props)
    this.login = this.login.bind(this)
    this.state = {username: '', password: '', error: null}
  }

  static navigationOptions = {
    title: "Login"
  }

  private login(){
    let authService = new AuthService
    authService.login(this.state.username, this.state.password)
    .then( _response => this.props.navigation.navigate('App') )
    .catch( _error => {
      console.log(_error)
      this.setState({error: "Username and Password don't match. Please try again."})
    })
  }

  public render() {
    const { navigate } = this.props.navigation
    return (
      <KeyboardAvoidingView style={styles.container}>
        { this.state.error !== null && <FormValidationMessage> {this.state.error} </FormValidationMessage> }
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
      </KeyboardAvoidingView>
    )
  }
}

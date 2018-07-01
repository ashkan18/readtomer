import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
   return (
      <View style={styles.container}>
        <Text style={styles.error}>
          {this.props.navigation.state.params.token}
        </Text>
      </View>
    )
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

import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default class BookForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text> {this.props.title} </Text>
        <Text> {this.props.isbn} </Text>
        <Text> {this.props.description} </Text>
        <Button title="Submit!" onPress={this.submit}/>
      </View>
    )
  }

  submit(_event) {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1
  }
})

import React from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

export default class BookInstanceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { book: this.props.navigation.getParam('book') }
  }

  render() {
    return (
      <View>
        <Text> {this.state.book.title} </Text>
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
  cover: {
    width: 200,
    height: 200
  }
})

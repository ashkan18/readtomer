import React from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

export default class ExternalBookForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text> {this.props.title} </Text>
        <Text> {this.props.isbn} </Text>
        <Text> {this.props.coverUrl} </Text>
        <Image
          style={styles.cover}
          source={{uri: this.props.coverUrl}}/>
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
  cover: {
    width: 200,
    height: 200
  }
})

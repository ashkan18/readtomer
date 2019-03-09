import React from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

interface Props {
  book: Book
}

export default class ExternalBookForm extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text> {this.props.book.title} </Text>
        <Text> {this.props.book.isbn} </Text>
        <Text> {this.props.book.coverUrl} </Text>
        <Image
          style={styles.cover}
          source={{uri: this.props.book.coverUrl}}/>
        <Text> {this.props.book.description} </Text>
        <Button title="Submit!" onPress={this.submit}/>
      </View>
    )
  }

  submit() {

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

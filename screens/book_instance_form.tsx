import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { CheckBox, Divider, Button, Text } from 'react-native-elements'
import { Location } from 'expo'
import BookService from '../services/book_service'

interface Props {
  navigation: any
}

interface State {
  book: any
  external: any
  reading: boolean
  loaning: boolean
  takeIt: boolean
  location: any
  error?: string
}

export default class BookInstanceForm extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = { book: this.props.navigation.getParam('book'), external: this.props.navigation.getParam('external'), reading: false, loaning: false, takeIt: false, location:  null}
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider style={{ backgroundColor: 'blue' }} />
        <Text h1>Condition</Text>
        <Divider style={{ backgroundColor: 'blue' }} />
          <Text h1>Offer</Text>
          <CheckBox title='Read 🧡' checked={this.state.reading} onIconPress={ () => this.setState({reading: true}) }/>
          <CheckBox title='Loan' checked={this.state.loaning} onIconPress={ () => this.setState({loaning: true}) }/>
          <CheckBox title='Take It' checked={this.state.takeIt} onIconPress={ () => this.setState({takeIt: true}) }/>
        <Button title="Lets do this!" onPress={this.submit}/>
      </View>
    )
  }

  private submit() {
    Location.getCurrentPositionAsync({accuracy: 25})
    .then( (locationData: any) => {
      let bookService = new BookService
      bookService.submitBook(locationData.coords, this.state.book.id)
      .then( _response => {
        this.props.navigation.navigate('Map')
      })
      .catch( error => {
        console.log(error)
        this.setState({error})
      })
    }).catch( error => {
      console.log(error)
      this.setState({error})
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
  cover: {
    width: 200,
    height: 200
  }
})

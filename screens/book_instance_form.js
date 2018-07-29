import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { CheckBox, Divider, Button, Text } from 'react-native-elements'
import { Location } from 'expo'

export default class BookInstanceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { book: this.props.navigation.getParam('book'), external: this.props.navigation.getParam('external'), reading: false, loaning: false, takeIt: false, location:  null}
  }

  componentDidMount(){
    this._getLocationAsync()
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

  _getLocationAsync = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({})
    this.setState({ location: currentLocation })
  }

  submit(_event) {
    let token = AsyncStorage.getItem('userToken')
    axios.post("http://192.168.1.3:4000/api/book_instance", { book_instance: { medium: 'test', offerings: 'reading',  condition: 'fair', location: this.state.location, book_id: this.state.book.id}})
    .then( response => {
      this.props.navigation.navigate('Map')
    }).catch( _error => {
      console.log(_error)
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
  cover: {
    width: 200,
    height: 200
  }
})

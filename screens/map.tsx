import React from 'react';
import { StyleSheet, Button, Platform } from 'react-native'
import { MapView, Constants, Location, Permissions } from 'expo'
import BookMapMarker from '../components/book_map_marker'
import BookService from '../services/book_service'

interface Props {
  navigation: any
}

interface State {
  locating: boolean
  region: any
  error?: string
  currentLocation: any
  bookInstances: Array<BookInstance>
  searching: boolean
}


export default class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { locating: true, region: null, currentLocation: null, bookInstances: [], searching: false}
  }

  static navigationOptions = ({ navigation }) => {
    return({
      title: "Readtome",
      headerRight: (
        navigation.getParam("postBook") && <Button
          onPress={ navigation.getParam("postBook") }
          title="📷"/>
      )
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({ postBook: this._postBook })
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        error: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        error: 'Permission to access location was denied',
      });
    }

    let currentLocation = await Location.getCurrentPositionAsync({accuracy: 25})
    this.setState({ currentLocation, locating: false, region: this._regionFromLocation(currentLocation) })
    this._fetchBooks(currentLocation)
  }

  _regionFromLocation = (location: any) => {
    return (
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    )
  }

  _fetchBooks = (location: any) => {
    let bookService = new BookService
    this.setState({searching: true})
    bookService.fetchBooks(location.coords.latitude, location.coords.longitude, "champions")
    .then( (bookInstances: Array<BookInstance>) => {
      this.setState({searching: false, bookInstances})
      this.props.navigation.navigate('App')
    }).catch( error => {
      console.log(error)
      this.setState({ searching: false, error})
    })
  }

  _postBook = () => {
    this.props.navigation.navigate('BarcodeReader')
  }

  render() {
   return (
    <MapView
      style={styles.map}
      region={this.state.region}
      showsMyLocationButton
      showsUserLocation
      loadingEnabled={this.state.locating || this.state.searching}>
      { this.state.bookInstances.map( (b) => <BookMapMarker bookInstance={b} key={b.id} />) }

    </MapView>
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
  map: {
    flex: 1
  }
})

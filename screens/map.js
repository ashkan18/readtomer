import React from 'react';
import { StyleSheet, Button, Platform } from 'react-native'
import { MapView, Constants, Location, Permissions } from 'expo'
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import BookMapMarker from '../components/book_map_marker'
import AuthService from '../services/auth_service';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { locating: true, region: null, errorMessages: null, currentLocation: null, books: [], searching: false}
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
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let currentLocation = await Location.getCurrentPositionAsync({})
    this.setState({ currentLocation, locating: false, region: this._regionFromLocation(currentLocation) })
    this._fetchBooks(currentLocation)
  }

  _regionFromLocation = (location) => {
    return (
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    )
  }

  _fetchBooks = (location) => {
    let authService = new AuthService
    this.setState({searching: true})
    axios({
      url: "https://readtome.herokuapp.com/api/",
      method: "post",
      data: {
        query: `
          query bookInstances($lat: Float, $lng: Float, $term: String, $offerings: [String] ) {
            bookInstances(lat: $lat, lng: $lng, term: $term, offerings: $offerings) {
              id
              reader {
                id
                name
                photos
              }
              book {
                id
                title
                authors {
                  name
                  id
                  bio
                }
              }
              location
            }
          }
        `,
        variables: {term: "champions", lat: location.coords.latitude, lng: location.coords.longitude }
      },
      headers: { 'Authorization': `Bearer ${authService.getToken()}`} }
    )
    .then( response => {
      this.setState({searching: false, books: response.data.data.bookInstances})
      this.props.navigation.navigate('App')
    }).catch( _error => {
      console.log(_error)
      this.setState({ searching: false, _error})
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
      { this.state.books.map( (b) => <BookMapMarker book={b} key={b.id} />) }

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

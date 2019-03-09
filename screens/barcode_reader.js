
import React from 'react'
import { Camera, Permissions } from 'expo'
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import { Text, View } from 'react-native'
import ExternalBookForm  from "../components/external_book_form"
import AuthService from '../services/auth_service'
import { AsyncStorage } from 'react-native';

export default class BarcodeReader extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    showCamera: false,
    scannedBarcode: null,
    foundedBook: null,
    error: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, showCamera, foundedBook } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} onBarCodeRead={ this.barcodeRead } >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
            </View>
          </Camera>
        </View>
      );
    }
  }

  barcodeRead = ({data}) => {
    AsyncStorage.getItem("userToken").then((token) => {
      console.log("=========>", token)
      if (this.state.scannedBarcode === null) {
        console.log("-------------------> 2", token)
        this.setState({showCamera: true})
        axios.get(`https://readtome.herokuapp.com/api/find_in_the_wild?isbn=${data}`,
        { headers: { 'Authorization': `Bearer ${token}` }})
        .then( response => {
          this.props.navigation.navigate('BookInstanceForm', { book: response.data.book, external: response.data.external })
        }).catch( _error => {
          console.log(_error)
          this.setState({_error})
        })
      }
    })
  }
}

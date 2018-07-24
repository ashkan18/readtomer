
import React from 'react'
import { Camera, Permissions } from 'expo'
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'
import { Text, View } from 'react-native'
import ExternalBookForm  from "../components/external_book_form"

export default class BarcodeReader extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    showCamera: false,
    scannedBarcode: null,
    bookData: null,
    error: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, showCamera, bookData } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else if (bookData !== null) {
      return <ExternalBookForm
        title={bookData.data.title}
        authors={bookData.data.authors}
        description={bookData.data.description}
        coverUrl={bookData.data.cover_url}
        isbn={bookData.data.isbn}/>
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
    if (this.state.scannedBarcode === null) {
      this.setState({showCamera: true})
      axios.get(`http://192.168.1.5:4000/api/find_in_the_wild?isbn=${data}`)
      .then( response => {
        if (response.data.external !== true) {
          this.props.navigation.navigate('BookInstanceForm', { book: response.data.data })
        } else {
          this.setState({ bookData: response.data.data})
        }
      }).catch( _error => {
        console.log(_error)
        this.setState({_error})
      })
    }
  }
}

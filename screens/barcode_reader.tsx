
import React from 'react'
import { Camera, Permissions } from 'expo'
import { Text, View } from 'react-native'
import BookService from '../services/book_service';

interface Props {
  navigation: any
}
interface State {
  hasCameraPermission: boolean,
  type: any,
  showCamera: boolean,
  scannedBarcode: string | null,
  error?: string
}

export default class BarcodeReader extends React.Component<Props, State> {
  state = {
    hasCameraPermission: false,
    type: Camera.Constants.Type.back,
    showCamera: false,
    scannedBarcode: null,
    foundedBook: null
  };
  bookService: BookService = new BookService

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} onBarCodeRead={this.barcodeRead} onBarCodeScanned={ this.barcodeRead } >
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

  barcodeRead = (scanned:any) => {
    if (this.state.scannedBarcode === null) {
      this.setState({showCamera: true})
      this.bookService.findBook(scanned.data)
      .then( response => {
        this.props.navigation.navigate('BookInstanceForm', { book: response.book, external: response.external })
      }).catch( error => {
        console.log(error)
        this.setState({error})
      })
    }
  }
}

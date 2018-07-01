import React from 'react';
import { Marker } from 'react-native-maps'

export default class BookMapMarker extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <Marker
        key={this.props.book.id}
        coordinate={ {latitude: this.props.book.location.coordinates[0], longitude: this.props.book.location.coordinates[1]}}
        title={this.props.book.book.title}
        description={ `🤓: ${this.props.book.user.name}`}
        />
    )
  }
}

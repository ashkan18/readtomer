import React from 'react';
import { Marker } from 'react-native-maps'

interface Props {
  bookInstance: BookInstance
}

export default class BookMapMarker extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render(){
    return (
      <Marker
        key={this.props.bookInstance.id}
        coordinate={ {latitude: this.props.bookInstance.location.coordinates[0], longitude: this.props.bookInstance.location.coordinates[1]}}
        title={this.props.bookInstance.book.title}
        description={ `🤓: ${this.props.bookInstance.user.name}`}
        />
    )
  }
}

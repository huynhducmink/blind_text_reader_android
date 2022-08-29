import React from "react";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from './Styles'
import { Image, TouchableOpacity, View } from 'react-native'
import Camera from "../Blind_app/Camera";
import MlkitOcr from 'react-native-mlkit-ocr';

export default class Blind_app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_image_uri: null
    }
    this.noImage = this.noImage.bind(this)
    this.newImage = this.newImage.bind(this)
  }

  noImage = () => {
    this.setState({ current_image_uri: null })
  }

  newImage = (uri) => {
    this.setState({ current_image_uri: uri })
  }

  ocr = async (uri) => {
    const resultFromUri = await MlkitOcr.detectFromUri(uri);
    return resultFromUri
  }

  render() {
    const current_image_uri = this.state.current_image_uri;
    if (current_image_uri) {
      console.log("result")
      console.log(this.ocr(current_image_uri))
      console.log("result end")
      return (
        <View style={styles.container}>
          <Image source={{ uri: current_image_uri }} style={{ flex: 8 }} />
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.noImage}
            style={styles.btnAlignment}>
            <Icon name="camera" size={50} color="#000" />
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <Camera newImage={this.newImage} />
      );
    };
  };
};
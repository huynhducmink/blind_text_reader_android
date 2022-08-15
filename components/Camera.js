import React from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Alert, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from './Styles'

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      takingPicture: false,
    }
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 1,
        fixOrientation: true,
        forceUpOrientation: true,
      };
      this.setState({takingPic: true});
      try {
         const data = await this.camera.takePictureAsync(options);
         this.props.newImage(data.uri)
         console.log(data)
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        this.setState({takingPic: false});
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={{ flex: 1 }}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.btnAlignment}
            onPress={this.takePicture}>
            <Icon name="camera" size={100} color="#fff" />
          </TouchableOpacity>
        </RNCamera>
      </View>
    )
  }
}


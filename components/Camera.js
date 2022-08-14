import React from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Alert, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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
         Alert.alert('Success', JSON.stringify(data));
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
          type={RNCamera.Constants.Type.back}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.btnAlignment}
          onPress={this.takePicture}>
          <Icon name="camera" size={50} color="#fff" />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  btnAlignment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});
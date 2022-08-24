import React from 'react';
import { Image, StyleSheet, Alert, TouchableOpacity, Text, View } from 'react-native';
import Styles from '../Styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default class ENGD_scene extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scene:props.scene_num
    }
    this.change_scene = this.change_scene.bind();
  }

  change_scene = () => {
    if (this.state.scene == 0){
      this.setState({ scene: this.state.scene = 1 })
    }
    else{
      this.setState({ scene: this.state.scene = 0 })
    }
  }

  render(){
    if (this.state.scene == 0){
      return (
        <View>
          <Image source={require('../../asset/ENGD_app/1.jpg')}
          style={{
            resizeMode: "cover",
            height: 400,
            width: 400
          }}
          />
          <TouchableOpacity
            style={Styles.button}
            onPress={this.change_scene}
          >
            <Text>Press Here</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return (
        <View>
          <Image source={require('../../asset/ENGD_app/2.jpg')}
          style={{
            resizeMode: "cover",
            height: 400,
            width: 400
          }}
          />
          <TouchableOpacity
            style={Styles.button}
            onPress={this.change_scene}
          >
            <Text>Press Here</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

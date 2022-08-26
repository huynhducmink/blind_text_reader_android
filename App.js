import React from 'react';
import Camera from './components/Camera_app/Camera';
import { Image, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from './components/Styles'
import ENDG_scene from './components/ENDG_app/ENDG_scene';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ENDG_scene scene_num = {1}/>
    )
  }

}















//class App extends React.Component {
//  constructor(props){
//    super(props);
//    this.state = {
//      current_image_uri: null
//    }
//    this.noImage = this.noImage.bind(this)
//    this.newImage = this.newImage.bind(this)
//  }
//
//  noImage = () => {
//    this.setState({current_image_uri: null})
//  }
//
//  newImage = (uri) => {
//    this.setState({current_image_uri: uri})
//  }
//
//  render(){
//    const current_image_uri = this.state.current_image_uri;
//    if (current_image_uri){
//      return(
//        <View style={styles.container}>
//          <Image source = {{uri: current_image_uri}} style = {{flex: 1}}/>
//          <TouchableOpacity
//            activeOpacity={1}
//            onPress={this.noImage}>
//            <Icon name="camera" size={100} color="#fff" />
//          </TouchableOpacity>
//        </View>
//      )
//    }
//    else{
//      return(
//        <Camera newImage = {this.newImage}/>
//      );
//    };
//  };
//};

export default App
import React from 'react';
import { Image, Text, View, Pressable, StatusBar, StyleSheet} from 'react-native';
import { ENDG_image } from './ENDG_image';

const starting_scene = 1;
const max_scene = 5;

export default class ENDG_story extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scene:starting_scene,
      uri: ENDG_image[starting_scene].uri
    }
    this.change_scene_back = this.change_scene_back.bind();
    this.change_scene_front = this.change_scene_front.bind();
  }

  change_scene_back = () => {
    if (this.state.scene != starting_scene){
      this.setState({ scene: this.state.scene -= 1 })
    }
    else{
      this.setState({ scene: this.state.scene = 1 })
      this.props.change_to_menu()
    }
    this.setState({uri: ENDG_image[this.state.scene].uri})
  }

  change_scene_front = () => {
    if (this.state.scene != max_scene){
      this.setState({ scene: this.state.scene += 1 })
    }
    else{
      this.setState({ scene: this.state.scene = 1 })
      this.props.change_to_end()
    }
    this.setState({uri: ENDG_image[this.state.scene].uri})
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden={true}/> */}
        <View style={styles.imagecontainer}>
          <Image style={styles.image} source={this.state.uri} />
        </View>
        <View style={styles.textcontainer}>
          <Text style={styles.text} adjustsFontSizeToFit>
            {ENDG_image[this.state.scene].text}
          </Text>
        </View>
        <View style={styles.navcontainer}>
          <Pressable onPress={() => this.change_scene_back()} style={{flex:2}}>
            <View style={styles.button}>
              <Text style={{fontSize: 25}}>
                Quay lại
              </Text>
            </View>
          </Pressable>
          <View style={styles.pagenum}>
            <Text style={{fontSize:25}}>
              {this.state.scene + "/" + max_scene}
            </Text>
          </View>
          <Pressable onPress={() => this.change_scene_front()} style={{flex:2}}>
            <View style={styles.button}>
              <Text style={{fontSize: 25}}>
                Trang tiếp
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  imagecontainer: {
    flex:5,
    backgroundColor:"#F0F0F0"
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textcontainer: {
    flex:3,
    backgroundColor:"#F0F0F0"
  },
  navcontainer: {
    flex:1,
    flexDirection:"row",
  },
  text: {
    // fontFamily:"Manuale",
    fontWeight:'bold',
    fontSize: 25,
  },
  button:{
    flex:1,
    backgroundColor:"#FFC3C3",
    borderRadius: 20,
    alignItems:"center",
    justifyContent:"center",
  },
  pagenum: {
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  }
});
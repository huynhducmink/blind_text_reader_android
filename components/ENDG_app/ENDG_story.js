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
    this.change_scene = this.change_scene.bind();
  }

  change_scene = () => {
    if (this.state.scene != max_scene){
      this.setState({ scene: this.state.scene += 1 })
    }
    else{
      this.setState({ scene: this.state.scene = 1 })
      this.props.change_to_menu()
    }
    this.setState({uri: ENDG_image[this.state.scene].uri})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Pressable style={styles.container} onPress={() => this.change_scene()}>
          <Image style={styles.image} source={this.state.uri} />
          <View style={styles.textbox}>
          <Text style={styles.text}>
            {ENDG_image[this.state.scene].text}
          </Text>
          </View>
        </Pressable>
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
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    fontWeight:'bold',
    fontSize: 20,
    paddingTop:20
  },
  textbox: {
    height: 160
  }
});
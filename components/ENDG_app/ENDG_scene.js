import React from 'react';
import { Image, Text, View, Pressable, StatusBar} from 'react-native';
import styles from './ENDG_styles';
import { ENDG_image } from './ENDG_image';


export default class ENDG_scene extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      scene:props.scene_num,
      uri: ENDG_image[props.scene_num].uri
    }
    this.change_scene = this.change_scene.bind();
  }

  change_scene = () => {
    if (this.state.scene != 5){
      this.setState({ scene: this.state.scene += 1 })
    }
    else{
      this.setState({ scene: this.state.scene = 1 })
    }
    this.setState({uri: ENDG_image[this.state.scene].uri})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}/>
        <Pressable style={styles.container} onPress={() => this.change_scene()}>
          <Image style={styles.ENDG_image} source={this.state.uri} />
          <View style={styles.ENDG_textbox}>
          <Text style={styles.ENDG_text}>
            {ENDG_image[this.state.scene].text}
          </Text>
          </View>
        </Pressable>
      </View>
    )
  }
}

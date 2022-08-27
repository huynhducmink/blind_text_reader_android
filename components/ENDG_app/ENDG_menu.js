import { resizeMode } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React from "react";
import { Text, View, StatusBar, StyleSheet, Image, TouchableWithoutFeedback} from "react-native"
import { ENDG_image } from "./ENDG_image";

export default class ENDG_menu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.background}>
          <Image source={ENDG_image[1].uri} style={styles.image}/>
        </View>
        <Text style={styles.title}>
          Ếch ngồi đáy giếng
        </Text>
        <View style={styles.buttoncontainer}>
          <TouchableWithoutFeedback onPress={() => this.props.change_to_story()}>
            <View style={styles.button}>
              <Text style={styles.button_text}>
                Đọc truyện
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.button}>
            <Text style={styles.button_text}>
              Thoát 
            </Text>
          </View>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    position:"absolute",
    top:0,
    bottom:0,
    right:0,
    left:0,
    opacity:0.7
  },
  image: {
    flex: 1,
    resizeMode:"cover",
  },
  title: {
    position:"absolute",
    top:30,
    left:100,
    right:100,
    fontSize:64,
    fontWeight:"900",
    color: "#396d3b",
    textTransform:"uppercase",
    fontFamily:"Manuale",
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    display:"flex",
    // backgroundColor:"white",
  },
  buttoncontainer: {
    position:"absolute",
    bottom:100,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    width: "100%",
    height: 180,
    // backgroundColor:"white",
  },
  button: {
    width:"80%",
    height:70,
    // backgroundColor:"white",
  },
  button_text: {
    fontSize:40,
    textTransform:"uppercase",
    fontWeight:"bold",
    fontFamily:"Manrope",
    color: "#000",
    textAlign:"center",
    justifyContent:"center",
  }
})
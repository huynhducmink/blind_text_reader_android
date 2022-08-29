import { resizeMode } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React from "react";
import { Text, View, StatusBar, StyleSheet, Image, TouchableWithoutFeedback, BackHandler} from "react-native"
import { ENDG_image } from "./ENDG_image";

export default class ENDG_menu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>
        {/* <StatusBar hidden={true}/> */}
        <View style={styles.background}>
          <Image source={ENDG_image[1].uri} style={styles.image}/>
        </View>
        <Text style={styles.title} adjustsFontSizeToFit>
          Ếch ngồi đáy giếng
        </Text>
        <View style={styles.buttoncontainer}>
          <TouchableWithoutFeedback onPress={() => this.props.change_to_story()}>
            <View style={styles.button}>
              <Text style={styles.button_text} adjustsFontSizeToFit>
                Đọc truyện
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => BackHandler.exitApp()}>
            <View style={styles.button}>
              <Text style={styles.button_text} adjustsFontSizeToFit>
                Thoát
              </Text>
            </View>
          </TouchableWithoutFeedback>
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
    top:80,
    left:0,
    right:0,
    fontSize:60,
    fontWeight:"900",
    color: "#153516",
    textTransform:"uppercase",
    fontFamily:"Manuale",
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    display:"flex",
    height: 300,
    padding:20
  },
  buttoncontainer: {
    position:"absolute",
    bottom:100,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    width: "90%",
    height: 150,
    // backgroundColor:"white",
  },
  button: {
    width:"80%",
    height:60,
    backgroundColor:"white",
    justifyContent:"center",
    opacity:0.8,
    alignItems:"center",
    borderRadius: 30,
  },
  button_text: {
    fontSize:40,
    textTransform:"uppercase",
    fontWeight:"bold",
    fontFamily:"Manrope",
    color: "#000",
    textAlign:"center",
    padding:5,
  }
})
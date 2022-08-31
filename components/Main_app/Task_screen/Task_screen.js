import React from "react";
import { 
  View, 
  Text,
  Image, 
  TextInput, 
  TouchableWithoutFeedback, 
  Keyboard,
 } from "react-native";
import styles from "./assets/Styles"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";

export default class Task_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search_text:"",
    }
    this.set_search_text = this.set_search_text.bind()
  }

  set_search_text = ( input ) => {
    this.setState({search_text:input})
  }

  render(){
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.background}>
        <View style={styles.topcontainer}>
          <Image source={require("./assets/images/menu.png")} style={styles.taskbar_icon}/>
          <Image source={require("./assets/images/note.png")} style={styles.taskbar_icon}/>
          <Image source={require("./assets/images/tick_2.png")} style={styles.taskbar_icon}/>
          <Image source={require("./assets/images/cal.png")} style={styles.taskbar_icon}/>
        </View>
        <View style={styles.searchcontainer}>
          <View style={styles.searchbar}>
            <View style={styles.searchinputcontainer}>
              <TextInput
                style={styles.input}
                onChangeText={this.set_search_text}
                value={this.search_text}
              />
            </View>
            <Image source={require("./assets/images/search.png")} style={styles.search_icon}/>
          </View>
          <View style={styles.sorticoncontainer}>
            <Image source={require("./assets/images/sort.png")} style={styles.sort_icon}/>
          </View>
        </View>
        <View style={styles.taskcontainer}>
          {<Task taskname="Meeting" tasknote="C9-410 2PM 16/08" date="16/08" time="9:00 PM"/>}
          {<Task taskname="Gửi báo cáo" tasknote="Ask about the ..." date="21/08" time="9:00 PM"/>}
          <View style={{ position: "absolute", bottom: 30, right: 30, height: 90, width: 90, borderRadius: 100, backgroundColor:"white"  }}>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

class Task extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <View style={styles.intaskcontainer}>
        <Image source={require("./assets/images/untick.png")} style={{ flex: 1, resizeMode: "contain" }} />
        <View style={{ flex: 6, height: "100%", justifyContent:"space-around" }}>
          <Text style={{height:"40%",fontSize:25, color:"black", textAlignVertical:"center",fontFamily:"Lexend Deca"}}>
            {this.props.taskname}
          </Text>
          <Text style={{height:"35%",fontSize:15, color:"gray", textAlignVertical:"center"}}>
            {this.props.tasknote}
          </Text>
        </View>
        <View style={{ flex: 2, padding:10 }}>
          <Text style={{height:"35%",fontSize:15, color:"black", textAlign:"center"}}>
            {this.props.time}
          </Text>
          <Text style={{height:"35%",fontSize:15, color:"black", textAlign:"center"}}>
            {this.props.date}
          </Text>
        </View>
      </View>
    )
  }
};
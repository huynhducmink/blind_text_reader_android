import React from "react";
import { 
  View, 
  FlatList,
  Text,
  Image, 
  TextInput, 
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
 } from "react-native";
import styles from "./assets/Styles"
import Settings from "../Setting_screen/Settings"
import {lang} from "../Languages/lang"

export default class Setting_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      language:''
    }
  }

  setting = new Settings

  componentDidMount = async () => {
    //load setting from database in this function
    let lang = await this.setting.loadLanguage()
    this.setState({language:lang})
    console.log("reload setting screen")
  }

  changeLanguage = () => {
    if (this.state.language == "en"){
      this.setState({language:"vn"})
      this.setting.setLanguage("vn")
    }
    if (this.state.language == "vn"){
      this.setState({language:"en"})
      this.setting.setLanguage("en")
    }
  } 

  render() {
    return (
      <View style={styles.background}>
        <View style={{flex:10}}>
          <Text style={{fontSize: 40, alignSelf:"center", margin: 30}}>
            {lang["setting"][this.state.language]}
          </Text>
          <Pressable onPress={() => this.changeLanguage()}>
          <View style={{width:"100%", height:60, backgroundColor:"#99D28B", borderRadius: 20, marginTop:10, justifyContent:"center",paddingLeft:20}}>
            <Text style={{fontSize:30}}>
              {lang["language"][this.state.language]}
              {this.state.language == "en" ? "  :  English" : "  :  Tiếng Việt"}
            </Text>
          </View>
          </Pressable>
          <View style={{width:"100%", height:60, backgroundColor:"#99D28B", borderRadius: 20, marginTop:10}}>
          </View>
          <View style={{width:"100%", height:60, backgroundColor:"#99D28B", borderRadius: 20, marginTop:10}}>
          </View>
        </View>
        <View style={styles.topcontainer}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("./assets/images/menu_2.png")} style={styles.notebar_icon} />
          </View>
          <Pressable onPress={() => this.props.navigation.push('Note')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image source={require("./assets/images/note.png")} style={styles.notebar_icon} />
            </View>
          </Pressable>
          <Pressable onPress={() => this.props.navigation.push('Task')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("./assets/images/tick.png")} style={styles.notebar_icon} />
          </View>
          </Pressable>
          <Pressable onPress={() => this.props.navigation.push('Calendar')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image source={require("./assets/images/cal.png")} style={styles.notebar_icon} />
            </View>
          </Pressable>
        </View>
      </View>
    )
  }
}
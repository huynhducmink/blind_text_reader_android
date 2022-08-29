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

export default class Task_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search_text:""
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
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}


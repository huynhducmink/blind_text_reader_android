import React from "react";
import { View, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableWithoutFeedback, 
  Keyboard,
 } from "react-native";

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
          <Image source={require("../assets/Task_screen/menu.png")} style={styles.taskbar_icon}/>
          <Image source={require("../assets/Task_screen/note.png")} style={styles.taskbar_icon}/>
          <Image source={require("../assets/Task_screen/tick_2.png")} style={styles.taskbar_icon}/>
          <Image source={require("../assets/Task_screen/cal.png")} style={styles.taskbar_icon}/>
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
            <Image source={require("../assets/Task_screen/search.png")} style={styles.search_icon}/>
          </View>
          <View style={styles.sorticoncontainer}>
            <Image source={require("../assets/Task_screen/sort.png")} style={styles.sort_icon}/>
          </View>
        </View>
        <View style={styles.taskcontainer}>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center'
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFC3C3',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  searchcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
  },
  searchbar: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems:'center',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  search_icon: {
    aspectRatio : 1,
    backgroundColor:"#FFFFFF",
  },
  searchinputcontainer: {
    flex:7,
  },
  input: {
    height: "100%",
    width: "100%",
    margin: 0,
    borderWidth: 0,
    paddingLeft:20,
    // backgroundColor:"red",
    fontSize: 25
  },
  sorticoncontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: "center",
  },
  sort_icon: {
    flex:1,
    width: "10%",
    aspectRatio : 1,
    backgroundColor:"#F0F0F0",
    margin:"20%"
  },
  taskcontainer: {
    flex: 8,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  taskbar_icon: {
    width: "8%",
    aspectRatio : 1
  },
})
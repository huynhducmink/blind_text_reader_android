import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default class Task_screen extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.background}>
        <View style={styles.topcontainer}>
          <Image source={require("../assets/Task_screen/tick_2.png")} style={styles.taskbar_icon}/>
          <Image source={require("../assets/Task_screen/cal.png")} style={styles.taskbar_icon}/>
          <Image source={require("../assets/Task_screen/menu.png")} style={styles.taskbar_icon}/>
          <Image source={require("../assets/Task_screen/note.png")} style={styles.taskbar_icon}/>
        </View>
        <View style={styles.searchcontainer}>
          <View style={styles.searchbar}>
            <Image source={require("../assets/Task_screen/search.png")} style={styles.search_icon}/>
          </View>
          <View style={styles.sorticoncontainer}>
            <Image source={require("../assets/Task_screen/sort.png")} style={styles.sort_icon}/>
          </View>
        </View>
        <View style={styles.taskcontainer}>
        </View>
      </View>
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
    justifyContent: 'center'
  },
  searchbar: {
    flex: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    margin: 12,
    borderRadius: 30,
  },
  search_icon: {
    flex:1,
    aspectRatio : 1,
    backgroundColor:"#000000",
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
    margin:5
  },
  taskcontainer: {
    flex: 8,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  taskbar_icon: {
    width: "10%",
    aspectRatio : 1
  },
})
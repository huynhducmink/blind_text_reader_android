import React from "react";
import { 
  View, 
  FlatList,
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
      task_list:[],
    }
    this.set_search_text = this.set_search_text.bind()
    this.add_task_list = this.add_task_list.bind()
    this.clear_task_list = this.clear_task_list.bind()
  }

  componentDidMount = () => {
    //load data from database in this function
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(1,2,3,4)
    this.add_task_list(1,2,3,4)
    this.add_task_list(5,6,7,8)
    this.add_task_list(5,6,7,8)
  }

  add_task_list = (new_task_name,new_task_note,new_task_date,new_task_time) => {
    let new_task_list = [...this.state.task_list]
    let new_single_task = {
      task_id: new_task_list.length,
      task_name: new_task_name,
      task_note: new_task_note,
      task_date: new_task_date,
      task_time: new_task_time,
    }
    new_task_list.push(new_single_task)
    this.setState(this.state.task_list=new_task_list)
  }

  clear_task_list = () => {
    this.setState(this.state.task_list = [])
  }

  set_search_text = ( input ) => {
    this.setState({search_text:input})
  }
  
  render_task = ({item}) => {
    if (String(item.task_name).search(String(this.state.search_text)) == -1 &&
      String(item.task_note).search(String(this.state.search_text)) == -1) {
      return
    }
    return (
      <Task taskname={item.task_name} tasknote={item.task_note} date={item.task_date} time={item.task_time} />
    )
  }

  render(){
    return(
      // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} touchSoundDisabled>
        <View style={styles.background}>
          <View style={styles.topcontainer}>
            <Image source={require("./assets/images/menu.png")} style={styles.taskbar_icon} />
            <Image source={require("./assets/images/note.png")} style={styles.taskbar_icon} />
            <Image source={require("./assets/images/tick_2.png")} style={styles.taskbar_icon} />
            <Image source={require("./assets/images/cal.png")} style={styles.taskbar_icon} />
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
              <Image source={require("./assets/images/search.png")} style={styles.search_icon} />
            </View>
            <View style={styles.sorticoncontainer}>
              <Image source={require("./assets/images/sort.png")} style={styles.sort_icon} />
            </View>
          </View>
          <View style={styles.taskcontainer}>
            {/* {this.state.task_list.map((task,task_index) => {
              if (String(task.task_name).search(String(this.state.search_text))==-1 && 
              String(task.task_note).search(String(this.state.search_text))==-1){
                return
              }
              return(
                <Task key={task_index} taskname={task.task_name} tasknote={task.task_note} date={task.task_date} time={task.task_time} />
              )
            })} */}
            <View style={{flex:1}}>
              <FlatList
                data={this.state.task_list}
                //renderItem={({ item }) => (<Task taskname={item.task_name} tasknote={item.task_note} date={item.task_date} time={item.task_time} />)}
                renderItem={this.render_task}
                keyExtractor={item => item.task_id}
              />
            </View>
            <View style={styles.addtaskbutton}>
              <Text style={{textAlign:'center'}}>
                Add task
              </Text>
            </View>
          </View>
        </View>
      //</TouchableWithoutFeedback>
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
        <View style={{ flex: 3, height: "100%", justifyContent:"space-around", paddingLeft:3 }}>
          <Text style={{height:"40%",fontSize:25, color:"black", textAlignVertical:"center",fontFamily:"Lexend Deca"}}>
            {this.props.taskname}
          </Text>
          <Text style={{height:"35%",fontSize:15, color:"gray", textAlignVertical:"center"}}>
            {this.props.tasknote}
          </Text>
        </View>
        <View style={{ flex: 1, padding:10 }}>
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
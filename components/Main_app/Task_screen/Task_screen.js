import React from "react";
import { 
  View, 
  FlatList,
  Text,
  Image, 
  TextInput, 
  Pressable,
 } from "react-native";
import styles from "./assets/Styles"
import uuid from 'react-native-uuid';

export default class Task_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search_text:"",
      task_list:[],
      task_to_edit:{},
      screen:"task_view",
    }
    this.add_task_list = this.add_task_list.bind()
    this.clear_task_list = this.clear_task_list.bind()
    this.set_search_text = this.set_search_text.bind()
    this.change_to_task_view = this.change_to_task_view.bind()
    this.change_to_task_edit = this.change_to_task_edit.bind()
    this.update_task_after_edit = this.update_task_after_edit.bind()
    this.render_task = this.render_task.bind()
  }

  componentDidMount = () => {
    //load data from database in this function
    this.add_task_list("Minh",2,3,4)
    this.add_task_list(5,6,7,8)
    this.update_task_after_edit({
      task_id: uuid.v4(),
      task_name: "new",
      task_note: "new",
      task_date: "new",
      task_time: "new",
    })
    this.add_task_list(5,6,7,8)
  }

  add_task_list = (new_task_name,new_task_note,new_task_date,new_task_time) => {
    let new_task_list = [...this.state.task_list]
    let new_single_task = {
      task_id: uuid.v4(),
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

  change_to_task_view = () => {
    this.setState({screen:"task_view"})
  }

  change_to_task_edit = (id_) => {
    if (id_ === "new"){
      this.setState(this.state.task_to_edit =  {
        task_id:uuid.v4(),
        task_name: "",
        task_note: "",
        task_date: "",
        task_time: "",
      })
    }
    else{
      let task_ = {}
      for (let i = 0; i < this.state.task_list.length; i++) {
        if (id_ === this.state.task_list[i].task_id) {
          task_ = {...this.state.task_list[i]}
          return
        }
      }
      this.setState(this.state.task_to_edit = task_)
    }
    console.log(this.state.task_to_edit)
    this.setState({screen:"task_edit"})
  }

  update_task_after_edit = (Task) =>{
    for(let i = 0; i < this.state.task_list.length;i++){
      if (Task.task_id === this.state.task_list[i].task_id){
        this.setState(this.state.task_list[i] = Task)
        return
      }
    }
    this.add_task_list(Task.task_name,Task.task_note,Task.task_date,Task.task_time)
    return
  }
  
  render_task = ({item}) => {
    if (String(item.task_name).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1 &&
      String(item.task_note).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1) {
      return
    }
    return (
      Task_component(item.task_name,item.task_note,item.task_date,item.task_time)
    )
  }

  render() {
    let reverse_task_list = this.state.task_list.reverse()
    if (this.state.screen === "task_edit"){
      return (
        <View style={styles.background}>
        </View>
      )
    }
    if (this.state.screen === "task_view"){
      return (
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
            <View style={{ flex: 1 }}>
              <FlatList
                data={reverse_task_list}
                renderItem={this.render_task}
                keyExtractor={item => item.task_id}
              />
            </View>
            <Pressable onPress={() => this.change_to_task_edit("new")}>
              <View style={styles.addtaskbutton}>
                <Text style={{ textAlign: 'center' }}>
                  Add task
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )
    }
  }
}

const Task_component = (taskname, tasknote, time, date) => {
  return (
    <View style={styles.intaskcontainer}>
      <Image source={require("./assets/images/untick.png")} style={{ flex: 1, resizeMode: "contain" }} />
      <View style={{ flex: 3, height: "100%", justifyContent: "space-around", paddingLeft: 3 }}>
        <Text style={{ height: "40%", fontSize: 25, color: "black", textAlignVertical: "center", fontFamily: "Lexend Deca" }}>
          {taskname}
        </Text>
        <Text style={{ height: "35%", fontSize: 15, color: "gray", textAlignVertical: "center" }}>
          {tasknote}
        </Text>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ height: "35%", fontSize: 15, color: "black", textAlign: "center" }}>
          {time}
        </Text>
        <Text style={{ height: "35%", fontSize: 15, color: "black", textAlign: "center" }}>
          {date}
        </Text>
      </View>
    </View>
  )
}
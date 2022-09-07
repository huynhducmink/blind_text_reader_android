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

  task_list = []
  task_to_edit = {}
  search_text = ""

  componentDidMount = () => {
    //load data from database in this function
    this.add_task_list("test_name_1","test_note_1","date_1","time_1")
    this.add_task_list("test_name_2","test_note_2","date_2","time_2")
    this.add_task_list("test_name_3","test_note_3","date_3","time_3")
    this.add_task_list("test_name_4","test_note_4","date_4","time_4")
    this.add_task_list("test_name_5","test_note_5","date_5","time_5")
    this.add_task_list("test_name_6","test_note_6","date_6","time_6")
    this.add_task_list("test_name_7","test_note_7","date_7","time_7")
  }

  add_task_list = (new_task_name,new_task_note,new_task_date,new_task_time) => {
    let new_single_task = {
      task_id: uuid.v4(),
      task_name: new_task_name.toString(),
      task_note: new_task_note.toString(),
      task_date: new_task_date.toString(),
      task_time: new_task_time.toString(),
    }
    this.task_list.push(new_single_task)
    this.setState({task_list:this.task_list})
  }

  clear_task_list = () => {
    this.task_list = []
    this.setState({task_list:this.task_list})
  }

  set_search_text = ( input ) => {
    this.search_text = input
    this.setState({search_text:this.search_text})
  }

  change_to_task_view = () => {
    this.update_task_after_edit()
    this.setState({screen:"task_view"})
  }

  change_to_task_edit = (id_) => {
    if (id_ === "new"){
      this.task_to_edit =  {
        task_id:uuid.v4(),
        task_name: "",
        task_note: "",
        task_date: "",
        task_time: "",
      }
      this.setState({task_to_edit:this.task_to_edit})
    }
    else{
      for (let i = 0; i < this.task_list.length; i++) {
        if (id_ == this.task_list[i].task_id) {
          this.task_to_edit = {...this.task_list[i]}
          break
        }
      }
      this.setState({task_to_edit:this.task_to_edit})
    }
    this.setState({screen:"task_edit"})
  }

  update_task_after_edit = () =>{
    if (this.task_to_edit.task_name == "" &&
    this.task_to_edit.task_note == "" &&
    this.task_to_edit.task_date == "" &&
    this.task_to_edit.task_time == "" ){return}
    for(let i = 0; i < this.task_list.length;i++){
      if (this.task_to_edit.task_id === this.task_list[i].task_id){
        this.task_list[i] = this.task_to_edit
        this.setState({task_list:this.task_list})
        return
      }
    }
    this.add_task_list(this.task_to_edit.task_name,this.task_to_edit.task_note,this.task_to_edit.task_date,this.task_to_edit.task_time)
    return
  }
  
  render_task = ({item}) => {
    if (String(item.task_name).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1 &&
      String(item.task_note).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1) {
      return
    }
    return (
      <Pressable onPress={() => this.change_to_task_edit(item.task_id)}>
        {Task_component(item.task_name,item.task_note,item.task_date,item.task_time)}
      </Pressable>
    )
  }

  render() {
    let reverse_task_list = [...this.task_list].reverse()
    if (this.state.screen === "task_edit"){
      return (
        <View style={styles.background}>
          <TextInput
            style={styles.inputtemp}
            onChangeText={(input) => {
              this.task_to_edit.task_name = input
              this.setState({task_to_edit:this.task_to_edit})
            }
            }
            value={this.state.task_to_edit.task_name}
          />
          <TextInput
            style={styles.inputtemp}
            onChangeText={(input) => {
              this.task_to_edit.task_note = input
              this.setState({task_to_edit:this.task_to_edit})
            }
            }
            value={this.state.task_to_edit.task_note}
          />
          <TextInput
            style={styles.inputtemp}
            onChangeText={(input) => {
              this.task_to_edit.task_date = input
              this.setState({task_to_edit:this.task_to_edit})
            }
            }
            value={this.state.task_to_edit.task_date}
          />
          <TextInput
            style={styles.inputtemp}
            onChangeText={(input) => {
              this.task_to_edit.task_time = input
              this.setState({task_to_edit:this.task_to_edit})
            }
            }
            value={this.state.task_to_edit.task_time}
          />
          <Pressable onPress={() => this.change_to_task_view()}>
            <View style={styles.addtaskbutton}>
              <Text style={{ textAlign: 'center' }}>
                Done
              </Text>
            </View>
          </Pressable>
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
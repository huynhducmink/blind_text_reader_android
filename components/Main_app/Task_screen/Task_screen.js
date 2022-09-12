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
import uuid from 'react-native-uuid';
import DatePicker from "react-native-date-picker";

export default class Task_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search_text:"",
      task_list:[],
      task_to_edit:{},
      screen:"task_edit",
      current_task_date: new Date(),
      open_date_picker: false,
    }
    this.add_task_list = this.add_task_list.bind()
    this.clear_task_list = this.clear_task_list.bind()
    this.set_search_text = this.set_search_text.bind()
    this.change_to_task_view = this.change_to_task_view.bind()
    this.return_to_task_view = this.return_to_task_view.bind()
    this.change_to_task_edit = this.change_to_task_edit.bind()
    this.update_task_after_edit = this.update_task_after_edit.bind()
    this.render_task = this.render_task.bind()
    this.update_current_task_date = this.update_current_task_date.bind()
    this.update_open_date_picker = this.update_open_date_picker.bind()
  }

  task_list = []
  task_to_edit = {
    task_id:"",
    task_note:"",
    task_date:"",
    task_time:""
  }
  search_text = ""

  componentDidMount = () => {
    //load data from database in this function
    this.add_task_list("test_name_1\ntest_note_1","date_1","time_1")
    this.add_task_list("test_name_2\ntest_note_2","date_2","time_2")
    this.add_task_list("test_name_3\ntest_note_3","date_3","time_3")
    this.add_task_list("test_name_4\ntest_note_4","date_4","time_4")
    this.add_task_list("test_name_5\ntest_note_5","date_5","time_5")
    this.add_task_list("test_name_6\ntest_note_6","date_6","time_6")
    this.add_task_list("test_name_7\ntest_note_7","date_7","time_7")
  }

  add_task_list = (new_task_note,new_task_date,new_task_time) => {
    let new_single_task = {
      task_id: uuid.v4(),
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

  return_to_task_view = () => {
    this.setState({screen:"task_view"})
  }

  change_to_task_edit = (id_) => {
    if (id_ === "new"){
      this.task_to_edit =  {
        task_id:uuid.v4(),
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
    if ( this.task_to_edit.task_note == "" &&
    this.task_to_edit.task_date == "" &&
    this.task_to_edit.task_time == "" ){return}
    for(let i = 0; i < this.task_list.length;i++){
      if (this.task_to_edit.task_id === this.task_list[i].task_id){
        this.task_list[i] = this.task_to_edit
        this.setState({task_list:this.task_list})
        return
      }
    }
    this.add_task_list(this.task_to_edit.task_note,this.task_to_edit.task_date,this.task_to_edit.task_time)
    return
  }

  update_current_task_date = (Date) => {
    this.setState({current_task_date:Date})
  }

  update_open_date_picker = (boolinput) => {
    this.setState({open_date_picker:boolinput})
  }
  
  render_task = ({item}) => {
    if ( String(item.task_note).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1) {
      return
    }
    return (
      <Pressable onPress={() => this.change_to_task_edit(item.task_id)}>
        {Task_component(item.task_note,item.task_date,item.task_time)}
      </Pressable>
    )
  }

  render() {
    let reverse_task_list = [...this.task_list].reverse()
    if (this.state.screen === "task_edit") {
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.background}>
            <View style={styles.addtasktopbar}>
              <Pressable onPress={() => this.return_to_task_view()} style={{ flexDirection: "row" }}>
                <Image source={require("./assets/images/arrow-left.png")} />
                <Text style={{ fontSize: 20 }}>
                  Return
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 7, alignItems: "stretch" }}>
              <TextInput
                multiline
                style={{ backgroundColor: "pink", textAlignVertical: "top", fontSize: 20, flex: 1 }}
                onChangeText={(input) => {
                  this.task_to_edit.task_note = input
                  this.setState({ task_to_edit: this.task_to_edit })
                }
                }
                value={this.state.task_to_edit.task_note}
              />
            </View>
            <View style={{ flex: 4, flexDirection: "row" }}>
              <View style={{ flex: 4 }}>
                <Pressable onPress={() => this.update_open_date_picker(true)}>
                  <View style={{ height: 50, backgroundColor: "pink", margin: 10, borderRadius: 10, justifyContent:"center" }}>
                    <Text style={{fontSize:20, fontWeight:"bold", textAlignVertical:"center"}}>
                      {this.state.current_task_date.getHours()+":"+
                      this.state.current_task_date.getMinutes()
                      }
                    </Text>
                  </View>
                </Pressable>
              </View>
              <DatePicker
                modal
                open={this.state.open_date_picker}
                date={this.state.current_task_date}
                onConfirm={(date) => {
                  this.update_open_date_picker(false)
                  this.update_current_task_date(date)
                }}
                onCancel={() => {
                  this.update_open_date_picker(false)
                }}
              />
              <View style={{ flex: 2 }}></View>
            </View>
            <Pressable onPress={() => this.change_to_task_view()}>
              <View style={styles.donetaskbutton}>
                <Text style={{ textAlign: 'center' }}>
                  Done
                </Text>
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    if (this.state.screen === "task_view"){
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                <View onStartShouldSetResponder={() => true}>
                <FlatList
                  data={reverse_task_list}
                  renderItem={this.render_task}
                  keyExtractor={item => item.task_id}
                />
                </View>
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
        </TouchableWithoutFeedback>
      )
    }
  }
}

const Task_component = (tasknote, time, date) => {
  return (
    <View style={styles.intaskcontainer}>
      <Image source={require("./assets/images/untick.png")} style={{ flex: 1, resizeMode: "contain" }} />
      <View style={{ flex: 3, height: "100%", justifyContent: "space-around", paddingLeft: 3 }}>
        <Text style={{ height: "40%", fontSize: 25, color: "black", textAlignVertical: "center", fontFamily: "Lexend Deca" }}>
          {tasknote.split("\n",2)[0]}
        </Text>
        <Text style={{ height: "35%", fontSize: 15, color: "gray", textAlignVertical: "center" }}>
          {tasknote.split("\n",2)[1]}
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
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
import DB from "../Database/Task_database";

export default class Task_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search_text:"",
      task_list:[],
      task_to_edit:{},
      screen:"task_view",
      open_date_picker: false,
    }
    this.add_task_list = this.add_task_list.bind()
    this.add_task_list_date = this.add_task_list_date.bind()
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
    task_id: "",
    task_note:"",
    task_min: null,
    task_hour: null,
    task_day: null,
    task_month: null,
    task_year: null,
  }
  search_text = ""
  db = new DB

  componentDidMount = async () => {
    //load data from database in this function
    try {
      let init_task = [{ task_id: uuid.v4().toString(), task_note: "Hello\nworld", task_min: 1, task_hour: 1, task_day: 1, task_month: 1, task_year: 2022 }]
      let task_db = await this.db.getDBconnection()
      // await this.db.deleteTasklist(task_db)
      await this.db.createTable(task_db)
      this.task_list = await this.db.getTasklist(task_db)
      if (this.task_list.length){
        this.setState({task_list:this.task_list})
      }
      else{
        await this.db.saveToTasklist(task_db,init_task)
        this.task_list = init_task
        this.setState({task_list:init_task})
      }
    }
    catch(error){
      console.error(error)
    }
  }

  add_task_list = async (note,min,hour,day,month,year) => {
    let new_single_task = {
      task_id: uuid.v4(),
      task_note: note,
      task_min: min,
      task_hour: hour,
      task_day: day,
      task_month: month,
      task_year: year,
    }
    this.task_list.push(new_single_task)
    let task_db = await this.db.getDBconnection()
    await this.db.saveToTasklist(task_db,this.task_list)
    this.setState({task_list:this.db.getTasklist(task_db)})
    this.setState({task_list:this.task_list})
  }

  add_task_list_date = async (note,date) => {
    let new_single_task = {
      task_id: uuid.v4(),
      task_note: note,
      task_min: date.getMinutes(),
      task_hour: date.getHours(),
      task_day: date.getDate(),
      task_month: date.getMonth()+1,
      task_year: date.getFullYear(),
    }
    this.task_list.push(new_single_task)
    let task_db = await this.db.getDBconnection()
    await this.db.saveToTasklist(task_db,this.task_list)
    this.setState({task_list:this.db.getTasklist(task_db)})
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
        task_min: null,
        task_hour: null,
        task_day: null,
        task_month: null,
        task_year: null,
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

  update_task_after_edit = async () =>{
    if ( this.task_to_edit.task_note == ""){return}
    for(let i = 0; i < this.task_list.length;i++){
      if (this.task_to_edit.task_id === this.task_list[i].task_id){
        this.task_list[i] = this.task_to_edit
        // this.setState({task_list:this.task_list})
        let task_db = await this.db.getDBconnection()
        await this.db.saveToTasklist(task_db,this.task_list)
        this.setState({task_list:this.db.getTasklist(task_db)})
        return
      }
    }
    this.add_task_list(this.task_to_edit.task_note,this.task_to_edit.task_min,this.task_to_edit.task_hour,this.task_to_edit.task_day,this.task_to_edit.task_month,this.task_to_edit.task_year)
    return
  }

  update_current_task_date = (Date) => {
    this.task_to_edit.task_min = Date.getMinutes()
    this.task_to_edit.task_hour = Date.getHours()
    this.task_to_edit.task_day = Date.getDate()
    this.task_to_edit.task_month = Date.getMonth()+1
    this.task_to_edit.task_year = Date.getFullYear()
    this.setState({task_to_edit:this.task_to_edit})
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
        {Task_component(item.task_note,item.task_min,item.task_hour,item.task_day,item.task_month,item.task_year)}
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
                <Image source={require("./assets/images/arrow-left.png")}/>
                <Text style={{ fontSize: 20 }}>
                  Return
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 7, alignItems: "stretch" }}>
              <TextInput
                multiline
                style={{ backgroundColor: "#99D28B", textAlignVertical: "top", fontSize: 20, flex: 1 }}
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
                  <View style={{ height: 50, backgroundColor: "#99D28B", margin: 10, borderRadius: 10, justifyContent:"flex-start", flexDirection:"row", alignItems:"center" }}>
                    <Image source={require("./assets/images/clock.png")} style={{margin:20}}  />
                    <Text style={{fontSize:20, fontWeight:"bold", textAlignVertical:"center"}}>
                      { this.task_to_edit.task_min == null ? "Add reminder" :
                      this.state.task_to_edit.task_day+"/"+
                      this.state.task_to_edit.task_month+"   "+
                      this.state.task_to_edit.task_hour+":"+
                      this.state.task_to_edit.task_min 
                      }
                    </Text>
                  </View>
                </Pressable>
              </View>
              <DatePicker
                modal
                open={this.state.open_date_picker}
                date={this.state.task_to_edit.task_date == null ? new Date() : this.state.task_to_edit.task_date}
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
            <View style={styles.topcontainer}>
              <Image source={require("./assets/images/menu.png")} style={styles.taskbar_icon} />
              <Image source={require("./assets/images/note.png")} style={styles.taskbar_icon} />
              <Image source={require("./assets/images/tick_2.png")} style={styles.taskbar_icon} />
              <Image source={require("./assets/images/cal.png")} style={styles.taskbar_icon} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }
}

const Task_component = (note,min,hour,day,month,year) => {
  let tasktitle = note.split("\n")[0]
  let taskbody = note.split("\n")[1]
  return (
    <View style={styles.intaskcontainer}>
      <Image source={require("./assets/images/untick.png")} style={{ flex: 1, resizeMode: "contain" }} />
      <View style={{ flex: 3, height: "100%", justifyContent: "space-around", paddingLeft: 3 }}>
        <Text style={{ height: "40%", fontSize: 25, color: "black", textAlignVertical: "center", fontFamily: "Lexend Deca" }}>
          {tasktitle}
        </Text>
        <Text style={{ height: "35%", fontSize: 15, color: "gray", textAlignVertical: "center" }}>
          {taskbody}
        </Text>
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ height: "35%", fontSize: 15, color: "black", textAlign: "center" }}>
          {hour+":"+min}
        </Text>
        <Text style={{ height: "35%", fontSize: 15, color: "black", textAlign: "center" }}>
          {day+"/"+month}
        </Text>
      </View>
    </View>
  )
}
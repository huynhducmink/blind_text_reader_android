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
import noteDB from "../Database/Note_database";

export default class Note_screen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      search_text:"",
      note_list:[],
      note_to_edit:{},
      screen:"note_view",
    }
    this.add_note_list = this.add_note_list.bind()
    this.clear_note_list = this.clear_note_list.bind()
    this.set_search_text = this.set_search_text.bind()
    this.change_to_note_view = this.change_to_note_view.bind()
    this.return_to_note_view = this.return_to_note_view.bind()
    this.change_to_note_edit = this.change_to_note_edit.bind()
    this.update_note_after_edit = this.update_note_after_edit.bind()
    this.render_note = this.render_note.bind()
  }

  note_list = []
  note_to_edit = {
    note_id: "",
    note_title: "",
    note_note:"",
  }
  search_text = ""
  db = new noteDB

  componentDidMount = async () => {
    //load data from database in this function
    try {
      let init_note = [{ note_id: uuid.v4().toString(), note_title: "Welcome to easy note", note_note: ""}]
      let note_db = await this.db.getDBconnection()
      // await this.db.deletenotelist(note_db)
      await this.db.createtable(note_db)
      this.note_list = await this.db.getnotelist(note_db)
      if (this.note_list.length){
        this.setState({note_list:this.note_list})
      }
      else{
        await this.db.savetonotelist(note_db,init_note)
        this.note_list = init_note
        this.setState({note_list:init_note})
      }
    }
    catch(error){
      console.error(error)
    }
  }

  add_note_list = async (title,note) => {
    let new_single_note = {
      note_id: uuid.v4(),
      note_title: title,
      note_note: note,
    }
    this.note_list.push(new_single_note)
    let note_db = await this.db.getDBconnection()
    await this.db.savetonotelist(note_db,this.note_list)
    this.setState({note_list:this.db.getnotelist(note_db)})
    this.setState({note_list:this.note_list})
  }

  add_note_list_date = async (title,note,date) => {
    let new_single_note = {
      note_id: uuid.v4(),
      note_title: title,
      note_note: note,
    }
    this.note_list.push(new_single_note)
    let note_db = await this.db.getDBconnection()
    await this.db.savetonotelist(note_db,this.note_list)
    this.setState({note_list:this.db.getnotelist(note_db)})
    this.setState({note_list:this.note_list})
  }

  clear_note_list = () => {
    this.note_list = []
    this.setState({note_list:this.note_list})
  }

  set_search_text = ( input ) => {
    this.search_text = input
    this.setState({search_text:this.search_text})
  }

  change_to_note_view = () => {
    this.update_note_after_edit()
    this.setState({screen:"note_view"})
  }

  return_to_note_view = () => {
    this.setState({screen:"note_view"})
  }

  change_to_note_edit = (id_) => {
    if (id_ === "new"){
      this.note_to_edit =  {
        note_id:uuid.v4(),
        note_title: "",
        note_note: "",
      }
      this.setState({note_to_edit:this.note_to_edit})
    }
    else{
      for (let i = 0; i < this.note_list.length; i++) {
        if (id_ == this.note_list[i].note_id) {
          this.note_to_edit = {...this.note_list[i]}
          break
        }
      }
      this.setState({note_to_edit:this.note_to_edit})
    }
    this.setState({screen:"note_edit"})
  }

  update_note_after_edit = async () =>{
    if ( this.note_to_edit.note_title == "" && this.note_to_edit.note_note == ""){return}
    for(let i = 0; i < this.note_list.length;i++){
      if (this.note_to_edit.note_id === this.note_list[i].note_id){
        this.note_list[i] = this.note_to_edit
        let note_db = await this.db.getDBconnection()
        await this.db.savetonotelist(note_db,this.note_list)
        this.setState({note_list:this.db.getnotelist(note_db)})
        return
      }
    }
    this.add_note_list(this.note_to_edit.note_title,this.note_to_edit.note_note,this.note_to_edit)
    return
  }
  
  render_note = ({item}) => {
    if ( String(item.note_title).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1 &&
    String(item.note_note).toLowerCase().search(String(this.state.search_text).toLowerCase()) == -1) {
      return
    }
    let note_note_single_line = item.note_note.split("/n")[0]
    return (
      <View style={styles.innotecontainer}>
        <Pressable onPress={() => this.change_to_note_edit(item.note_id)} style={{ flex: 5 }}>
          <View style={{ flex: 3, height: "100%", justifyContent: "space-around", paddingLeft: 40 }}>
            <Text numberOfLines={1} style={{ height: "50%", color: "black", textAlignVertical: "center", fontFamily: "Lexend Deca" }}>
              {item.note_title}
            </Text>
            <Text numberOfLines={1} style={{ height: "50%", color: "gray", textAlignVertical: "center" }}>
              {note_note_single_line}
            </Text>
          </View>
        </Pressable>
      </View>
    )
  }

  render() {
    let reverse_note_list = [...this.note_list].reverse()
    if (this.state.screen === "note_edit") {
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.background}>
            <View style={styles.addnotetopbar}>
              <Pressable onPress={() => this.return_to_note_view()} style={{ flexDirection: "row" }}>
                <Image source={require("./assets/images/arrow-left.png")}/>
                <Text style={{ fontSize: 20 }}>
                  Return
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 7, alignItems: "stretch" }}>
              <TextInput
                style={{ includeFontPadding:false, backgroundColor: "#99D28B", textAlignVertical: "center", fontSize: 40, flex: 1, marginBottom:10, borderRadius: 10 }}
                onChangeText={(input) => {
                  this.note_to_edit.note_title = input
                  this.setState({ note_to_edit: this.note_to_edit })
                }
                }
                placeholder="note title"
                value={this.state.note_to_edit.note_title}
              />
              <TextInput
                multiline
                style={{ backgroundColor: "#99D28B", textAlignVertical: "top", fontSize: 30, flex: 8, borderRadius: 10 }}
                onChangeText={(input) => {
                  this.note_to_edit.note_note = input
                  this.setState({ note_to_edit: this.note_to_edit })
                }
                }
                placeholder="note note"
                value={this.state.note_to_edit.note_note}
              />
            </View>
            <View style={{ flex: 4, flexDirection: "row" }}>
              <View style={{ flex: 4 }}>
              </View>
              <View style={{ flex: 2 }}></View>
            </View>
            <Pressable onPress={() => this.change_to_note_view()}>
              <View style={styles.donenotebutton}>
                <Text style={{ textAlign: 'center' }}>
                  Done
                </Text>
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    if (this.state.screen === "note_view"){
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
            <View style={styles.notecontainer}>
              <View style={{ flex: 1 }}>
                <View onStartShouldSetResponder={() => true}>
                <FlatList
                  data={reverse_note_list}
                  renderItem={this.render_note}
                  keyExtractor={item => item.note_id}
                />
                </View>
              </View>
              <Pressable onPress={() => this.change_to_note_edit("new")}>
                <View style={styles.addnotebutton}>
                  <Text style={{ textAlign: 'center' }}>
                    Add note
                  </Text>
                </View>
              </Pressable>
            </View>
            <View style={styles.topcontainer}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={require("./assets/images/menu.png")} style={styles.notebar_icon} />
              </View>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={require("./assets/images/note_2.png")} style={styles.notebar_icon} />
              </View>
              <Pressable onPress={() => this.props.navigation.navigate('Task')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <Image source={require("./assets/images/tick.png")} style={styles.notebar_icon} />
                </View>
              </Pressable>
              <Pressable onPress={() => this.props.navigation.navigate('Calendar')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={require("./assets/images/cal.png")} style={styles.notebar_icon} />
              </View>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }
}
import React from "react";
import Note_screen from "./Note_screen/Note_screen";
import Task_screen from "./Task_screen/Task_screen";

export default class Main_app extends React.Component{
  constructor(props){
    super(props)

    this.state={
      screen:"task",
    }
    this.change_to_task_screen = this.change_to_task_screen.bind()
    this.change_to_note_screen = this.change_to_note_screen.bind()
  }

  change_to_task_screen = () => {
    this.setState({screen:"task"})
  }

  change_to_note_screen = () => {
    this.setState({screen:"note"})
  }

  render(){
    if (this.state.screen === "task"){
      return (
        <Task_screen change_to_note_screen={this.change_to_note_screen} />
      )
    }
    if (this.state.screen === "note"){
      return (
        <Note_screen change_to_task_screen={this.change_to_task_screen}/>
      )
    }
  }
}
import React from "react";
import Note_screen from "./Note_screen/Note_screen";
import Task_screen from "./Task_screen/Task_screen";
import Calendar_screen from "./Calendar_screen/calendar_screen";

export default class Main_app extends React.Component{
  constructor(props){
    super(props)

    this.state={
      screen:"note",
    }
    this.change_to_task_screen = this.change_to_task_screen.bind()
    this.change_to_note_screen = this.change_to_note_screen.bind()
    this.change_to_calendar_screen = this.change_to_calendar_screen.bind()
  }

  change_to_task_screen = () => {
    this.setState({screen:"task"})
  }

  change_to_note_screen = () => {
    this.setState({screen:"note"})
  }

  change_to_calendar_screen = () => {
    this.setState({screen:"calendar"})
  }

  render(){
    if (this.state.screen === "task"){
      return (
        <Task_screen change_to_note_screen={this.change_to_note_screen} change_to_calendar_screen={this.change_to_calendar_screen}/>
      )
    }
    if (this.state.screen === "note"){
      return (
        <Note_screen change_to_task_screen={this.change_to_task_screen} change_to_calendar_screen={this.change_to_calendar_screen}/>
      )
    }
    if (this.state.screen === "calendar"){
      return (
        <Calendar_screen change_to_task_screen={this.change_to_task_screen} change_to_note_screen={this.change_to_note_screen}/>
      )
    }
  }
}
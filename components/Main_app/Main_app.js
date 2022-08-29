import React from "react";
import Task_screen from "./Task_screen/Task_screen";

export default class Main_app extends React.Component{
  constructor(props){
    super(props)

    this.state={
      screen:"task",
    }
    this.change_screen = this.change_screen.bind()
  }

  change_screen = () => {

  }

  render(){
    if (this.state.screen === "task"){
      return (
        <Task_screen />
      )
    }
  }
}
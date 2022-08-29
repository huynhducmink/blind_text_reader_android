import React from "react";
import { Text } from "react-native";
import ENDG_story from "./ENDG_story";
import ENDG_menu from "./ENDG_menu";
import ENDG_end from "./ENDG_end";

export default class ENDG_app extends React.Component{
  constructor(props){
    super(props);
    this.state={
      screen:"menu"
    }
    this.change_to_menu = this.change_to_menu.bind();
    this.change_to_story = this.change_to_story.bind();
    this.change_to_end = this.change_to_end.bind();
  }

  change_to_menu = () =>{
    this.setState({screen:"menu"})
  }

  change_to_story = () =>{
    this.setState({screen:"story"})
  }

  change_to_end = () =>{
    this.setState({screen:"end"})
  }

  render(){
    if (this.state.screen === "menu"){
      return (
        <ENDG_menu change_to_story={this.change_to_story} />
      )
    }
    if (this.state.screen === "story"){
      return(
        <ENDG_story change_to_end={this.change_to_end}
                    change_to_menu={this.change_to_menu} />
      )
    }
    if (this.state.screen === "end"){
      return (
        <ENDG_end change_to_menu={this.change_to_menu} />
      )
    }
    else{
      return(
        console.log("Error in menu screen")
      )
    }
  }

}
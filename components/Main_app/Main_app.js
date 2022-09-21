import React from "react";
import Note_screen from "./Note_screen/Note_screen";
import Task_screen from "./Task_screen/Task_screen";
import Calendar_screen from "./Calendar_screen/Calendar_screen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class Main_app extends React.Component{
  constructor(props){
    super(props)
  }

  Stack = createNativeStackNavigator();

  render(){
    return(
      <NavigationContainer>
        <this.Stack.Navigator>
          <this.Stack.Screen name="Task" component={Task_screen} options={{headerShown: false}}/>
          <this.Stack.Screen name="Note" component={Note_screen} options={{headerShown: false}}/>
          <this.Stack.Screen name="Calendar" component={Calendar_screen} options={{headerShown: false}}/>
        </this.Stack.Navigator>
      </NavigationContainer>
    )
  }
}
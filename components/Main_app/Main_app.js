import React from "react";
import Note_screen from "./Note_screen/Note_screen";
import Task_screen from "./Task_screen/Task_screen";
import Calendar_screen from "./Calendar_screen/Calendar_screen";
import Setting_screen from "./Setting_screen/Setting_screen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from "react-native-push-notification";

export default class Main_app extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  
  createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "esn-channel-id", // (required)
        channelName: "My channel", // (required)
      },
    );
  }

  Stack = createNativeStackNavigator();

  componentDidMount = async () => {
    this.createChannels()
  }

  render(){
    return(
      <NavigationContainer>
        <this.Stack.Navigator>
          <this.Stack.Screen name="Task" component={Task_screen} options={{headerShown: false}}/>
          <this.Stack.Screen name="Note" component={Note_screen} options={{headerShown: false}}/>
          <this.Stack.Screen name="Calendar" component={Calendar_screen} options={{headerShown: false}}/>
          <this.Stack.Screen name="Setting" component={Setting_screen} options={{headerShown: false}}/>
        </this.Stack.Navigator>
      </NavigationContainer>
    )
  }
}
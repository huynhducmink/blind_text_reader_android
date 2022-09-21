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
import styles from "./assets/Styles";
import noteDB from "../Database/Note_database";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class Calendar_screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={{ flex: 10 }}>
          <Calendar
            // Initially visible month. Default = now
            // initialDate={'2012-03-01'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={direction => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={false}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={false}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={date => {
              /*Return JSX*/
            }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </View>
        <View style={styles.topcontainer}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("./assets/images/menu.png")} style={styles.notebar_icon} />
          </View>
          <Pressable onPress={() => this.props.navigation.navigate('Note')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("./assets/images/note.png")} style={styles.notebar_icon} />
          </View>
          </Pressable>
          <Pressable onPress={() => this.props.navigation.navigate('Task')} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image source={require("./assets/images/tick_2.png")} style={styles.notebar_icon} />
            </View>
          </Pressable>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("./assets/images/cal.png")} style={styles.notebar_icon} />
          </View>
        </View>
      </View>
    )
  }
}
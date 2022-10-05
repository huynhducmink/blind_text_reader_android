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
import {LocaleConfig} from 'react-native-calendars';
import taskDB from "../Database/Task_database";

LocaleConfig.locales['vn'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: [ 'Sun.','Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
  today: "Today"
};
LocaleConfig.defaultLocale = 'vn';

export default class Calendar_screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calmarkedDates : {},
      task_list_day: [],
      task_list_day_text: "",
    }
  }

  task_list = []
  task_list_day = []
  db = new taskDB

  calmarkedDates = {}
  calselectedDate = null

  loadData = async () => {
    //load data from database in this function
    try {
      let task_db = await this.db.getDBconnection()
      this.task_list = await this.db.gettasklist(task_db)
      if (this.task_list.length){
        this.loadcalmark()
        this.setState({task_list:this.task_list})
      }
    }
    catch(error){
      console.error(error)
    }
  }

  loadcalmark = async () => {
    this.task_list.forEach(task => {
      if (task.task_day != null) {
        let day = task.task_year.toString() + "-" + task.task_month.toString() + "-" + task.task_day.toString()
        if (task.task_day < 10) {
          day = task.task_year.toString() + "-" + task.task_month.toString() + "-0" + task.task_day.toString()
        }
        this.calmarkedDates[day] = { marked: true, dotColor: 'red' }
      }
    })
    this.setState({calmarkedDates:this.calmarkedDates})
  }

  selectDay = (day) => {
    this.task_list_day = []
    this.task_list.forEach(task => {
      if (task.task_day == day.day && task.task_month == day.month && task.task_year == day.year){
        this.task_list_day.push(task)
      }
      this.setState({task_list_day:this.task_list_day})
    })
    let text = day.day.toString()+"/"+day.month.toString()+"/"+day.year.toString()
    this.setState({task_list_day_text:text})
  }

  componentDidMount = async() => {
    this.loadData()
  }

  render_task = ({item}) => {
    let task_note_single_line = item.task_note.split("/n")[0]
    return (
      <View style={styles.intaskcontainer}>
        <View style={{ flex: 3, height: "100%", justifyContent: "space-evenly", paddingLeft: 30 }}>
          <Text numberOfLines={1} style={{ height: "50%", color: "black", textAlignVertical: "center" }}>
            {item.task_title}
          </Text>
          <Text numberOfLines={1} style={{ height: "50%", color: "black", textAlignVertical: "center" }}>
            {task_note_single_line}
          </Text>
        </View>
        <View style={{ flex: 1, padding: 10, justifyContent: "space-around" }}>
          <Text numberOfLines={1} style={{ height: "50%", color: "black", textAlign: "center", textAlignVertical: "center" }}>
            {item.task_hour == null && item.task_min == null ? "" : item.task_hour + ":" + item.task_min}
          </Text>
          <Text numberOfLines={1} style={{ height: "50%", color: "black", textAlign: "center", textAlignVertical: "center" }}>
            {item.task_day == null && item.task_month == null ? "" : item.task_day + "/" + item.task_month}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={{ flex: 6 }}>
          <Calendar
          style = {{
              height: "100%",
              width: "100%"
            }}
            // Initially visible month. Default = now
            // initialDate={'2012-03-01'}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={'2012-05-10'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              this.selectDay(day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
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
            // renderHeader={date => {
            //   /*Return JSX*/
            // }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={false}
            markedDates={this.state.calmarkedDates}
          />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{textAlignVertical:"center", paddingLeft: 20, fontSize: 24}}>
            {this.state.task_list_day_text}
          </Text>
          <FlatList
            data={this.state.task_list_day}
            renderItem={this.render_task}
            keyExtractor={item => item.task_id}
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
              <Image source={require("./assets/images/tick.png")} style={styles.notebar_icon} />
            </View>
          </Pressable>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("./assets/images/cal_2.png")} style={styles.notebar_icon} />
          </View>
        </View>
      </View>
    )
  }
}
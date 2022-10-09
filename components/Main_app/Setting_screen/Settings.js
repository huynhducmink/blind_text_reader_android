import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Settings extends React.Component{
  constructor(props){
    super(props)
  }

  loadLanguage = async () => {
    //load setting
    try {
      let lang = await AsyncStorage.getItem('easynote_language')
      if (lang !== null) {
        return lang
      }
      else {
        try {
          await AsyncStorage.setItem('easynote_language', 'en')
        } catch (e) {
          // saving error
        }
        return "en"
      }
    } catch (e) {
      // error reading value
    }
    return null
  }

  setLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('easynote_language', lang)
    } catch (e) {
      // saving error
    }
  }
}
import React from "react"
import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center'
  },
  topcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFC3C3',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  taskbar_icon: {
    width: "8%",
    aspectRatio : 1
  },
  searchcontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
  },
  searchbar: {
    flex: 5,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems:'center',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  search_icon: {
    aspectRatio : 1,
    backgroundColor:"#FFFFFF",
  },
  searchinputcontainer: {
    flex:7,
  },
  input: {
    height: "100%",
    width: "100%",
    margin: 0,
    borderWidth: 0,
    paddingLeft:20,
    // backgroundColor:"red",
    fontSize: 25
  },
  sorticoncontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: "center",
  },
  sort_icon: {
    flex:1,
    width: "10%",
    aspectRatio : 1,
    backgroundColor:"#F0F0F0",
    margin:"20%"
  },
  taskcontainer: {
    flex: 8,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center'
  },
})
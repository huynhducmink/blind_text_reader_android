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
    // backgroundColor: '#FFC3C3',
    backgroundColor: '#99D28B',
    justifyContent: 'space-around',
    alignItems: "center",
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
  },
  notebar_icon: {
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
  notecontainer: {
    flex: 9,
    flexDirection: 'column',
    backgroundColor: '#F0F0F0',
    alignItems:'stretch',
    justifyContent:"flex-start"
  },
  innotecontainer: {
    flexDirection:"row",
    margin: 5,
    width: "90%",
    height: 80,
    borderRadius:20,
    backgroundColor: "white",
    alignItems:"center",
    justifyContent:"center"
  },
  addnotebutton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 90,
    width: 90,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    //borderColor:"#FFC3C3",
    borderColor:"#99D28B",
    borderWidth:3,
  },
  addnotetopbar: {
    flex:1,
    flexDirection:"row",
    alignItems: "center",
  },
  donenotebutton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 90,
    width: 90,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    borderColor:"#99D28B",
    borderWidth:3,
  },
})
import React from 'react';
import { Image, Text, View, Pressable, StatusBar, StyleSheet} from 'react-native';


export default class ENDG_end extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Pressable onPress={() => this.props.change_to_menu()} style={{flex:1}}>
        <View style={styles.container}>
          <Text style={{ fontSize: 50 }}>
            Hết truyện!
          </Text>
          <Text style={{ fontSize: 20 }}>
            Chạm vào màn hình để trở về trang chủ
          </Text>
        </View>
      </Pressable >
    )
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 5,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textcontainer: {
    flex:3,
    backgroundColor:"#F0F0F0"
  },
  navcontainer: {
    flex:1,
    flexDirection:"row",
  },
  text: {
    // fontFamily:"Manuale",
    fontWeight:'bold',
    fontSize: 25,
  },
  button:{
    flex:1,
    backgroundColor:"#FFC3C3",
    borderRadius: 20,
    alignItems:"center",
    justifyContent:"center",
  }
});
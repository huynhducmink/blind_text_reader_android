import { Dimensions, StyleSheet } from 'react-native';

const { width, height} = Dimensions.get('window')

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  ENDG_image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ENDG_text: {
    fontWeight:'bold',
    fontSize: 20,
  },
  ENDG_textbox: {
    height: 160
  }
});
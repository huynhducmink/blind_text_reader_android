import React from 'react';
import ENDG_app from './components/ENDG_app/ENDG_app';
import Blind_app from './components/Blind_app/Blind_app';
import Main_app from './components/Main_app/Main_app';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ENDG_app/>
      //<Main_app/>
    )
  }

}
export default App















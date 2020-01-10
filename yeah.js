/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ColorPicker,  fromHsv } from 'react-native-color-picker';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import hexToRgba from 'hex-to-rgba';



export default class Yeah extends Component{

  constructor(props){
    super(props);
    this.state = {
      myColor: "#FFFFF",
      myrgba: "rgba (12,12,12,12)",
      result: "",
      rgbObject: {r: 1, g:2 , b: 3}
    }
  }

  getRgbFromString(rgbaString){
      var openParenthese = rgbaString.indexOf("(");
      var closeParenthese = rgbaString.indexOf(")");
      var myArray = rgbaString.slice(openParenthese+1, closeParenthese).split(',');
      return {r: myArray[0],g: myArray[1],b:  myArray[2]};
  }

  requestToEsp(rgbObject) {
    var url = `http://192.168.4.1/control?red=${rgbObject.r}&green=${rgbObject.g}&blue=${rgbObject.b}`;
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {if(responseJson.status != "ok"){
      console.log(responseJson);
    }})
    .catch(e => console.log(e))
  }

  componentDidMount(){
    console.log(this.getRgbFromString("rgba(122,132,132, 123)"));
  }

  render(){
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 100, width: "100%", backgroundColor: this.state.myColor, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "white", fontSize: 25 }}>
            {this.state.myrgba}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <ColorPicker
            onColorChange={color => {this.setState({myColor: fromHsv(color).toString()}); var hehe = hexToRgba(fromHsv(color).toString()); this.requestToEsp(this.getRgbFromString(hehe)) }}
            style={{ flex: 1 }}
            hideSliders={true}
          />
        </View>
      </View>
    );
  }
 
};



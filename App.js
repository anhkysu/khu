/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  Button,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import hexToRgba from 'hex-to-rgba';
import Yeah from './yeah';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myColor: { h: 1, s: 2, v: 3 },
      myrgba: "rgba (12,12,12,12)",
      textIn: "",
      rgbObject: {}
    }
  }

  handleTextChange(text) {
    this.setState({ textIn: text })
  }

  handleEmotion(myEmotion) {
    console.log(myEmotion);
    switch (myEmotion) {
      case "redlight":
        this.requestToEsp({r:255, g:1, b:1});
        break;
      case "greenlight":
        this.requestToEsp({r:1, g:255, b:1});
        break;
      case "sunny":
          this.requestToEsp({r:255, g:254, b:0});
        break;
      case 'inlove':
          this.requestToEsp({r:255, g:0, b:102});
        break;
      case "lonely":
          this.requestToEsp({r:102, g:255, b:255});
        break;
      case 'gato':
        this.requestToEsp({ r: 102, g: 0, b: 204 });
        break;
      case 'off':
        this.requestToEsp({ r: 1, g: 1, b: 1 });
        break;
      default:
        break;
    }
    
  }

  getRgbFromString(rgbaString){
    var openParenthese = rgbaString.indexOf("(");
    var closeParenthese = rgbaString.indexOf(")");
    var myArray = rgbaString.slice(openParenthese+1, closeParenthese).split(',');
    return {r: myArray[0],g: myArray[1],b:  myArray[2]};
}

  onSubmitText() {
    if(String(this.state.textIn).includes("ế")) {
      this.handleEmotion("lonely");
    }
    else if (String(this.state.textIn).includes("thích")){
      this.handleEmotion("inlove");
    }
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 100, width: "100%", display: "flex", flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={{ height: "100%", borderColor: 'gray', borderWidth: 1, paddingLeft: 10, fontSize: 20 }}
              onChangeText={(text) => { this.handleTextChange(text) }}
              value={this.state.textIn}
              placeholder="Cảm nghĩ của bạn lúc này"
            />
          </View>
          <TouchableOpacity onPress={() => { this.onSubmitText() }}>
            <View style={{ width: 100, height: "100%", backgroundColor: "steelblue", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 20 }}>
                POST
                </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={{ flex: 1 }}>
          
          <View style={{ flex: 1, backgroundColor: "whitesmoke", flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.handleEmotion('greenlight') }}>
                <View style={{ width: 150, height: 150, backgroundColor: "green", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Bật đèn xanh</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.handleEmotion('redlight') }}>
                <View style={{ width: 150, height: 150, backgroundColor: "red", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Đến ngày</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "whitesmoke", flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.handleEmotion('sunny') }}>
                <View style={{ width: 150, height: 150, backgroundColor: "orange", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Say nắng</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.handleEmotion('inlove') }}>
                <View style={{ width: 150, height: 150, backgroundColor: "violet", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Đang yêu</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "whitesmoke", flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.handleEmotion('gato') }}>
                <View style={{width: 150, height: 150, backgroundColor: "#7032db", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Gato</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => { this.handleEmotion('lonely') }}>
                <View style={{ width: 150, height: 150, backgroundColor: "lightblue", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontSize: 18 }}>Cô đơn</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
        <View style={{ height: 70, width: "100%", justifyContent: "center", alignItems: "center", flexDirection:"row", backgroundColor:"whitesmoke", paddingTop: 10, paddingBottom: 25 }}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Yeah'); }} style={{marginHorizontal:15, backgroundColor: "dodgerblue", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontSize: 25 }}>
              ADVANCED
                </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.handleEmotion("off") }} style={{marginHorizontal:15, backgroundColor: "dodgerblue", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontSize: 25 }}>
              OFF
                </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

};

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerStyle: { backgroundColor: "dodgerblue" },
      title: "Artificial Emotion",
    }
  },
  Yeah: {
    screen: Yeah
  }
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});



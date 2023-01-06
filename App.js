import React, { Component } from 'react';
import { View } from 'react-native';
import MainScreen from './screens/MainScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.signInUpdate = this.signInUpdate.bind(this);
  }

  state = {
    isSignedIn: false
  };

  initScreen() {
    return this.state.isSignedIn ? "MainScreen" : "WelcomeScreen"
  }

  signInUpdate = () => {
    this.setState({ isSignedIn: true });
  };


  render() {
    console.log('Rander is called');
    console.log(this.initScreen())
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={this.initScreen()} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} initialParams={{ signInUpdate: this.signInUpdate }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

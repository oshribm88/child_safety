import React, { Component } from 'react';
import { View } from 'react-native';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
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
    return this.state.isSignedIn ? "MainScreen" : "SignInScreen"
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
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} initialParams={{ signInUpdate: this.signInUpdate }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

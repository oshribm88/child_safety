import React, { Component } from 'react';
import { View } from 'react-native';
import MainScreen from './screens/MainScreen';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { db, ref, set, child, get } from "./config/firebase"

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

  writeUserData(userId, name, email, imageUrl) {
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  render() {
    console.log('Rander is called');
    console.log(this.initScreen())

    /*
    this.writeUserData('123', 'oshri', 'oshribm88@gmail.com', 'bla.com')

    const dbRef = ref(db);
    get(child(dbRef, `users/123`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    */

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

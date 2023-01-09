import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      verificationCode: ''
    };
  }

  signInWithPhoneNumber = () => {
    const { phoneNumber } = this.state;
    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        this.setState({ confirmResult });
      })
      .catch(error => {
        console.log(error);
      });
  }

  confirmCode = () => {
    const { confirmResult, verificationCode } = this.state;
    confirmResult.confirm(verificationCode)
      .then(user => {
        console.log('User signed in!');
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Phone number"
          onChangeText={phoneNumber => this.setState({ phoneNumber })}
          value={this.state.phoneNumber}
        />
        <Button
          title="Sign in with phone number"
          onPress={this.signInWithPhoneNumber}
        />
        { this.state.confirmResult &&
          <View>
            <TextInput
              placeholder="Verification code"
              onChangeText={verificationCode => this.setState({ verificationCode })}
              value={this.state.verificationCode}
            />
            <Button
              title="Confirm code"
              onPress={this.confirmCode}
            />
          </View>
        }
      </View>
    );
  }
}

export default SignInScreen;

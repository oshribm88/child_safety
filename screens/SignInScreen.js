import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
    console.log('SignInScreen render')
    return (
      <View style={styles.container}>
        <TextInput
          placeholder=" Phone number"
          onChangeText={phoneNumber => this.setState({ phoneNumber })}
          value={this.state.phoneNumber}
          style={styles.textInput}
        />
        <Button
          title="Sign in with phone number"
          onPress={this.signInWithPhoneNumber}
          style={styles.button}
        />
        {this.state.confirmResult &&
          <View>
            <TextInput
              placeholder="Verification code"
              onChangeText={verificationCode => this.setState({ verificationCode })}
              value={this.state.verificationCode}
              style={styles.textInput}
            />
            <Button
              title="Confirm code"
              onPress={this.confirmCode}
              style={styles.button}
            />
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: '55%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  button: {
    width: '80%',
    margin: 10
  }
});

export default SignInScreen;

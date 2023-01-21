import * as Firebase from "../config/firebase"
import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

class SignInScreen extends React.Component {
  // Ref or state management hooks
  recaptchaVerifier = React.createRef();
  attemptInvisibleVerification = false;

  constructor(props) {
    super(props);
    console.log(Firebase.app);
    this.state = {
      auth: getAuth(Firebase.app),
      phoneNumber: '',
      verificationId: '',
      verificationCode: '',
      message: '',
    } 
  }

  handleSendVerificationCode = async () => {
    console.log('oshri');
    // The FirebaseRecaptchaVerifierModal ref implements the
    // FirebaseAuthApplicationVerifier interface and can be
    // passed directly to `verifyPhoneNumber`.
    try {
      const phoneProvider = new PhoneAuthProvider(getAuth(Firebase.app));
      const verificationId = await phoneProvider.verifyPhoneNumber(
        this.state.phoneNumber,
        this.recaptchaVerifier.current
      );
      console.log(verificationId)
      this.setState({ verificationId });
      this.setState({ message: 'Verification code has been sent to your phone.' });
    } catch (err) {
      console.log(err);
      this.setState({ message: `Error: ${err.message}` });
    }
  }

  handleConfirmVerificationCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(this.state.verificationId, this.state.verificationCode);
      await signInWithCredential(this.state.auth, credential);
      this.setState({ message: 'Phone authentication successful 👍' });
      this.props.navigation.navigate('MainScreen');
    } catch (err) {
      console.log(err);
      this.setState({ message: `Error: ${err.message}` });
    }
  }

  render() {
    console.log('SignInScreen render');
    return (
      <View style={{ padding: 20, marginTop: 50 }}>
        <FirebaseRecaptchaVerifierModal
          ref={this.recaptchaVerifier}
          firebaseConfig={Firebase.firebaseConfig}
        />
        <Text style={{ marginTop: 20 }}>Enter phone number</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          placeholder="+1 999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={text => this.setState({ phoneNumber: text })}
        />
        <Button
          title="Send Verification Code"
          disabled={!this.state.phoneNumber}
          onPress={this.handleSendVerificationCode}
        />
        <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          editable={!!this.state.verificationId}
          placeholder="123456"
          onChangeText={text => this.setState({ verificationCode: text })}
        />
        <Button
          title="Confirm Verification Code"
          disabled={!this.state.verificationId}
          onPress={this.handleConfirmVerificationCode}
        />
        {this.state.message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: '#ffffff', justifyContent: 'center' },
            ]}
            onPress={() => this.setState({ message: null })}
          >
            <Text style={{ margin: 20, textAlign: 'center' }}>
              {this.state.message.text}
            </Text>
          </TouchableOpacity>
        ) : null}
        {this.attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
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

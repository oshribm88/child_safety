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
    this.unsubscribeAuthStateChanged = getAuth(Firebase.app).onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        // User is signed in, navigate to the main screen
        this.props.navigation.navigate('MainScreen');
      }
    });
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
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={this.recaptchaVerifier}
          firebaseConfig={Firebase.firebaseConfig}
        />
        <Text style={styles.title}>Enter phone number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="+1 999 999 9999"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={text => this.setState({ phoneNumber: text })}
          />
        </View>
        <Button
          title="Send Verification Code"
          disabled={!this.state.phoneNumber}
          onPress={this.handleSendVerificationCode}
        />
        <Text style={styles.title}>Enter Verification code</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={!!this.state.verificationId}
            placeholder="123456"
            onChangeText={text => this.setState({ verificationCode: text })}
          />
        </View>
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
            {this.state.message}
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
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        },
        title: {
          fontFamily: 'System',
          fontSize: 28,
          color: '#333',
          marginBottom: 20,
        },
        subtitle: {
          fontFamily: 'System',
          fontSize: 16,
          color: '#666',
          marginBottom: 40,
        },
        inputContainer: {
          width: '80%',
          marginBottom: 20,
          borderBottomWidth: 2,
          borderBottomColor: '#333',
        },
        input: {
          fontFamily: 'System',
          fontSize: 16,
          color: '#333',
          paddingBottom: 5,
        },
        buttonContainer: {
          width: '80%',
          height: 50,
          backgroundColor: '#333',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        },
        buttonText: {
          fontFamily: 'System',
          fontSize: 18,
          color: '#fff',
        },
        messageContainer: {
          position: 'absolute',
          bottom: 20,
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#ccc',
          alignSelf: 'center',
        },
        messageText: {
          fontFamily: 'System',
          fontSize: 16,
          color: '#333',
          textAlign: 'center',
        },
      });
      
      
      
      export default SignInScreen;
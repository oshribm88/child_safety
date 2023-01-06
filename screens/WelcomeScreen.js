import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '80%',
        padding: 12,
        backgroundColor: '#33B8FF',
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

class WelcomeScreen extends Component {
    pressHandlerSkip = () => {
        console.log('Skip sign in button pressed');
        this.props.navigation.navigate('MainScreen');
    };

    pressHandlerSignIn = () => {
        console.log('Sign in button pressed');
        this.props.route.params.signInUpdate();
        this.props.navigation.navigate('MainScreen');
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.pressHandlerSignIn}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.pressHandlerSkip}>
                    <Text style={styles.buttonText}>Skip sign in</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default WelcomeScreen;

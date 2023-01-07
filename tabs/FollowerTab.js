import React, { Component } from 'react';
import Header from '../components/Header';
import ContactList from '../components/ContactList';
import { View } from 'react-native';

const styles = {
    headerContainer: {
        height: 100,
        backgroundColor: '#33B8FF',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    headerText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 50,
    },
    menuContainer: {
        flexDirection: 'row',
    },
    menuItem: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 15,
        paddingTop: 50,
    },
    draftOrderContainer: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        marginLeft: -25,
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
};

class FollowerTab extends Component {
    state = {
        contactList: [
            { name: 'Alice', avatar: 'https://example.com/avatar-alice.jpg' },
            { name: 'Bob', avatar: 'https://example.com/avatar-bob.jpg' },
            { name: 'Charlie', avatar: 'https://example.com/avatar-charlie.jpg' },
            { name: 'David', avatar: 'https://example.com/avatar-david.jpg' },
            { name: 'Eve', avatar: 'https://example.com/avatar-eve.jpg' },
        ],
    };

    render() {
        return (
            <View>
                <Header styles={styles} />
                <ContactList contacts={this.state.contactList} />
            </View>
        );
    }
}

export default FollowerTab
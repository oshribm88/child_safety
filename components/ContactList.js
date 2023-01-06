import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

function ContactList(props) {
    const renderContact = ({ item }) => {
        return (
            <View style={styles.contactContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{item.name}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={props.contacts}
            renderItem={renderContact}
            keyExtractor={item => item.name}
        />
    );
}

const styles = {
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    name: {
        marginLeft: 16,
        fontSize: 16,
    },
};

export default ContactList;

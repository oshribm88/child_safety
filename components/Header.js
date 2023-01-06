import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

function Header(props) {
    const { styles } = props;
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => console.log('Menu button pressed')}>
                <MaterialIcons name="menu" style={styles.menuItem} />
            </TouchableOpacity>
            <Text style={styles.headerText}>No Worries</Text>
            <TouchableOpacity onPress={() => console.log('Search button pressed')}>
                <MaterialIcons name="search" style={styles.menuItem} />
            </TouchableOpacity>
        </View>
    );
}

export default Header;
import React, { Component } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FollowedTab from '../tabs/FollowedTab';
import FollowerTab from '../tabs/FollowerTab';

const Tab = createBottomTabNavigator();

class MainScreen extends Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="followed" component={FollowedTab} />
                <Tab.Screen name="follower" component={FollowerTab} />
            </Tab.Navigator>
        );
    }
}

export default MainScreen;

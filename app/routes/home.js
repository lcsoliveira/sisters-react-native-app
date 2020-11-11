import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "../scenes/home/Home";
import UpdateProfileScreen from "../scenes/home/UpdateProfile";
import Map from "../scenes/Map/Map";

import {headerStyle, headerTitleStyle} from '../theme'

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        UpdateProfile: UpdateProfileScreen,
        Map: Map
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default HomeStack;
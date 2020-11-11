import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import MapScreen from "../scenes/Map/Map";
// import UpdateProfileScreen from "../scenes/home/UpdateProfile";

import {headerStyle, headerTitleStyle} from '../theme'

const MapStack = createStackNavigator(
    {
        Map: MapScreen,
    },
    {
        initialRouteName: 'Map',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default MapStack;
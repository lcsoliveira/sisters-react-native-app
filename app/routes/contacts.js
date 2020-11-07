import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import Contacts from "../scenes/contacts/Contacts";

import {headerStyle, headerTitleStyle} from '../theme';

const ContactsStack = createStackNavigator(
    {
        Contacts: Contacts,
    },
    {
        initialRouteName: 'Contacts',
        defaultNavigationOptions: () => ({headerStyle, headerTitleStyle})
    }
);

export default ContactsStack;
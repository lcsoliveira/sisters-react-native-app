import React, {useState, useContext} from 'react';
import {Text, View, Button} from 'react-native';

import { useAuth } from "../../providers/auth";

export default function Home(props) {

    return (
        <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
            <Text>Contacts</Text>
        </View>
    );
    
}
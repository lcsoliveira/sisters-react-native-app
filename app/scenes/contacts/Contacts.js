import React, {useState, useContext} from 'react';
import * as api from "../../services/auth";

import {Header, ErrorText} from "../../components/Shared";

import Form, {TYPES} from 'react-native-basic-form';
import {Alert, View} from 'react-native';

export default function Contacts(props) {

    const { navigation } = props;
    const id =  navigation.dangerouslyGetParent().getParam('id');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fields = [
        {name: 'name', label: 'Nome', required: true},
        {name: 'lastName', label: 'Sobrenome', required: true},
        {name: 'phone', label: 'Telefone', required: true, type: TYPES.Number}
    ];

    async function onSubmit(data) {
        setLoading(true);
        try {
            const response = await api.addContact(id, data);
            setLoading(false);
            Alert.alert(
                'Registration Successful',
                response.message,
                [{text: 'OK', onPress: () => navigation.navigate("Map")}],
                {cancelable: false},
            );
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    
    const formProps = { title: "enviar", fields, onSubmit };

    return (
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
            <Header title={"Contatos de emergência"}/>
            <View style={{flex:1}}>
                <ErrorText error={error}/>
                <Form {...formProps} />
            </View>
        </View>
    );
    
}
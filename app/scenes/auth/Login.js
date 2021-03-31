import React, { useState } from 'react';
import {View} from 'react-native';

import * as api from "../../services/auth";
import { useAuth } from "../../providers/auth";

import Form from 'react-native-basic-form';
import CTA from "../../components/CTA";
import {Header, ErrorText} from "../../components/Shared";

export default function Login(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleLogin } = useAuth();

    const fields = [
        {name: 'email', label: 'Email', required: true},
        {name: 'password', label: 'Senha', required: true, secure: true}
    ];

    async function onSubmit(state) {
        setLoading(true);

        try {
            let response = await api.login(state);
            await handleLogin(response);

            setLoading(false);

            //check if username is null
            let username = (response.user.username !== null);
            if (username) navigate('App');
            else navigation.replace('Username');
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    let formProps = {title: "Entrar", fields, onSubmit, loading};
    return (
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
            <Header title={"Entrar"}/>
            <View style={{flex: 1}}>
                <ErrorText error={error}/>
                <Form {...formProps}>
                    <CTA
                        ctaText={"Esqueceu a Senha?"}
                        onPress={() => navigation.navigate("ForgotPassword")}
                        style={{marginTop: 20}}/>

                    <CTA
                        title={"Não tem uma conta?"}
                        ctaText={"Cadastro"}
                        onPress={() => navigation.replace("Register")}
                        style={{marginTop: 50}}/>
                </Form>
            </View>
        </View>
    );
};

Login.navigationOptions = ({}) => {
    return {
        title: ``
    }
};
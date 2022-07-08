import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native'
import { colors, parameters, title } from "../../global/styles"
import { Icon, Button, SocialIcon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import { auth } from '../../../firebase'
import Header from "../../components/Header"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [textInput2Focus, setTextInput2Focus] = useState(false)
    const [textEntry, setTextEntry] = useState(true)

    const navigation = useNavigation()

    const handleSignIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(async userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in With: ', user.email);
                await AsyncStorage.setItem('currentUserUid', user.uid);
                navigation.navigate('ClientTabs', { screen: 'HomeScreen' })
            })
            .catch(error => alert(error.message))
    }


    return (
        <View style={styles.container}>
            <Header title="Minha Conta" type="arrow-left" navigation={navigation} />
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={title}>Iniciar Sessão</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={styles.text1}>Por favor insira o seu email</Text>
                <Text style={styles.text1}>e a sua palavra-passe</Text>
            </View>
            <View>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={styles.TextInput1}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={styles.TextInput2}>
                    <Animatable.View animation={textInput2Focus ? "" : "fadeInLeft"} duration={400}>
                        <Icon
                            name="lock"
                            iconStyle={{ color: colors.grey3 }}
                            type="material"
                            style={{}}
                        />

                    </Animatable.View>

                    <TextInput
                        style={{ width: "80%" }}
                        placeholder="Palavra-passe"
                        secureTextEntry={textEntry}
                        onFocus={() => {
                            textInput2Focus: true
                        }}
                        onBlur={() => {
                            textInput2Focus: false
                        }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />

                    <Animatable.View animation={textInput2Focus ? "" : "fadeInLeft"} duration={400}>
                        <Icon
                            name={textEntry ? "visibility-off" : "visibility"}
                            iconStyle={{ color: colors.grey3 }}
                            type="material"
                            style={{ marginRight: 8 }}
                            onPress={() => {
                                textEntry ? setTextEntry(false) : setTextEntry(true)
                            }}
                        />
                    </Animatable.View>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Button
                        title="Iniciar Sessão"
                        buttonStyle={parameters.styledButton}
                        titleStyle={parameters.styledButtonTitle}
                        onPress={handleSignIn}
                    />
                </View>
            </View>

            <View style={{ alignItems: "center", marginTop: 25 }}>
                <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>Esqueceu a Palavra-Passe?</Text>
            </View>

            <View style={{ alignItems: "center", marginVertical: 30 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>OU</Text>
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <SocialIcon
                    title="Iniciar Sessão com Facebook"
                    button
                    type="facebook"
                    styles={styles.SocialIcon}
                    onPress={() => { }}
                />
            </View>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <SocialIcon
                    title="Iniciar Sessão com Google"
                    button
                    type="google"
                    styles={styles.SocialIcon}
                    onPress={() => { }}
                />
            </View>
            <View style={{ marginTop: 25, marginLeft: 20 }}>
                <Text style={{ ...styles.text1, textDecorationLine: "underline" }}>Ainda não tem uma conta?</Text>
            </View>
            <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
                <Button
                    title="Criar Conta"
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonTitle}
                    onPress={() => navigation.navigate('SignUpScreen')}
                />
            </View>
        </View>

    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text1: {
        color: colors.grey3,
        fontSize: 15
    },

    TextInput1: {
        borderWidth: 1,
        borderColor: colors.grey3,
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 9,
        height: 50,
    },
    TextInput2: {
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
        borderColor: colors.grey3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 9,
        height: 50,
    },

    SocialIcon: {
        borderRadius: 12,
        height: 50
    },

    createButton: {
        backgroundColor: colors.white,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange,
        height: 40,
        paddingHorizontal: 20,
    },
    createButtonTitle: {
        color: colors.orange,
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }

})

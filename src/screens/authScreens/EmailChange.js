import { Alert, View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import React, { Component } from 'react'
import * as firebase from 'firebase'
import { colors } from '../../global/styles'
import Header from '../../components/Header'
import { db } from '../../../firebase'


export default class EmailChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEmail: "",
            newEmail: "",
            currentPassword: "",
            newPassword: "",
            textEntry: true,

        };

    }

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }

    onChangePasswordPress = () => {

        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(() => {
                Alert.alert("Password Alterada com Sucesso!");
            }).catch((error) => {
                Alert.alert(error.message);
            });
        }).catch(() => {
            Alert.alert("Senha Atual Incorreta!");
        });
    }

    onChangeEmailPress = () => {

        this.reauthenticate(this.state.currentPassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updateEmail(this.state.newEmail).then(() => {
                console.log(user);
                db.ref().child('users').child(user.uid).update({
                    email: this.state.newEmail
                }).then(() => {
                    Alert.alert("Email Alterado com Sucesso!");
                }).catch((error) => {
                    Alert.alert(error.message);
                });
            }).catch((error) => {
                Alert.alert(error.message);
            });
        }).catch(() => {
            Alert.alert("Email Incorreto!");
        })

    }

    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <ScrollView>
                    <Header title="Mudar Email" type="arrow-left" navigation={this.props.navigation} />
                    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 10, marginTop: 350 }}>
                        <View style={styles.view14}>
                            <TextInput
                                value={this.state.currentEmail}
                                style={styles.input1}
                                placeholder="Email Atual"
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    this.setState({ currentEmail: text })
                                }}
                            />
                        </View>
                        <View style={styles.view14}>
                            <TextInput
                                value={this.state.newEmail}
                                style={styles.input1}
                                placeholder="Email Atualizado"
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    this.setState({ newEmail: text })
                                }}
                            />
                        </View>
                        <View style={styles.view14}>
                            <TextInput
                                value={this.state.currentPassword}
                                style={styles.input1}
                                placeholder="Palavra-Passe"
                                autoCapitalize="none"
                                secureTextEntry={this.state.textEntry}
                                onChangeText={(text) => {
                                    this.setState({ currentPassword: text })
                                }}
                            />
                            <Icon
                                name={this.state.textEntry ? "visibility-off" : "visibility"}
                                color={colors.grey3}
                                type="material"
                                style={{ marginRight: 10 }}
                                onPress={this.state.textEntry ? () =>
                                    this.setState({ textEntry: false })

                                    : () =>
                                        this.setState({ textEntry: true }
                                        )}
                            />
                        </View>


                    </View>
                    <View style={{ marginTop: 125 }}>
                        <Button
                            buttonStyle={styles.button1}
                            titleStyle={styles.title1}
                            title="Alterar Email"
                            onPress={this.onChangeEmailPress}
                        />
                    </View>
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    input1: {
        flex: 1,
    },
    view14: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: colors.grey4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        paddingLeft: 5,
        marginTop: 20,
        height: 48,
        paddingHorizontal: 10
    },
    button1: {
        backgroundColor: colors.orange,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange,
        height: 50,
        paddingHorizontal: 20,
        width: '100%',
    },
    title1: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3

    },
})
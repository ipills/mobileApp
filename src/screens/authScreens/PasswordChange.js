import { Alert, View, TextInput, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import React, { Component } from 'react'
import * as firebase from 'firebase'
import { colors } from '../../global/styles'
import Header from '../../components/Header'


export default class PasswordChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            textEntry: true,
            textEntry2: true,
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

    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <Header title="Mudar Palavra-Passe" type="arrow-left" navigation={this.props.navigation} />
                <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 10, marginTop: 350 }}>
                    <View style={styles.view14}>
                        <TextInput
                            value={this.state.currentPassword}
                            style={styles.input1}
                            placeholder="Palavra-Passe Atual"
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
                    <View style={styles.view14}>
                        <TextInput
                            value={this.state.newPassword}
                            style={styles.input1}
                            placeholder="Palavra-Passe Nova"
                            autoCapitalize="none"
                            secureTextEntry={this.state.textEntry2}
                            onChangeText={(text) => {
                                this.setState({ newPassword: text })
                            }}
                        />
                        <Icon
                            name={this.state.textEntry2 ? "visibility-off" : "visibility"}
                            color={colors.grey3}
                            type="material"
                            style={{ marginRight: 10 }}
                            onPress={this.state.textEntry2 ? () =>
                                this.setState({ textEntry2: false })

                                : () =>
                                    this.setState({ textEntry2: true }
                                    )}
                        />
                    </View>


                </View>
                <View style={{ marginTop: 125 }}>
                    <Button
                        buttonStyle={styles.button1}
                        titleStyle={styles.title1}
                        title="Alterar Palavra-Passe"
                        onPress={this.onChangePasswordPress}
                    />
                </View>
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
import { Alert, View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import React, { Component } from 'react'
import * as firebase from 'firebase'
import { colors } from '../../global/styles'
import Header from '../../components/Header'
import { db } from '../../../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default class EmailChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newMorada: "",
            textEntry: true,

        };
        this.onChangeMoradaPress = this.onChangeMoradaPress.bind(this);
    }

    onChangeMoradaPress = async () => {

        const userUid = await AsyncStorage.getItem('currentUserUid');

        db.ref().child('users').child(userUid).update({
            morada: this.state.newMorada
        }).then(() => {
            Alert.alert("Morada Alterada com Sucesso!");
        }).catch((error) => {
            Alert.alert(error.message);
        });
    }


    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <ScrollView>
                    <Header title="Mudar Morada" type="arrow-left" navigation={this.props.navigation} />
                    <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 10, marginTop: 350 }}>
                        <View style={styles.view14}>
                            <TextInput
                                value={this.state.newMorada}
                                style={styles.input1}
                                placeholder="Nova Morada"
                                autoCapitalize="none"
                                onChangeText={(text) => {
                                    this.setState({ newMorada: text })
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 125 }}>
                        <Button
                            buttonStyle={styles.button1}
                            titleStyle={styles.title1}
                            title="Alterar Morada"
                            onPress={this.onChangeMoradaPress}
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
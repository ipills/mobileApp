import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from 'react-native'
import { Avatar, Icon } from 'react-native-elements';
import { colors } from '../global/styles';
import { auth } from '../../firebase';
import { db } from '../../firebase'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function useOnceCall(cb, condition = true) {
    const isCalledRef = useRef(false);

    useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}

export default function MyAccountScreen() {

    const navigation = useNavigation();
    const [userData, setUserData] = useState({})
    const handleSignOut = () => {
        auth
            .signOut()
            .then(async () => {
                await AsyncStorage.removeItem('currentUserUid');
                navigation.navigate('AuthStack', {
                    screen: 'SignInScreen'
                });
            })
            .catch(error => alert(error.message))
    }

    useOnceCall(async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        db.ref().child("users").child(currentUserUid).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.val())
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, true);


    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: colors.orange }}>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingLeft: 20, paddingVertical: 10
                }}>
                    <Avatar
                        rounded
                        size={75}
                        imageProps={{ resizeMode: 'contain', height: 80, width: 80 }}
                        source={{ uri: userData.image }}

                    />

                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>{userData.nome} {userData.sobrenome}</Text>
                        <Text style={{ color: colors.cardbackground, fontSize: 14 }}>{auth.currentUser?.email}</Text>
                    </View>
                </View>
            </View>

            <Text style={{ ...styles.titleText, marginTop: 12 }}>Definições de Conta</Text>
            <TouchableOpacity
                style={{ paddingLeft: 15 }}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center' }}>
                    <Icon
                        type="material-community"
                        name="account-box-outline"
                        color={colors.grey2}
                        size={28}
                    />
                    <Text style={styles.settingText}>Mudar Imagem</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => navigation.navigate('ChangeAddress')}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center' }}>
                    <Icon
                        type="material-community"
                        name="home-outline"
                        color={colors.grey2}
                        size={28}
                    />
                    <Text style={styles.settingText}>Mudar Morada</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => {
                    navigation.navigate("ChangeEmail")
                }}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center' }}>
                    <Icon
                        type="material-community"
                        name="email-outline"
                        color={colors.grey2}
                        size={28}
                    />
                    <Text style={styles.settingText}>Mudar Email</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => {
                    navigation.navigate("ChangePassword")
                }}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center' }}>
                    <Icon
                        type="material-community"
                        name="account-key-outline"
                        color={colors.grey2}
                        size={28}
                    />
                    <Text style={styles.settingText}>Mudar Palavra-Passe</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={() => {
                    navigation.navigate("DeleteAccount")
                }}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, alignItems: 'center' }}>
                    <Icon
                        type="material-community"
                        name="account-off-outline"
                        color={colors.grey2}
                        size={28}
                    />
                    <Text style={styles.settingText}>Desativar Conta</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ paddingLeft: 15 }}
                onPress={handleSignOut}
            >
                <View style={{ flexDirection: 'row', paddingTop: 20, marginBottom: 20 }}>
                    <Icon
                        type="material-community"
                        name="logout-variant"
                        color={colors.grey2}
                        size={28}
                    />
                    <Text style={styles.settingText}>Terminar Sessão</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },

    preferences: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 10,
        paddingLeft: 20,
    },

    switchText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingVertical: 5,
        paddingRight: 10
    },
    darkthemeText: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 0,
        paddingLeft: 0,
    },
    settingText: {
        fontSize: 16,
        color: colors.grey2,
        paddingTop: 1,
        paddingLeft: 10,
    },
    titleText: {
        fontSize: 22,
        color: colors.grey1,
        fontWeight: "bold",
        paddingBottom: 20,
        paddingLeft: 12
    }

})

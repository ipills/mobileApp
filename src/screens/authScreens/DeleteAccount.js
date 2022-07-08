import { Alert, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button, Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../global/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAccount = () => {

    const user = firebase.auth().currentUser;
    const navigation = useNavigation();

    async function deleteData() {
        remove(ref('users/' + userId))
    }

    function DeleteAcc() {
        user.delete().then(() => {
            deleteData();
            navigation.navigate('SignInScreen')
            Alert.alert('A Conta foi Desativada com Sucesso!')
        }).catch(function (error) {
            Alert.alert(error.message)
        });
    }

    return (
        <View style={{ marginTop: 30 }}>
            <Header title="Desativar Conta" type="arrow-left" navigation={navigation} />
            <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.text1}>Quer mesmo proceder com a eliminação da conta?</Text>
                <View style={styles.view15}>
                    <Text style={styles.text3}>
                        Quando elimina a sua conta iPills, não sera mais possivel
                        reaver as informações que estam na sua conta como os seus pedidos.
                        Toda a informação da sua conta ao ser eliminada, sera apagada e
                        nós, da empresa responsavel pelo iPills, não iremos guardar qualquer tipo
                        de informação que possa servir para terceiros.
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button
                        buttonStyle={styles.button1}
                        titleStyle={styles.title1}
                        title="Desativar Conta"
                        onPress={DeleteAcc}
                    />
                </View>
                <View>
                    <Image
                        source={require('../../../assets/logo512.png')}
                        style={{ height: 512, width: 512, alignSelf: "center", opacity: 0.5 }}
                    />
                </View>
            </View>
        </View>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    view1: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 15
    },

    text1: {
        fontSize: 22,
        color: colors.orange,
        fontWeight: 'bold'
    },

    view2: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingHorizontal: 15
    },

    view3: {
        marginTop: 5,
        marginBottom: 10
    },

    text2: {
        fontSize: 15,
        color: colors.grey2
    },

    view4: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5

    },

    view5: {
        marginLeft: 30,
        marginTop: 20
    },

    input1: { fontSize: 16, },

    view6: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5,
        marginTop: 20,
        height: 48
    },

    view7: {
        marginLeft: 0,
        maxWidth: "65%",
    },

    input2: {
        fontSize: 16,
        marginLeft: 0,
        marginBottom: 0
    },

    view8: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5,
        marginTop: 20,
        height: 48
    },

    view9: {
        marginLeft: 0,
        maxWidth: "65%",
    },

    input3: {
        fontSize: 16,
        marginLeft: 0,
        marginBottom: 0
    },

    view10: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.grey4,
        borderRadius: 12,
        paddingLeft: 5,
        marginTop: 20,
        height: 48
    },

    email: {
        fontSize: 24,
        padding: 0,
        marginBottom: 0,
        marginTop: 11,
        marginLeft: 2
    },

    view11: {
        marginLeft: 5,
        maxWidth: "65%",
    },

    input4: {
        fontSize: 16,
        marginLeft: -20,
        marginBottom: -10
    },

    view13: {
        flexDirection: "row",
        height: 40,
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
        height: 48
    },

    view15: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 0
    },

    text3: {
        fontSize: 12,
        color: colors.grey2,
    },

    view16: {
        flexDirection: 'row'
    },

    text4: {
        textDecorationLine: 'underline',
        color: 'green',
        fontSize: 13
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
        width: '100%'

    },

    title1: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3

    },

    view17: {
        marginVertical: 10,
        marginTop: 30
    },

    view18: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 15,
    },

    text5: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    view19: {
        backgroundColor: 'white',
        paddingHorizontal: 15,

    },

    view20: {
        marginTop: 5
    },

    view21: {
        marginTop: 5,
        alignItems: 'flex-end',
        paddingBottom: 10
    },

    button2: {
        backgroundColor: colors.background3,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange,
        height: 40,
        paddingHorizontal: 20,
        // width:'100%'

    },

    title2: {
        color: colors.orange,
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3

    },
    text6: {
        color: colors.grey3,
        fontSize: 15,
        marginTop: 20,
        marginBottom: 15
    }

})
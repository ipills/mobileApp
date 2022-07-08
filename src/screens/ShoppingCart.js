import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { colors, parameters } from '../global/styles'
import { Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function ShoppingCart() {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ marginLeft: 10, marginTop: 8 }}>
                    <Icon
                        type="material-community"
                        name="arrow-left"
                        color={colors.headerfont}
                        size={36}
                        onPress={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.headerfont}>Carinho</Text>
                </View>
            </View>
            <Text style={styles.textTitle}>O Seu Pedido</Text>
            <ScrollView style={{ backgroundColor: colors.grey5 }}>
                <View style={styles.order}>
                    <Text style={styles.textFarmaco}>Farmaco</Text>
                    <Text style={styles.textValor}>Valor</Text>
                </View>
            </ScrollView>
            <TouchableOpacity>
                <View style={styles.view11}>
                    <View style={styles.view12}>
                        <Text style={styles.text13}>Preco</Text>
                        <Text style={styles.text14}>Finalizar Compra</Text>
                        <View style={styles.view13}>
                            {/* Quantidade de Produtos no Carrinho */}
                            <Text style={styles.text13}>1</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    header: {
        backgroundColor: colors.orange,
        flexDirection: "row",
        height: parameters.headerHeight
    },
    headerfont: {
        color: colors.headerfont,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 118,
        marginTop: 8,

    },
    order: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    textTitle: {
        fontSize: 28,
        color: colors.orange,
        fontWeight: "bold",
    },
    textFarmaco: {
        fontSize: 16,
        color: colors.grey2,
        fontWeight: "bold",

    },
    textValor: {
        fontSize: 16,
        color: colors.grey3,
        marginRight: 15
    },
    view11: {
        backgroundColor: 'rgba(70,190,20,1)',
        height: 50,
        alignContent: "center",
        marginBottom: 0,
        justifyContent: "center",
    },
    view12: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text12: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.cardbackground
    },
    view13: {
        borderWidth: 1,
        marginRight: 10,
        borderColor: colors.background,
        borderRadius: 6,
        paddingBottom: 2
    },
    text13: {
        paddingHorizontal: 3,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.cardbackground,
    },
    text14: {
        paddingHorizontal: 0,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.cardbackground,
        marginRight: '9%'
    },
})
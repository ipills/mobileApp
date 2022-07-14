import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { colors, parameters } from '../global/styles'
import { Icon, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ShoppingCart({ navigation, route }) {

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0.0)

    useEffect(async () => {
        const _cart = await AsyncStorage.getItem('cart').then(c => JSON.parse(c));
        if (_cart && _cart.length > 0) {
            setCart(_cart)
            setTotal(_cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))
        }
    }, [])

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
                    {cart.map((item, index) => {
                        return (
                            <View style={styles.view1List} key={index}>
                                <View style={styles.view2List}>
                                    <View style={styles.view3List}>
                                        <Text style={styles.text1List}>{item.name}</Text>
                                        <Text style={styles.textValor}> x{item.quantity}</Text>
                                        <Text style={styles.text2List}>{parseFloat(item.price).toFixed(2)}€</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('PurchaseScreen', { price: parseFloat(total), idFarmacia: route.params.idFarmacia })
                }}
            >
                <View style={styles.view11}>
                    <View style={styles.view12}>
                        <Text style={styles.text13}>€{parseFloat(total).toFixed(2)}</Text>
                        <Text style={styles.text14}>Finalizar Compra</Text>
                        <View style={styles.view13}>
                            {/* Quantidade de Produtos no Carrinho */}
                            <Text style={styles.text13}>{cart ? cart.length : 0}</Text>
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
        marginLeft: 5
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

    view1List: {
        backgroundColor: "white",
        elevation: 4,
        shadowOpacity: 0.4,
        shadowColor: "black",
        margin: 5,
        width: SCREEN_WIDTH * 0.975,
        padding: 10
    },
    view2List: {
        flexDirection: "row",
        padding: 0,
        justifyContent: "space-between",
    },
    view3List: {
        justifyContent: "space-between",
        width: 250
    },
    view4List: {
        width: 75,
        height: 65
    },
    text1List: {
        fontSize: 14,
        color: colors.grey1,
        fontWeight: "bold",
    },
    text2List: {
        fontSize: 12,
        color: colors.grey1,
    },
})
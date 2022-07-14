import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedbackBase } from 'react-native'
import { colors, parameters } from '../global/styles';
import { Icon, Button } from 'react-native-elements';
import { db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

export default class MyOrdersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            orders: [],
            farmacias: [],
            productData: [],
        };

        this.getUserId();
        this.getOrders();
        this.getFarmacias();
        this.getProductData();

        this.getTotal = this.getTotal.bind(this);
    }

    getUserId = async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        this.setState({ userId: currentUserUid })
    }

    getOrders = async () => {
        db.ref().child("pedidos").get().then((snapshot) => {
            if (snapshot.exists()) {
                const _orders = snapshotToArray(snapshot);
                this.setState({ orders: _orders.filter(o => o.idUtilizador === this.state.userId) })
            } else {
                console.log("No data available/UID");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getFarmacias = async () => {
        db.ref().child("farmacias").get().then((snapshot) => {
            if (snapshot.exists()) {
                const _farmacias = snapshotToArray(snapshot);
                this.setState({ farmacias: _farmacias })
            } else {
                console.log("No data available/UID");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getProductData = async () => {
        db.ref().child("productData").get().then((snapshot) => {
            if (snapshot.exists()) {
                const _productData = snapshotToArray(snapshot);
                this.setState({ productData: _productData })
            } else {
                console.log("No data available/UID");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getTotal = (order) => {
        let total = 0;
        order.itens.forEach(item => {
            const product = this.state.productData[item.idProduto - 1];
            total += product.price * item.quantidade;
        });
        return total;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerfont}>Os Seus Pedidos</Text>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: colors.grey5 }}>
                    <View style={{ flexDirection: "row" }}>
                        {(this.state.orders.length > 0 && this.state.farmacias.length > 0 && this.state.productData.length > 0) ? this.state.orders.map((order, index) => {
                            const farmacia = this.state.farmacias[order.idFarmacia];
                            return (
                                <>
                                    <View style={styles.order}>
                                        <Text style={styles.textEstablecimento}>{farmacia.nome}</Text>
                                        <View style={styles.outros}>
                                            {order.itens.map((product, index) => {
                                                const _product = this.state.productData[product.idProduto - 1];
                                                return (
                                                    <View style={styles.produto}>
                                                        <View style={{ flexDirection: "row" }}>
                                                            <Text style={styles.textProduto}>{_product.name}</Text>
                                                            <Text style={styles.textProduto}> x{product.quantidade}</Text>
                                                        </View>
                                                        <Text style={styles.textProduto}>€{(product.quantidade * parseFloat(_product.price)).toFixed(2)}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                        <Text style={styles.textEstablecimento}>Total: €{this.getTotal(order).toFixed(2)}</Text>
                                        <Text style={styles.textOutros}>{Date(order.data).toLocaleUpperCase()}</Text>
                                    </View>
                                </>
                            )
                        }) : <Text style={styles.text}>Não tem pedidos</Text>}
                    </View>
                </ScrollView>
            </View>
        );
    }
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
        flexDirection: "column",
        paddingVertical: 10,
        marginLeft: "3%"
    },
    outros: {
        flexDirection: "row",
    },
    textTitle: {
        fontSize: 28,
        color: colors.orange,
        fontWeight: "bold",
    },
    textEstablecimento: {
        fontSize: 22,
        color: colors.grey1,
        fontWeight: "bold",

    },
    textOutros: {
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

    createButton: {
        backgroundColor: colors.white,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange,
        height: 35,
        paddingHorizontal: 20,
        marginTop: "45%",
        marginLeft: "3%"
    },
    createButtonTitle: {
        color: colors.orange,
        fontSize: 12,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    }

})

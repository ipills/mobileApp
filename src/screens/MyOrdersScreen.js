import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { colors, parameters } from '../global/styles';
import { Icon, Button } from 'react-native-elements';

export default function MyOrdersScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerfont}>Os Seus Pedidos</Text>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: colors.grey5 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.order}>
                        <Text style={styles.textEstablecimento}>Nome Establecimentos</Text>
                        <View style={styles.outros}>
                            <Text style={styles.textOutros}>Quantidade Artigos /</Text>
                            <Text style={styles.textOutros}>Valor</Text>
                        </View>
                        <Text style={styles.textOutros}>Data do Pedido</Text>
                    </View>
                    <Button
                        title="Ver Detalhes"
                        titleStyle={styles.createButtonTitle}
                        buttonStyle={styles.createButton}
                    />
                </View>
            </ScrollView>
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

import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import {
    Icon
} from 'react-native-elements';

import { colors, parameters } from '../global/styles';

export default function FarmaciaView({
    OnPressFarmaciaView,
    farmaciaName,
    entregaDisponivel,
    farmaciaMorada,
    distancia,
    images,
    screenWidth
}) {
    return (
        <TouchableOpacity
            onPress={OnPressFarmaciaView}
        >
            <View style={{ ...styles.cardView, width: screenWidth }}>
                <Image
                    style={{ ...styles.image, width: screenWidth }}
                    source={{ uri: images }}
                />
                <View>
                    <View>
                        <Text style={styles.farmaciaName}>{farmaciaName}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={styles.distancia}>
                            <Icon
                                name='place'
                                type='material'
                                color={colors.grey2}
                                size={18}
                                iconStyle={{
                                    marginTop: 3
                                }}
                            />
                            <Text style={styles.Min}>{distancia} Km</Text>
                        </View>
                        <View style={{ flex: 9, flexDirection: "row" }}>
                            <Text style={styles.morada}>{farmaciaMorada}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    cardView: {
        marginHorizontal: 9,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: colors.grey4,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 150,
    },
    farmaciaName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.grey1,
        marginTop: 5,
        marginLeft: 9
    },
    distancia: {
        flex: 4,
        flexDirection: "row",
        borderRightColor: colors.grey4,
        paddingHorizontal: 5,
        borderRightWidth: 1
    },
    Min: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 5,
        color: colors.grey3
    },
    morada: {
        fontSize: 12,
        paddingTop: 5,
        color: colors.grey2,
        paddingHorizontal: 10
    }
})
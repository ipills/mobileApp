import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { colors } from '../global/styles'
import { dataFarmacias } from '../global/data'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function FarmaciaHeader({ navigation, id }) {

    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.container}
                source={{ uri: dataFarmacias[id].images }}
            >
                <View style={styles.view1}>
                    <View style={styles.view2}>
                        <Icon
                            name="arrow-left"
                            type="material-community"
                            color={colors.black}
                            size={25}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 150,
    },
    view1: {
        flexDirection: 'row',
        alignItems: "baseline",
        justifyContent: "space-between",
    },
    view2: {
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.cardbackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    view3: {
        marginTop: 0,
        margin: 10,
        width: 40,
        height: 40,
        backgroundColor: colors.cardbackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    view4: {
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
    },
})
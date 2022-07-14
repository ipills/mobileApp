import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import { colors } from '../global/styles'
import { dataFarmacias } from '../global/data'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function FarmaciaHeader({ navigation, imagem }) {

    const { navigate } = useNavigation();

    return (
        <View style={styles.containerHeader}>
            <ImageBackground
                style={styles.containerHeader}
                source={{ uri: imagem }}
            >
                <View style={styles.view1Header}>
                    <View style={styles.view2Header}>
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
    containerHeader: {
        height: 150,
    },
    view1Header: {
        flexDirection: 'row',
        alignItems: "baseline",
        justifyContent: "space-between",
    },
    view2Header: {
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
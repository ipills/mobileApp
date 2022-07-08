import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { colors, parameters } from "../global/styles"
import { Icon } from 'react-native-elements'

import * as RootNavigation from '../navigation/utils/rootNavigation'

export default function Header({ title, type }) {

    return (
        <View style={styles.header}>
            <View style={{ marginLeft: 10, marginTop: 8 }}>
                <Icon
                    type="material-community"
                    name={type}
                    color={colors.headerfont}
                    size={36}
                    onPress={() => {
                        RootNavigation.goBack()
                    }}
                />
            </View>
            <View>
                <Text style={styles.headerfont}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.orange,
        flexDirection: "row",
        height: parameters.headerHeight
    },
    headerfont: {
        color: colors.headerfont,
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 8

    },

})
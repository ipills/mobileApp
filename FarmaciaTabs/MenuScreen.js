import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { colors, Icon } from 'react-native-elements'
import { filterData2 } from '../src/global/data'
import { useNavigation } from '@react-navigation/native'

const MenuScreen = ({
    productData,
}) => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("PreferenceScreen")
    }

    return (
        <View styles={styles.container}>
            <View>
                {filterData2.map((item, index) =>
                    <View key={item.id} style={styles.view1}>
                        <TouchableOpacity onPress={handlePress}>
                            <View style={styles.view2}>
                                <Text style={styles.text1}>{item.name}</Text>
                                {productData.filter(product => product.categoria === item.name).map(product => {
                                    return (
                                        <>
                                            <View key={product.id} style={styles.view3}>
                                                <Text style={styles.text2}>{product.name}</Text>
                                                <Text style={styles.text3}>€{product.price.toFixed(2)}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Image source={{ uri: product.image }} style={styles.image} />
                                            </View>
                                        </>
                                    )
                                })}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default MenuScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    view1: {
        paddingHorizontal: 10,
    },
    view2: {
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: colors.grey5,
    },
    view3: {
        // flexDirection: '',
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 10
    },
    text1: {
        color: colors.grey3,
        fontSize: 18,
        fontWeight: "bold",
    },
    text2: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
})
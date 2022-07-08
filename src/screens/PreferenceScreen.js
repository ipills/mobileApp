import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import React, { Component } from 'react'
import { colors } from '../global/styles'
import { Icon, CheckBox } from 'react-native-elements'

export default class PreferenceScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <Image
                            style={styles.backgroundImage}
                            source={{ uri: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' }}
                        />
                    </View>
                    <View style={styles.view12}>
                        <Icon
                            name='arrow-left'
                            type='material-community'
                            color={colors.cardbackground}
                            size={30}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                    <View style={styles.view1}>
                        <Text style={styles.text1}>Farmaco</Text>
                        <Text style={styles.text2}>Este Farmaco é muito fixe, porque faz bem as peles é tal, eu diria que é um queque drenante</Text>
                    </View>
                </ScrollView>
                <View style={styles.view14}>
                    <Text style={styles.text11}>Quantidade</Text>
                </View>
                <View style={styles.view14}>
                    <View style={styles.view15}>
                        <Icon
                            name="remove"
                            type="material"
                            color={colors.black}
                            size={25}
                        />
                    </View>
                    <Text style={styles.text9}>Quantidade Numero</Text>
                    <View style={styles.view16}>
                        <Icon
                            name="add"
                            type="material"
                            color={colors.black}
                            size={25}
                        />
                    </View>
                </View>
                <View style={styles.view17}>
                    <View style={styles.view18}>
                        <Text style={styles.text10}>Preço: 200
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        width: "100%",
        backgroundColor: colors.buttons,
        overflow: 'hidden',
        height: 180//HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        width: "100%", //null,
        height: 180, //HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: "bold",
        marginLeft: 40
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        //paddingTop: Platform.OS !== 'ios' ?
        //HEADER_MAX_HEIGHT : 0,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },

    view1: {
        backgroundColor: "white",
        padding: 10,
        marginBottom: 10
    },

    text1: {
        fontSize: 15,
        color: colors.grey1,
        fontWeight: "bold"
    },

    text2: {
        fontSize: 14,
        color: colors.grey2,
        marginTop: 5
    },
    view2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    text3: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.grey1,
        marginLeft: 10
    },

    viw3: {
        borderWidth: 3,
        borderColor: colors.grey5,
        borderRadius: 5,
        marginRight: 10
    },

    text4: {
        fontWeight: "bold",
        color: colors.grey3,
        padding: 5
    },

    view4: {
        backgroundColor: "white",
        marginBottom: 10
    },
    view5: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10
    },
    view6: {
        flexDirection: "row",
        alignItems: "center"
    },
    text5: { fontWeight: "bold", marginLeft: -10 },
    text6: { fontSize: 16, fontWeight: "bold", },

    view7: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    text8: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.grey1,
        marginLeft: 10
    },

    view9: {
        borderWidth: 3,
        borderColor: colors.grey5,
        borderRadius: 5,
        marginRight: 10
    },

    text7: {
        fontWeight: "bold",
        color: colors.grey3,
        padding: 5
    },

    view10: {
        backgroundColor: "white",
        marginBottom: 10
    },

    view11: {
        flexDirection: "row",
        alignItems: "center",
    },

    view12: {
        position: "absolute",
        top: 20,
        left: 15
    },

    view13: {
        paddingBottom: 0,
        marginTop: 5,
    },

    text11: {
        paddingLeft: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: colors.grey3
    },

    view14: {
        flexDirection: "row",
        backgroundColor: colors.cardbackground,
        paddingVertical: 5, marginBottom: 0,
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 5
    },

    view15: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgb(90, 190, 20)',
        alignItems: "center",
        justifyContent: "center"
    },

    text9: {
        fontWeight: "bold",
        fontSize: 18,
    },
    view16: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgb(90, 190, 20)',
        alignItems: "center",
        justifyContent: "center"
    },

    view17: {
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.cardbackground,
        marginTop: -5
    },

    view18: {
        backgroundColor: colors.buttons,
        alignItems: "center",
        paddingVertical: 5,
        marginBottom: 0,
        width: 320,
        borderRadius: 12
    },

    text10: {
        padding: 10,
        fontWeight: "bold",
        fontSize: 18,
    },

    view19: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10
    }

})
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import FarmaciaHeader from '../components/FarmaciaHeader'
import { colors, fonts } from '../global/styles'
import { dataFarmacias } from '../global/data'
import { Icon } from 'react-native-elements'
import { TabView, TabBar } from 'react-native-tab-view';
import MenuScreen from '../../FarmaciaTabs/MenuScreen'
import { db } from '../../firebase'
import * as firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = SCREEN_WIDTH;

function useOnceCall(cb, condition = true) {
    const isCalledRef = useRef(false);

    useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

const FarmaciaHomeScreen = ({ navigation, route }) => {

    const { farmaciaNome, farmaciaImage, farmaciaDist, morada, entrega, recolha, productosData } = route.params;
    const [farmacias, setFarmacias] = useState([]);
    const [productDat, setProductDat] = useState([]);
    const [cart, setCart] = useState([]);

    const [routes] = useState([
        { key: 'first', title: "Homem" },
        { key: 'second', title: "Mulher" },
        { key: 'third', title: "Bébe" },
        { key: 'fourth', title: "Cremes" },
        { key: 'fifth', title: "Anti-Inflamatorios" },
        { key: 'sixth', title: "Vida Sexual" },
        { key: 'seventh', title: "Covid-19" },
        { key: 'eighth', title: "Nutrição" },

    ])
    const [index, setIndex] = useState(0);
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.cardbackground }}
            tabStyle={styles.tabStyle}
            scrollEnabled={true}
            style={styles.tab}
            labelStyle={styles.tabLabel}
            contentContainerStyle={styles.tabContainer}
        />
    )

    const UpdateRoute1 = () => {

    }

    useEffect(async () => {
        const cart = await AsyncStorage.getItem('cart');
        if (cart && cart.length > 0) {
            setCart(JSON.parse(cart));
        } else {
            await AsyncStorage.setItem('cart', JSON.stringify([]))
            setCart([]);
        }
    }, []);

    useOnceCall(async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        console.log(currentUserUid)
        db.ref().child("users").child(currentUserUid).get().then((snapshot) => {
            // console.log(snapshot);
            if (snapshot.exists()) {
                getData();
                getProdutos();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, true);

    function getData() {
        const db = firebase.database().ref();
        db.child('farmacias').get().then((snapshot) => {
            if (snapshot.exists()) {
                const farmacias = snapshotToArray(snapshot);

                const _f = farmacias.filter(f => f.nome === farmaciaNome);

                setFarmacias(_f)

                console.log("Aconteceu")
            }
            console.log("No data available");

        }).catch((error) => {
            console.error(error);
        });
    }
    function getProdutos() {
        const db = firebase.database().ref();
        db.child('productData').get().then((snapshot) => {
            if (snapshot.exists()) {
                const productDat = snapshotToArray(snapshot);
                if (snapshot !== "") {
                    const data = productDat
                    setProductDat(data)
                } else {
                    console.log("Não aconteceu")
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.containerHeader}>
                        <ImageBackground
                            style={styles.containerHeader}
                            source={{ uri: farmaciaImage }}
                            resizeMode="cover"
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
                    <View style={styles.view1}>
                    </View>
                    <View style={styles.view2}>
                        <View style={styles.view3}>
                            <Text style={styles.text2}>{farmaciaNome}</Text>
                            <Text style={styles.text3}>{morada}</Text>
                            <View style={styles.view4}>
                                <Icon
                                    name="map-marker"
                                    type="material-community"
                                    color={colors.grey3}
                                    size={15}
                                />
                                <Text style={styles.text3}>{farmaciaDist} Kms </Text>
                            </View>
                        </View>
                        <View style={styles.view5}>
                            <Text style={styles.text6}>Levantar</Text>
                            <View style={styles.view7}>
                                <Text style={styles.text7}>{recolha}</Text>
                                <Text style={styles.text8}>min</Text>
                            </View>
                        </View>
                        <View style={styles.view8}>
                            <Text style={styles.text6}>Entrega</Text>
                            <View style={styles.view9}>
                                <Text style={styles.text9}>{entrega}</Text>
                                <Text style={styles.text11}>min</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.view10}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={UpdateRoute1}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={renderTabBar}
                        tabBarPosition='top'
                    />
                </View>

                {index === 0 &&
                    <ScrollView
                        data={productDat}
                    >
                        {productDat.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        navigation.navigate('PreferenceScreen', { produto: item })
                                    }
                                >
                                    <View style={styles.view1List}>
                                        <View style={styles.view2List}>
                                            <View style={styles.view3List}>
                                                <Text style={styles.text1List}>{item.name}</Text>
                                                <Text style={styles.text2List}>{parseFloat(item.price).toFixed(2)}€</Text>
                                            </View>
                                            <View style={styles.view4List}>
                                                <Image
                                                    style={styles.imageList}
                                                    source={{ uri: item.image }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                }
            </ScrollView>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('ShoppingCart', { idFarmacia: farmacias[0].key })
                }
            >
                <View style={styles.view11}>
                    <View style={styles.view12}>
                        <Text style={styles.text13}>Ver Carrinho</Text>
                        <View style={styles.view13}>
                            <Text style={styles.text13}>{cart ? cart.length : 0}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FarmaciaHomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
    containerHeader: {
        height: 150,
        flex: 1,
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
    view1: {
        width: "100%",
        padding: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    text1: {
        color: "green",
        fontSize: 14,
        fontWeight: "bold"
    },
    view2: {
        flexDirection: "row",
        flex: 1,
        marginBottom: 5,
        marginHorizontal: 10,
        justifyContent: "space-between",
    },
    view3: {
        flex: 8,
    },
    text2: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.grey1
    },
    text3: {
        fontSize: 15,
        color: colors.grey3
    },
    view4: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
    text4: {
        fontFamily: fonts.android.bold,
        fontSize: 13,
        color: colors.grey3,
        marginLeft: 2,
    },
    text5: {
        fontFamily: fonts.android.bold,
        fontSize: 13,
        color: colors.grey3,
        marginLeft: 2,
        marginRight: 5,
    },
    text6: {
        fontFamily: fonts.android.bold,
        fontSize: 13,
        color: colors.grey3,
        marginLeft: 0,
    },
    view5: {
        flex: 3,
        alignItems: "center"
    },
    text6: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.grey1
    },
    view7: {
        width: 40,
        height: 40,
        alignItems: "center",
        borderRadius: 20,
        justifyContent: "space-around",
    },
    text7: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.black,
        marginTop: 5
    },
    text8: {
        fontSize: 13,
        color: colors.black,
        marginBottom: 5
    },
    view8: {
        flex: 3,
        alignItems: "center"
    },
    text9: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.cardbackground
    },
    view9: {
        width: 40,
        height: 40,
        backgroundColor: colors.orange,
        alignItems: "center",
        borderRadius: 20,
        justifyContent: "space-around",
    },
    text10: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.cardbackground,
        marginTop: 5
    },
    text11: {
        fontSize: 13,
        color: colors.cardbackground,
        marginBottom: 5
    },
    view10: {
        elevation: 10,
        backgroundColor: colors.pagebackground
    },
    view11: {
        backgroundColor: colors.orange,
        height: 50,
        alignContent: "center",
        marginBottom: 0,
        justifyContent: "center",
    },
    view11Scroll: {
        backgroundColor: colors.grey5,
        height: 50,
        alignContent: "center",
        marginVertical: 5,
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
        fontSize: 12,
        color: colors.cardbackground
    },
    text12Scroll: {
        padding: 5,
        fontWeight: "bold",
        fontSize: 12,
        color: colors.grey3
    },
    view13: {
        borderWidth: 1,
        marginRight: 10,
        borderColor: colors.background,
        borderRadius: 6,
        paddingBottom: 2
    },
    view13Scroll: {
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
    text13Scroll: {
        paddingHorizontal: 3,
        fontWeight: "bold",
        fontSize: 12,
        color: colors.grey2,
    },
    tab: {
        paddingTop: 0,
        backgroundColor: colors.orange,
        justifyContent: "space-between",
        alignItems: "center",
    },
    tabContainer: {
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    tabLabel: {
        fontWeight: "bold",
        color: colors.cardbackground
    },
    tabStyle: {
        width: SCREEN_WIDTH / 4,
        maxHeight: 45,
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
    imageList: {
        height: 65,
        width: 75,
    }

})
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Pressable, Image, Dimensions, StatusBar } from 'react-native'
import { Icon } from 'react-native-elements'
import HomeHeader from '../components/HomeHeader'
import { colors, parameters } from '../global/styles'
import { filterData, dataFarmacias } from "../global/data"
import FarmaciaView from '../components/FarmaciaView'
import { navigate } from '../navigation/utils/rootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../../firebase'
import { useNavigation } from '@react-navigation/native'

const SCREEN_WIDTH = Dimensions.get('window').width

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

export default function HomeScreen() {

    const [delivery, setDelivery] = useState(true)
    const [farmacias, setFarmacias] = useState([])
    const [indexCheck, setindexCheck] = useState("0")
    const [userData, setUserData] = useState({})
    const [nearF, setNearF] = useState([])
    const navigation = useNavigation()


    useOnceCall(async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        console.log(currentUserUid)
        db.ref().child("users").child(currentUserUid).get().then((snapshot) => {
            console.log(snapshot);
            if (snapshot.exists()) {
                setUserData(snapshot.val())
                getFarmacias();
                getNearF();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, true);

    function getFarmacias() {
        const localizacaoId = indexCheck;
        db.ref().child("farmacias").get().then((snapshot) => {
            if (snapshot.exists()) {
                const farmacias = snapshotToArray(snapshot)

                const _f = farmacias.filter(f => f.localizacaoId === localizacaoId)

                setFarmacias(_f)
            } else {
                console.log("No data available");
            }
        });
    }
    function getNearF() {
        db.ref().child("farmacias").get().then((snapshot) => {
            if (snapshot.exists()) {
                const farmacias = snapshotToArray(snapshot)

                console.log(farmacias);

                const _f = farmacias.filter(f => f.localizacaoId === "1")

                setNearF(_f)
            } else {
                console.log("No data available");
            }
        });
    }


    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                barStyle="light-content"
                backgroundColor="rgba(255,140, 82,1)"
            />
            <HomeHeader />
            <ScrollView
                stickyHeaderIndices={[0]}
                showsHorizontalScrollIndicator={true}
            >
                <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 10 }}>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "space-evenly" }}>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(true)
                            }}
                        >
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.orange : colors.grey5 }}>
                                <Text style={styles.deliveryText}>Entrega</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setDelivery(false)
                                navigate('MapScreen')
                            }}
                        >
                            <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.grey5 : colors.orange }}>
                                <Text style={styles.deliveryText}>Recolha na Farmacia</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.filterView}>
                    <View style={styles.addressView}>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}>
                            <Icon
                                type="material-community"
                                name="map-marker"
                                color={colors.grey1}
                            />
                            <Text style={{ marginLeft: 5 }}>{userData.morada}</Text>
                        </View>
                    </View>
                    <View>
                        <Icon
                            type="material-community"
                            name="tune"
                            color={colors.grey1}
                            size={26}
                        />
                    </View>
                </View>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Localização</Text>
                </View>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={filterData}
                        keyExtractor={(item) => item.id}
                        extraData={indexCheck}
                        renderItem={({ item, index }) => (
                            <Pressable
                                onPress={() => {
                                    setindexCheck(item.id)
                                    getFarmacias();
                                }}
                            >
                                <View style={indexCheck === item.id ? { ...styles.smallCardSelected } : { ...styles.smallCard }}>
                                    <Image
                                        style={{ height: 60, width: 60, borderRadius: 30 }}
                                        source={item.image}
                                    />
                                    <View>
                                        <Text style={indexCheck === item.id ? { ...styles.smallCardTextSelected } : { ...styles.smallCardText }}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Encomenda Mais Rapida</Text>
                </View>
                <View>
                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={true}
                        data={farmacias}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item, index }) => {
                                return (
                                    <View key={item.id} style={{ paddingBottom: 20 }}>
                                        <FarmaciaView
                                            screenWidth={SCREEN_WIDTH * 0.8}
                                            images={item.images}
                                            farmaciaName={item.nome}
                                            distancia={item.distancia}
                                            farmaciaMorada={item.farmaciaMorada}
                                            OnPressFarmaciaView={() => {
                                                console.log('Olá')
                                            }}
                                        />
                                    </View>
                                )
                            }
                        }
                    />
                </View>
                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>Fármacias Perto de Si</Text>
                </View>
                <View>
                    <FlatList
                        style={{ marginTop: 10, marginBottom: 10 }}
                        horizontal={false}
                        data={nearF}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item, index }) => {
                                console.log(item);
                                return (
                                    <View key={item.id} style={{ paddingBottom: 20 }}>
                                        <FarmaciaView
                                            screenWidth={SCREEN_WIDTH * 0.95}
                                            images={item.images}
                                            farmaciaName={item.nome}
                                            distancia={item.distancia}
                                            farmaciaMorada={item.farmaciaMorada}
                                            onPress={() => {
                                                console.log('Olá')
                                            }}
                                        />
                                    </View>
                                )
                            }
                        }
                    />
                </View>
            </ScrollView>
            {delivery &&
                <View style={styles.floatButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('MapScreen')
                        }}
                    >
                        <Icon
                            name="place"
                            type="material"
                            size={32}
                            color={colors.orange}
                        />
                        <Text style={{ color: colors.grey2 }}>Mapa</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 20,
    },
    deliveryButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5,
    },
    deliveryText: {
        marginLeft: 5,
        fontSize: 16
    },
    filterView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginHorizontal: 10,
        marginVertical: 10
    },
    clockView: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        backgroundColor: colors.cardbackground,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginRight: 20
    },
    addressView: {
        flexDirection: "row",
        backgroundColor: colors.grey5,
        borderRadius: 15,
        paddingVertical: 3,
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    headerText: {
        color: colors.grey1,
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    headerTextView: {
        backgroundColor: colors.grey5,
        paddingVertical: 3,
    },

    smallCard: {
        borderRadius: 30,
        backgroundColor: colors.grey5,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        marginTop: 10,
        marginRight: 28,
        marginLeft: 28,
        marginBottom: 10,
        height: 100,
    },

    smallCardSelected: {
        borderRadius: 30,
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        width: 80,
        marginTop: 10,
        marginRight: 28,
        marginLeft: 28,
        marginBottom: 10,
        height: 100,
    },
    smallCardTextSelected: {
        fontWeight: "bold",
        color: colors.cardbackground,
    },
    smallCardText: {
        fontWeight: "bold",
        color: colors.grey2,
    },
    floatButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: "center",
    }
})
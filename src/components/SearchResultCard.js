import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { colors } from '../global/styles'
import { Icon } from 'react-native-elements'
import { db } from '../../firebase'
import * as firebase from 'firebase'
import ProductCard from './ProductCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const SearchResultCard = ({
    OnPressFarmaciaCard,
    farmaciaName,
    farmaciaMorada,
    distancia,
    images,
}) => {

    const [produtos, setProdutos] = useState([]);

    useOnceCall(async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        db.ref().child("users").child(currentUserUid).get().then((snapshot) => {
            if (snapshot.exists()) {
                getProdutos();
            } else {
                console.log("No data available/UID");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, true);

    function getProdutos() {
        const db = firebase.database().ref();
        db.child('productData').get().then((snapshot) => {
            if (snapshot.exists()) {
                const produtos = snapshotToArray(snapshot);
                if (snapshot !== "") {
                    const data = produtos
                    console.log("snapshot")
                    setProdutos(data)
                } else {
                    console.log("Não aconteceu")
                }
            } else {
                console.log("No data available/productData");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <View>
            <TouchableOpacity
                onPress={OnPressFarmaciaCard}
            >
                <View style={styles.view1}>
                    <View style={{ height: 150 }}>
                        <ImageBackground
                            style={{ height: 160 }}
                            source={{ uri: images }}
                            imageStyle={styles.imageStyle}
                        />
                    </View>
                </View>
                <View style={styles.view3}>
                    <View style={{ paddingTop: 5 }}>
                        <Text style={styles.text5}>{farmaciaName}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.view4}>
                            <Icon
                                name="place"
                                type="material"
                                color={colors.CardComment}
                                size={18}
                                iconStyle={{ marginTop: 3, marginLeft: 0 }}
                            />
                            <Text style={styles.view5}>{distancia} Km</Text>
                        </View>
                        <View style={{ flex: 9 }}>
                            <Text style={styles.text6}>{farmaciaMorada}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ margintop: 5, paddingBottom: 20 }}>
                <FlatList
                    style={{ backgroundColor: colors.cardbackground }}
                    data={produtos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <ProductCard
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        )
                    }}
                    horizontal={true}
                />
            </View>
        </View>
    )
}

export default SearchResultCard

const styles = StyleSheet.create({
    view1: {
        marginHorizontal: 9,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    image: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: 'rgba(52,52,52,0.4)',
        padding: 2,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 12
    },
    imageStyle: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    text1: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -3
    },
    text2: {
        color: "white",
        fontSize: 13,
        marginRight: 0,
        marginTop: 0
    },
    view2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 5,
    },
    text3: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.grey2,
    },
    text4: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.grey2,
    },
    view3: {
        flexDirection: "column",
        marginHorizontal: 5,
        marginBottom: 10,
        marginLeft: 0
    },
    text5: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.grey1,
        paddingLeft: 8,
    },
    view4: {
        flex: 4,
        flexDirection: "row",
        borderRightWidth: 1,
        borderRightColor: colors.grey4,
        paddingHorizontal: 5,
    },
    view5: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 5,
        color: colors.grey3
    },
    text6: {
        fontSize: 12,
        paddingTop: 5,
        color: colors.grey2,
        paddingHorizontal: 10,
    }

})
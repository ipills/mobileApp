import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../global/styles';
import MapsFarmaciaCard from './MapsFarmaciaCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase';
import * as firebase from 'firebase'

const SCREEN_WIDTH = Dimensions.get('window').width;

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

export default function FarmaciaMapScreen() {

    const navigation = useNavigation();
    const [delivery, setDelivery] = useState(false)
    const [farmacia, setFarmacia] = useState([]);

    const regiao = {
        latitude: 41.15,
        longitude: -8.6,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    useOnceCall(async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        console.log(currentUserUid)
        db.ref().child("users").child(currentUserUid).get().then((snapshot) => {
            // console.log(snapshot);
            if (snapshot.exists()) {
                getData();
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
                const farmacia = snapshotToArray(snapshot);
                if (snapshot !== "") {
                    console.log("Sucesso");
                    const data = farmacia
                    setFarmacia(data)
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
        <View style={{ flex: 1, marginTop: 30 }}>
            <View style={{ backgroundColor: colors.cardbackground, paddingBottom: 10 }}>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "space-evenly" }}>
                    <TouchableOpacity
                        onPress={() => {
                            setDelivery(true)
                            navigation.navigate('HomeScreen')
                        }}
                    >
                        <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.orange : colors.grey5 }}>
                            <Text style={styles.deliveryText}>Entrega</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setDelivery(false)

                        }}
                    >
                        <View style={{ ...styles.deliveryButton, backgroundColor: delivery ? colors.grey5 : colors.orange }}>
                            <Text style={styles.deliveryText}>Recolha na Farmacia</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <MapView
                style={{ height: '100%', width: '100%' }}
                initialRegion={{
                    latitude: 38.766627,
                    longitude: -9.200547,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={regiao}
                    pinColor="#ff8c52"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    deliveryButton: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5,
    },
    deliveryText: {
        marginLeft: 5,
        fontSize: 16
    },
})
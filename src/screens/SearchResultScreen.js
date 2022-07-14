import { StyleSheet, Text, View, Dimensions, FlatList, Alert } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import SearchResultCard from '../components/SearchResultCard'
import { dataFarmacias } from '../global/data'
import { colors } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase'
import * as firebase from 'firebase';

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

const SearchResultScreen = ({ navigation, route }) => {

    const [farmacia, setFarmacia] = useState([]);
    const [productDat, setProductDat] = useState([]);

    useOnceCall(async () => {
        const currentUserUid = await AsyncStorage.getItem('currentUserUid')
        console.log(currentUserUid)
        db.ref().child("users").child(currentUserUid).get().then((snapshot) => {
            if (snapshot.exists()) {
                getData();
                getProduct();
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
        }); //
    }
    function getProduct() {
        const db = firebase.database().ref();
        db.child('productData').get().then((snapshot) => {
            if (snapshot.exists()) {
                const productDat = snapshotToArray(snapshot);

                const data = productDat
                setProductDat(data)

                console.log("Aconteceu")

            }
        }).catch((error) => {
            console.error(error);
        }); //
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    style={{ backgroundColor: colors.cardbackground }}
                    data={farmacia}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item, index }) => {
                            return (
                                <SearchResultCard
                                    screenWidth={SCREEN_WIDTH}
                                    images={item.images}
                                    farmaciaName={item.nome}
                                    distancia={item.distancia}
                                    farmaciaMorada={item.farmaciaMorada}
                                    tempoEnt={item.tempoEntrega}
                                    tempoRec={item.tempoRecolha}
                                    productData={productDat}
                                    OnPressFarmaciaCard={() => {
                                        if (item.distancia < 100) {
                                            {
                                                navigation.navigate("FarmaciaHomeScreen", {
                                                    farmaciaNome: item.nome, farmaciaImage: item.image, farmaciaDist: item.distancia,
                                                    morada: item.farmaciaMorada, productosData: productDat, entrega: item.tempoEntrega, recolha: item.tempoRecolha
                                                })
                                            }
                                        } else {
                                            Alert.alert("Atenção", "Esta Farmácia não esta disponivel para entrega ao seu local")
                                        }
                                    }
                                    }
                                />
                            )
                        }
                    }
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.listHeader}>{farmacia.length} Resultados em {route.params.item}</Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default SearchResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    listHeader: {
        color: colors.grey1,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: 'bold',
    }

})
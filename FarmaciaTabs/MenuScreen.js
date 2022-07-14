import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { colors, Icon } from 'react-native-elements'
import { filterData2 } from '../src/global/data'
import { useNavigation } from '@react-navigation/native'

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

const MenuScreen = () => {

    const navigation = useNavigation();
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

    function getProduct() {
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
        }); //
    }
    return (
        <View styles={styles.container}>
            <FlatList
                data={productDat}
                name={productDat.name}
                price={productDat.price}
                image={productDat.image}
                keyExtractor={(item) => item.key}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('PreferenceScreen', { item })}>
                    </TouchableOpacity>
                )}
            />
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
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native'
import SearchComponent from '../components/SearchComponent';
import { filterData2 } from "../global/data";
import { colors } from '../global/styles';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchScreen() {

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, marginTop: 30 }}>
            <SearchComponent />
            <View>
                <FlatList
                    style={{ marginBottom: 1, marginTop: 13 }}
                    data={filterData2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                navigation.navigate("SearchResultScreen", { item: item.name })
                            }}
                        >
                            <View style={styles.imageView}>
                                <ImageBackground
                                    style={styles.image}
                                    source={item.image}
                                >
                                    <View style={styles.imageView}>
                                        <Text style={{ color: colors.cardbackground }}>{item.name}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListHeaderComponent={<Text style={styles.listHeader}>Categorias Recomendadas</Text>}
                    ListFooterComponent={<Footer />}
                />
            </View>
        </View>
    )
}

const Footer = () => {
    return (
        <View style={{ marginTop: 10, marginBottom: 30 }}>
            <View>
                <FlatList
                    style={{ marginBottom: 20 }}
                    data={filterData2}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                navigation.navigate("SearchResultScreen", { item: item.name })
                            }}
                        >
                            <View style={styles.imageView}>
                                <ImageBackground
                                    style={styles.image}
                                    source={item.image}
                                >
                                    <View style={styles.imageView}>
                                        <Text style={{ color: colors.cardbackground }}>{item.name}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListHeaderComponent={<Text style={styles.listHeader}>Todas as Categorias</Text>}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.4475,
        height: SCREEN_WIDTH * 0.4475,
        marginLeft: SCREEN_WIDTH * 0.035,
        marginBottom: SCREEN_WIDTH * 0.035,
    },
    image: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        borderRadius: 10,
    },
    listHeader: {
        fontSize: 16,
        color: colors.grey2,
        paddingBottom: 10,
        marginLeft: 12,
    },
    textView: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(52,52,52,0.3)",

    }
})

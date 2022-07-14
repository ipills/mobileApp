import react from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, withBadge } from 'react-native-elements'
import { colors, parameters } from '../global/styles';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../navigation/utils/rootNavigation';

export default function HomeHeader() {
    return (
        <View style={styles.header}>
            <View>
                <Image
                    style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}
                    source={require('../../assets/logo512.png')}
                />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", }}>
                <Text style={{ color: colors.cardbackground, fontSize: 25, fontWeight: 'bold' }}>iPills</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        backgroundColor: colors.orange,
        height: parameters.headerHeight,
        justifyContent: 'center',
    }

})
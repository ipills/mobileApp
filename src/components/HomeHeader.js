import react from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, withBadge } from 'react-native-elements'
import { colors, parameters } from '../global/styles';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../navigation/utils/rootNavigation';

export default function HomeHeader() {
    const BadgeIcon = withBadge(0)(Icon);
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <View style={{ alignItems: "center", justifyContent: 'center', marginLeft: 15 }}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.cardbackground}
                    size={36}
                    onPress={() => {
                        navigation.toggleDrawer();
                        console.log(navigation.getState());
                    }}
                />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: colors.cardbackground, fontSize: 25, fontWeight: 'bold' }}>iPills</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                <BadgeIcon
                    type="material-community"
                    name="cart"
                    size={35}
                    color={colors.cardbackground}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        backgroundColor: colors.orange,
        height: parameters.headerHeight,
        justifyContent: 'space-between',
    }

})
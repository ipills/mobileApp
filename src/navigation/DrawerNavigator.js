import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootClientTabs from './ClientTabs';
import { Icon } from 'react-native-elements';
import { colors } from '../global/styles';

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="RootClientTabs"
                component={RootClientTabs}
                options={{
                    headerShown: false,
                    title: 'Client',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="home"
                            type="material-community"
                            color={focused ? '#7cc' : colors.grey2}
                            size={size}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}
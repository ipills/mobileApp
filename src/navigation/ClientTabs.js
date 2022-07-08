import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { colors } from '../global/styles';

import HomeScreen from '../screens/HomeScreen';
import { ClientStack } from './ClientStack';
import MyAccountScreen from '../screens/MyAccountScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import farmaciaMapScreen from '../screens/FarmaciaMapScreen';



const ClientTabs = createBottomTabNavigator();

export default function RootClientTabs() {
    return (
        <ClientTabs.Navigator
            screenOptions={{
                activeTintColor: colors.orange,

            }}
        >
            <ClientTabs.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Inicio",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="home"
                                type="material"
                                color={color}
                                size={size}
                            />
                        )
                    }

                }

            />
            <ClientTabs.Screen
                name="ClientStack"
                component={ClientStack}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Procurar",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="search"
                                type="material"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />
            <ClientTabs.Screen
                name="MyOrdersScreen"
                component={MyOrdersScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Meus Pedidos",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="view-list"
                                type="material"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />
            <ClientTabs.Screen
                name="MyAccountScreen"
                component={MyAccountScreen}
                options={
                    {
                        headerShown: false,
                        tabBarLabel: "Minha Conta",
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                                name="person"
                                type="material"
                                color={color}
                                size={size}
                            />
                        )
                    }
                }
            />
        </ClientTabs.Navigator>
    )
}
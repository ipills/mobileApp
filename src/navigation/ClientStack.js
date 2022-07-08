import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import FarmaciaHomeScreen from '../screens/FarmaciaHomeScreen';
import PreferenceScreen from '../screens/PreferenceScreen';
import ShoppingCart from '../screens/ShoppingCart';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const ClientSearch = createStackNavigator();

export function ClientStack({ navigation, route }) {
    return (
        <ClientSearch.Navigator>
            <ClientSearch.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={() => ({
                    headerShown: false,
                })
                }
            />
            <ClientSearch.Screen
                name="SearchResultScreen"
                component={SearchResultScreen}
                options={() => ({
                    headerShown: false,
                })
                }
            />
            <ClientSearch.Screen
                name="FarmaciaHomeScreen"
                component={FarmaciaHomeScreen}
                options={() => ({
                    headerShown: false,
                    tabBarVisible: false,
                })
                }
            />
            <ClientSearch.Screen
                name="PreferenceScreen"
                component={PreferenceScreen}
                options={() => ({
                    headerShown: false,
                })
                }
            />
            <ClientSearch.Screen
                name="ShoppingCart"
                component={ShoppingCart}
                options={() => ({
                    headerShown: false,
                })
                }
            />
        </ClientSearch.Navigator>
    )
}

const styles = StyleSheet.create({})
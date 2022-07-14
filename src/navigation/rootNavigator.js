import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./authNavigation";
import { navigationRef } from "./utils/rootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootClientTabs from "./ClientTabs";

export default function RootNavigator() {

    return (
        <NavigationContainer ref={navigationRef}>
            {
                <AuthStack />
            }

        </NavigationContainer>
    )
}
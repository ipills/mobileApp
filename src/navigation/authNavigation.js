import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInWelcomeScreen from "../screens/authScreens/SignInWelcomeScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
import SignUpScreen from "../screens/authScreens/SignUpScreen";
import DrawerNavigator from "./DrawerNavigator";
import RootClientTabs from "./ClientTabs";
import farmaciaMapScreen from "../screens/FarmaciaMapScreen";
import { ClientStack } from "./ClientStack";
import { TransitionPresets } from "@react-navigation/stack";

import ChangePassword from "../screens/authScreens/PasswordChange";
import EmailChange from "../screens/authScreens/EmailChange";
import DeleteAccount from "../screens/authScreens/DeleteAccount";
import ChangeMorada from "../screens/authScreens/ChangeAddress";

const Auth = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Auth.Navigator>
            <>
                <Auth.Screen
                    name="SignInWelcomeScreen"
                    component={SignInWelcomeScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="App"
                    component={DrawerNavigator}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="ClientTabs"
                    component={RootClientTabs}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="ClientStack"
                    component={ClientStack}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="MapScreen"
                    component={farmaciaMapScreen}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="ChangeEmail"
                    component={EmailChange}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="DeleteAccount"
                    component={DeleteAccount}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
                <Auth.Screen
                    name="ChangeAddress"
                    component={ChangeMorada}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.RevealFromBottomAndroid
                    }}
                />
            </>
        </Auth.Navigator>
    )
}
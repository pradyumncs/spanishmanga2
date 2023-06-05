import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/";
import { icons, COLORS } from "../constants";
import Pdfs from "../screens/Pdfs";
import Search from "../screens/Search";
import Offer from "../screens/Offer";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ImageBackground, ScrollView, BackHandler } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route, focused }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: [{display: 'flex'}, {backgroundColor: COLORS.white}],
                tabBarIcon: () => {
                    const tintColor = focused ? COLORS.white : COLORS.gray;

                    switch (route.name) {
                        case "Hometab":
                            return (
                                <Image
                                    source={icons.dashboard_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Search":
                            return (
                                <Image
                                    source={icons.search_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )

                        case "Setting":
                            return (
                                <Image
                                    source={icons.menu_icon}
                                    resizeMode="contain"
                                    style={{
                                        tintColor: tintColor,
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            )
                    }
                }
            })}
        >
            <Tab.Screen
                name="Hometab"
                component={Home}
            />
            <Tab.Screen
                name="Search"
                component={Offer}
            />
            <Tab.Screen
                name="Setting"
                component={Search}
            />
        </Tab.Navigator>
    )
}

export default Tabs;

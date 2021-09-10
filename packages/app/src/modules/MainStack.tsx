import React from "react";
import { Feather } from "@expo/vector-icons";
import { MainStackParamList } from "./main/MainNav";
import { Main } from "./main/Main";
import { Search } from "./main/Search";
import { SelfProfile } from "./main/SelfProfile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, fonts, layout } from "../theme";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useApolloClient } from "@apollo/client";
import { NewPodcast } from "./main/NewPodcast";

interface MainStackProps {}

// const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainStack: React.FC<MainStackProps> = ({}) => {
    const client = useApolloClient();
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{
                headerStyle: {
                    borderBottomColor: "#696969",
                    borderBottomWidth: 0.2,
                },
                headerTitleStyle: {
                    color: "#fff",
                    fontFamily: fonts.inter_600,
                    fontSize: 20,
                },
                tabBarStyle: {
                    backgroundColor: colors.dogeBlack,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.navigation.active,
                tabBarInactiveTintColor: colors.navigation.inActive,
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name="home"
                            size={23}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="Home"
                component={Main}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="search1"
                            size={layout.iconSize}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="Search"
                component={Search}
            />
            <Tab.Screen
                options={{
                    headerTitle: "New Podcast",
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="plus"
                            size={layout.iconSize + 7}
                            color={
                                focused
                                    ? colors.navigation.active
                                    : colors.navigation.inActive
                            }
                        />
                    ),
                }}
                name="NewPodcast"
                component={NewPodcast}
            />
            <Tab.Screen name="SelfProfile" component={SelfProfile} />
        </Tab.Navigator>
    );
};

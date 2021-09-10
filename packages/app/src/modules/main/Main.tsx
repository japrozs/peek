import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { fonts } from "../../theme";
import { PodcastPage } from "../shared/PodcastPage";
import { HomePage } from "./HomePage/Home";
import { HomeStackParamList } from "./HomePage/HomeNav";

interface MainProps {}

const Stack = createStackNavigator<HomeStackParamList>();

export const Main: React.FC<MainProps> = ({}) => {
    return (
        <Stack.Navigator
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
            }}
            initialRouteName={"HomePage"}
        >
            <Stack.Screen
                options={{
                    headerTitle: "Feed",
                }}
                name="HomePage"
                component={HomePage}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Podcast",
                }}
                name="PodcastPage"
                component={PodcastPage}
            />
        </Stack.Navigator>
    );
};

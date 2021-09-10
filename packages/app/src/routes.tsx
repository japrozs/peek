import { useApolloClient } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { useLogoutMutation, useMeQuery } from "./generated/graphql";
import { AuthStack } from "./modules/AuthStack";
import { MainStack } from "./modules/MainStack";
import { colors } from "./theme";

interface RoutesProps {}

export default function Routes() {
    const { data, loading } = useMeQuery();
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    let body: any = null;
    if (!loading && data?.me != null) {
        body = <MainStack />;
    } else {
        body = <AuthStack />;
    }

    return (
        <NavigationContainer
            theme={{
                // @ts-ignore
                colors: {
                    background: "#000",
                },
            }}
        >
            {body}
        </NavigationContainer>
    );
}

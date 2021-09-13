import React from "react";
import { View, Text } from "react-native";
import { ProfileImage } from "../../components/ProfileImage";
import { useMeQuery } from "../../generated/graphql";

interface SelfProfileProps {}

export const SelfProfile: React.FC<SelfProfileProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <View>
            {/* <ProfileImage imgUrl={data?.me?.imgUrl} variant={"regular"} /> */}
            <Text style={{ color: "#fff" }}>this is a really nice app</Text>
        </View>
    );
};

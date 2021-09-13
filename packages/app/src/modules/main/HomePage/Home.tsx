import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { colors, constants, fonts } from "../../../theme";
import Constants from "expo-constants";
import { useGetAllPodcastsQuery } from "../../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { HomeStackNav } from "./HomeNav";

interface MainProps {}

export const HomePage: React.FC<HomeStackNav<"HomePage">> = ({
    navigation,
}) => {
    const { data, loading } = useGetAllPodcastsQuery();
    return (
        <ScrollView>
            {data?.getAllPodcasts.map((pod) => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("PodcastPage", {
                            id: pod.id,
                        });
                    }}
                    key={pod.id}
                    style={styles.podcastContainer}
                >
                    <Text style={styles.podcastName}>{pod.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    podcastContainer: {
        backgroundColor: colors.dogeGray,
        padding: 14,
        margin: 10,
    },
    podcastName: {
        fontSize: 17,
        fontFamily: fonts.inter_500,
        color: "#fff",
    },
});

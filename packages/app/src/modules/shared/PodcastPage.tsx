import { useApolloClient } from "@apollo/client";
import { RouteProp } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGetPodcastQuery, useMeQuery } from "../../generated/graphql";
import { fonts } from "../../theme";
import { HomeStackNav } from "../main/HomePage/HomeNav";

interface PodcastPageProps {}

export type PropType = HomeStackNav<"PodcastPage">;

export const PodcastPage: React.FC<PropType> = ({ route }) => {
    const { data, loading } = useGetPodcastQuery({
        variables: {
            id: route.params.id,
        },
    });
    console.log(data);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {data?.getPodcast.creator.username} created a new podcast
            </Text>
            <Text style={styles.text}>{data?.getPodcast.title}</Text>
            <Text style={{ fontFamily: "Menlo", color: "#fff" }}>
                {data?.getPodcast.fileUrl}
            </Text>
            <Text style={[styles.text, { marginTop: 20 }]}>
                dont forget to create the audio player
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 17,
        fontFamily: fonts.inter_500,
    },
    container: {
        padding: 10,
    },
});

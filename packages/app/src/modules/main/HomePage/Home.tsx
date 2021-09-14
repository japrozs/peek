import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { colors, constants, fonts } from "../../../theme";
import Constants from "expo-constants";
import { useGetAllPodcastsQuery } from "../../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import {
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native-gesture-handler";
import { HomeStackNav } from "./HomeNav";
import { MiniPlayer } from "../../shared/MiniPlayer";
import { useStore } from "../../../store/useStore";

interface MainProps {}

export const HomePage: React.FC<HomeStackNav<"HomePage">> = ({
    navigation,
}) => {
    const { data, loading } = useGetAllPodcastsQuery();
    const setPodcast = useStore(
        (state) => (state as object & { setPodcast: Function }).setPodcast
    );
    return (
        <View style={{ height: "100%" }}>
            <ScrollView>
                {data?.getAllPodcasts.map((pod) => (
                    <TouchableOpacity
                        onPress={() => setPodcast(pod)}
                        key={pod.id}
                        style={styles.podcastContainer}
                    >
                        <Text style={styles.podcastName}>{pod.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <MiniPlayer />
        </View>
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

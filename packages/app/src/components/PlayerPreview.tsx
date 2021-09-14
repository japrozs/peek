import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Podcast } from "../generated/graphql";
import { useStore } from "../store/useStore";
import { colors, constants, fonts, layout } from "../theme";
import { Entypo } from "@expo/vector-icons";
import { stateWithPodcast } from "../types";

interface PlayerPreviewProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayerPreview: React.FC<PlayerPreviewProps> = ({
    setModalVisible,
}) => {
    const podcast = useStore((state) => (state as stateWithPodcast).podcast);
    if (podcast) {
        return (
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.container}
            >
                <Image
                    style={styles.img}
                    source={{ uri: constants.emptyIcon }}
                />
                <View style={{ marginLeft: 2 }}>
                    <Text style={styles.podcastTitle}>{podcast.title}</Text>
                    <Text style={styles.podcastCreator}>
                        {podcast.creator.username}
                    </Text>
                </View>
                <Entypo
                    style={styles.controlIcon}
                    name="controller-play"
                    size={layout.iconSize + 12}
                    color={colors.wheat}
                />
            </TouchableOpacity>
        );
    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.dogeGray,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 3,
        marginRight: 10,
    },
    podcastTitle: {
        color: "#fff",
        fontFamily: fonts.inter_600,
        fontSize: 17,
        marginBottom: 5,
        alignSelf: "stretch",
    },
    podcastCreator: {
        color: colors.textGray,
        fontSize: 14,
        fontFamily: fonts.inter_500,
    },
    controlIcon: {
        marginLeft: "auto",
        marginRight: 0,
    },
});

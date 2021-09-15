import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Podcast } from "../generated/graphql";
import { useStore } from "../store/useStore";
import {
    colors,
    constants,
    controlIconSize,
    controlIconSizeSmall,
    fonts,
    globalStyles,
    layout,
} from "../theme";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { stateWithPodcast } from "../types";
import { Audio } from "expo-av";

interface PlayerPreviewProps {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setAudio: React.Dispatch<React.SetStateAction<Audio.Sound | null>>;
    setStatus: any;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    audio: Audio.Sound | null;
    status: any;
    isPlaying: boolean;
}

export const PlayerPreview: React.FC<PlayerPreviewProps> = ({
    setModalVisible,
    setStatus,
    setIsPlaying,
    setAudio,
    status,
    audio,
    isPlaying,
}) => {
    const podcast = useStore((state) => (state as stateWithPodcast).podcast);
    useEffect(() => {
        if (audio === null) {
            setAudio(new Audio.Sound());
            Audio.setAudioModeAsync({
                staysActiveInBackground: true,
            });
        }
    }, []);

    const handlePausePlayAudio = async () => {
        if (audio !== null && status === null) {
            const status = await audio.loadAsync(
                {
                    uri: "http://192.168.1.5:4000/podcasts/56be463e-f742-46de-a9b2-2fa72462df70.mp3",
                },
                { shouldPlay: true }
            );
            setIsPlaying(true);
            return setStatus(status);
        }

        // It will pause our audio
        if (status.isPlaying) {
            const status = await audio?.pauseAsync();
            setIsPlaying(false);
            return setStatus(status);
        }

        // It will resume our audio
        if (!status.isPlaying) {
            const status = await audio?.playAsync();
            setIsPlaying(true);
            return setStatus(status);
        }
    };
    if (podcast) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={globalStyles.flex}
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        style={styles.img}
                        source={{ uri: constants.emptyIcon }}
                    />
                    <View style={{ marginLeft: 5 }}>
                        <Text style={styles.podcastTitle}>{podcast.title}</Text>
                        <Text style={styles.podcastCreator}>
                            {podcast.creator.username}
                        </Text>
                    </View>
                </TouchableOpacity>
                {isPlaying ? (
                    <MaterialCommunityIcons
                        name={"pause"}
                        onPress={handlePausePlayAudio}
                        size={controlIconSizeSmall}
                        style={styles.icon}
                        color={colors.wheat}
                    />
                ) : (
                    <Entypo
                        style={styles.icon}
                        onPress={handlePausePlayAudio}
                        name="controller-play"
                        size={controlIconSizeSmall}
                        color={colors.wheat}
                    />
                )}
            </View>
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
    icon: {
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: 0,
    },
});

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { colors, fonts, globalStyles, layout, constants } from "../../theme";
import ExpoConstants from "expo-constants";
import { AntDesign } from "@expo/vector-icons";
import { ProfileImage } from "../../components/ProfileImage";
import { useStore } from "../../store/useStore";
import { PodcastAudioType, stateWithPodcast } from "../../types";
import { Podcast } from "../../generated/graphql";
import { Audio, AVPlaybackStatus } from "expo-av";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

interface PlayerProps {
    setModalVisible: (value: React.SetStateAction<boolean>) => void;
    setAudio: React.Dispatch<React.SetStateAction<Audio.Sound | null>>;
    setStatus: any;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    audio: Audio.Sound | null;
    status: any;
    isPlaying: boolean;
}

export const Player: React.FC<PlayerProps> = ({
    setModalVisible,
    setStatus,
    setIsPlaying,
    setAudio,
    status,
    audio,
    isPlaying,
}) => {
    const podcast: Podcast = useStore(
        (state) => (state as stateWithPodcast).podcast
    );

    const [positionMillis, setPositionMillis] = useState(0);

    useEffect(() => {
        if (audio === null) {
            setAudio(new Audio.Sound());
        }
    }, []);

    const handlePausePlayAudio = async () => {
        if (audio !== null && status === null) {
            const status = await audio.loadAsync(
                { uri: podcast.fileUrl },
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

    const skipBackSeconds = async () => {
        console.log("position : ", status.positionMillis);
        audio?.setPositionAsync(
            status.positionMillis - constants.skipTimeInSeconds
        );
        console.log("current positon", status.positionMillis);
        const decr = status.positionMillis - constants.skipTimeInSeconds;
        if (decr < 0) {
            console.log("duration exceeded podcast duration ");
            console.log("resetting timeline");
            audio?.setPositionAsync(0);
            status.positionMillis = 0;
            console.log("duration corrected!");
        }
        status.positionMillis =
            status.positionMillis - constants.skipTimeInSeconds;
        console.log("duration : ", status.durationMillis);
    };

    const skipNextSeconds = async () => {
        console.log("position : ", status.positionMillis);
        audio?.setPositionAsync(
            status.positionMillis + constants.skipTimeInSeconds
        );
        console.log("current positon", status.positionMillis);
        const incr = status.positionMillis + constants.skipTimeInSeconds;
        if (status.durationMillis < incr) {
            console.log("duration exceeded podcast duration ");
            console.log("resetting timeline");
            audio?.setPositionAsync(0);
            status.positionMillis = 0;
            console.log("duration corrected!");
        }
        status.positionMillis =
            status.positionMillis + constants.skipTimeInSeconds;
        console.log("duration : ", status.durationMillis);
    };

    return (
        <View style={styles.container}>
            <AntDesign
                onPress={() => setModalVisible(false)}
                name="close"
                size={layout.iconSize}
                color={colors.white}
            />
            <View style={[globalStyles.flex, styles.userInfo]}>
                <View style={styles.imgBackground}>
                    <ProfileImage
                        imgUrl={podcast.creator.imgUrl}
                        variant={"podcast"}
                    />
                </View>
                <Text style={styles.username}>{podcast.creator.username}</Text>
                <Text style={styles.createdAt}>29 Jul</Text>
            </View>
            <Text style={styles.title}>{podcast.title}</Text>
            <Image
                style={styles.cover}
                source={{
                    uri:
                        podcast.coverUrl.trim().length == 0
                            ? "data:image/jpeg;base64,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"
                            : podcast.coverUrl,
                }}
            />
            <View style={[globalStyles.flex, styles.controls]}>
                <MaterialCommunityIcons
                    name="rewind-10"
                    onPress={skipBackSeconds}
                    size={layout.iconSize + 30}
                    style={styles.icon}
                    color={colors.wheat}
                />
                {isPlaying ? (
                    <MaterialCommunityIcons
                        name={"pause"}
                        onPress={handlePausePlayAudio}
                        size={layout.iconSize + 30}
                        style={styles.icon}
                        color={colors.wheat}
                    />
                ) : (
                    <Entypo
                        style={styles.icon}
                        onPress={handlePausePlayAudio}
                        name="controller-play"
                        size={layout.iconSize + 30}
                        color={colors.wheat}
                    />
                )}
                <MaterialCommunityIcons
                    name="fast-forward-10"
                    onPress={skipNextSeconds}
                    size={layout.iconSize + 30}
                    style={styles.icon}
                    color={colors.wheat}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.dogeBlack,
        height: "100%",
        padding: 20,
        paddingTop: ExpoConstants.statusBarHeight,
    },
    imgBackground: {
        backgroundColor: "#fff",
        borderRadius: layout.borderRadius,
        overflow: "hidden",
        width: 40,
        height: 40,
    },
    userInfo: {
        marginTop: 20,
    },
    username: {
        color: "#fff",
        fontFamily: fonts.inter_600,
        fontSize: 21,
        marginLeft: 14,
    },
    createdAt: {
        fontFamily: fonts.inter_500,
        fontSize: 15,
        color: colors.dogeTextGray,
        marginLeft: "auto",
        marginRight: 0,
    },
    cover: {
        width: Dimensions.get("screen").width - 40,
        height: Dimensions.get("screen").width - 40,
        borderRadius: 4,
    },
    title: {
        color: colors.wheat,
        fontSize: 26,
        fontFamily: fonts.inter_600,
        marginVertical: 20,
    },
    controls: {
        justifyContent: "space-evenly",
        marginTop: 60,
    },
    icon: {
        alignSelf: "center",
    },
});

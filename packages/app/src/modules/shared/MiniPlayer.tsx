import React, { useState } from "react";
import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import { PlayerPreview } from "../../components/PlayerPreview";
import { Podcast } from "../../generated/graphql";
import { useStore } from "../../store/useStore";
import { Player } from "./Player";
import { Audio } from "expo-av";

interface MiniPlayerProps {}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [audio, setAudio] = useState<Audio.Sound | null>(null);
    const [status, setStatus] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <View style={{ zIndex: 1000 }}>
            <PlayerPreview
                setAudio={setAudio}
                setStatus={setStatus}
                setIsPlaying={setIsPlaying}
                audio={audio}
                status={status}
                isPlaying={isPlaying}
                setModalVisible={setModalVisible}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <Player
                    setAudio={setAudio}
                    setStatus={setStatus}
                    setIsPlaying={setIsPlaying}
                    audio={audio}
                    status={status}
                    isPlaying={isPlaying}
                    setModalVisible={setModalVisible}
                />
            </Modal>
        </View>
    );
};

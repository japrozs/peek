import React, { useState } from "react";
import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import { PlayerPreview } from "../../components/PlayerPreview";
import { Podcast } from "../../generated/graphql";
import { useStore } from "../../store/useStore";
import { Player } from "./Player";

interface MiniPlayerProps {}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={{ zIndex: 1000 }}>
            <PlayerPreview setModalVisible={setModalVisible} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <Player setModalVisible={setModalVisible} />
            </Modal>
        </View>
    );
};

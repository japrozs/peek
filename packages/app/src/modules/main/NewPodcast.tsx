import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors, fonts, globalStyles } from "../../theme";
import * as DocumentPicker from "expo-document-picker";

interface NewPodcastProps {}

export const NewPodcast: React.FC<NewPodcastProps> = ({}) => {
    const pickFile = async () => {
        const file = await DocumentPicker.getDocumentAsync({
            type: "audio/*",
        });

		console.log(file)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create a new podcast</Text>
            <TextInput
                style={styles.input}
                placeholder={"Podcast title"}
                placeholderTextColor={colors.dogeTextGray}
            />
            <Button title={"Pick image"} onPress={pickFile} />
            <TouchableOpacity style={[globalStyles.button, { marginTop: 20 }]}>
                <Text style={globalStyles.buttonText}>Create podcast</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontFamily: fonts.inter_500,
    },
    input: {
        padding: 10,
        borderColor: colors.dogeGray,
        borderWidth: 2,
        borderRadius: 3,
        marginTop: 13,
        color: "#fff",
    },
});

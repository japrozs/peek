import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ProfileImage } from "../../components/ProfileImage";
import { useMeQuery } from "../../generated/graphql";
import { colors, fonts, globalStyles, layout } from "../../theme";
import { MiniPlayer } from "../shared/MiniPlayer";

interface SelfProfileProps {}

export const SelfProfile: React.FC<SelfProfileProps> = ({}) => {
    const { data, loading } = useMeQuery();
    return (
        <View style={styles.container}>
            <ScrollView style={{ padding: 15 }}>
                <View style={globalStyles.flex}>
                    <View style={styles.mask}>
                        <ProfileImage
                            imgUrl={data?.me?.imgUrl}
                            variant={"regular"}
                        />
                    </View>
                    <View
                        style={{
                            marginLeft: 50,
                        }}
                    >
                        <Text style={styles.name}>Japroz Singh</Text>
                        <Text style={styles.username}>@japrozs</Text>
                    </View>
                </View>
                <Text
                    style={[
                        globalStyles.headingCaps,
                        { marginTop: 20, marginLeft: 10 },
                    ]}
                >
                    PODCASTS
                </Text>
            </ScrollView>
            <MiniPlayer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    mask: {
        backgroundColor: "#fff",
        borderRadius: layout.borderRadius,
        width: layout.images.profileImgWidth,
        height: layout.images.profileImgHeight,
        marginHorizontal: 10,
    },
    name: {
        color: "#fff",
        fontFamily: fonts.inter_600,
        fontSize: 25,
    },
    username: {
        color: colors.dogeTextGray,
        fontSize: 19,
        fontFamily: fonts.inter_500,
    },
});

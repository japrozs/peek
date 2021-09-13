import { StyleSheet } from "react-native";
import React from "react";
import { Image, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { constants } from "../theme";
import { colors, layout } from "../theme";

type VariantProps = "regular" | "icon" | "post" | "comment" | "small";

interface ProfileImageProps {
    imgUrl: string | undefined;
    variant: VariantProps;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    imgUrl,
    variant,
}) => {
    let width = 0;
    let height = 0;
    switch (variant) {
        case "regular": {
            width = layout.images.profileImgWidth;
            height = layout.images.profileImgHeight;
            break;
        }
        case "icon": {
            width = layout.images.smallProfileImgWidth;
            height = layout.images.smallProfileImgHeight;
            break;
        }
        case "post": {
            width = layout.images.postProfileImgWidth;
            height = layout.images.postProfileImgHeight;
            break;
        }
        case "comment": {
            width = 28;
            height = 28;
            break;
        }
        case "small": {
            width = 31;
            height = 31;
            break;
        }
    }
    return (
        <View>
            {imgUrl?.split(".").pop() == "svg" ? (
                <SvgUri
                    style={[styles.img, { width, height }]}
                    uri={imgUrl || ""}
                />
            ) : (
                <Image
                    style={[styles.img, { width, height }]}
                    source={{ uri: imgUrl || constants.emptyIcon }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        borderColor: colors.borderGray,
        borderWidth: 1,
        borderRadius: layout.borderRadius,
    },
});

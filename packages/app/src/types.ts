import { Audio, AVPlaybackStatus } from "expo-av";
import { Podcast } from "./generated/graphql";

export type stateWithPodcast = object & { podcast: Podcast };

export type PodcastAudioType = {
    sound: Audio.Sound;
    status: AVPlaybackStatus;
};

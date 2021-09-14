import { Podcast } from "./generated/graphql";

export type stateWithPodcast = object & { podcast: Podcast };

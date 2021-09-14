import create from "zustand";
import { Podcast } from "../generated/graphql";

export const useStore = create((set) => ({
    podcast: null,
    setPodcast: (podcast: Podcast) =>
        set((state) => ({
            podcast: podcast,
        })),
}));

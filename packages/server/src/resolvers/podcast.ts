import { Podcast } from "../entities/Podcast";
import { isAuth } from "../middleware/isAuth";
import { Arg, Int, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class PodcastResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Podcast])
    async getAllPodcasts() {
        return Podcast.find({
            order: { createdAt: "DESC" },
            relations: ["creator", "comments"],
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => Podcast)
    async getPodcast(@Arg("id", () => Int) id: number) {
        return Podcast.findOne({
            where: { id },
            relations: ["creator", "comments"],
        });
    }
}

import "reflect-metadata";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import path from "path";
import UploadRoutes from "./resolvers/upload";
import { Podcast } from "./entities/Podcast";
import { PodcastResolver } from "./resolvers/podcast";
import { Comment } from "./entities/Comment";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: "peek",
        username: "postgres",
        password: "postgres",
        logging: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        synchronize: true, // set to false, when wiping the data (i.e. await Podcast.delete({}); )
        entities: [User, Podcast, Comment],
    });
    conn.runMigrations();
    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        cors({
            origin: "http://localhost:19006", // not needed, but added for good measure
            credentials: true,
        })
    );
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__, // cookie only works in https (turn this off if not using https in production)
            },
            saveUninitialized: false,
            secret: "4BCB54273A146FF762EF27C2F32A630CC558AB6043B453C8461A9BD5E2BEB35B",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PodcastResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.get("/", (_, res) => {
        res.json({
            message: "Hey there! Welcome to the peek app API",
        });
    });

    app.use(express.json());
    app.use("/", UploadRoutes);

    app.listen(4000, () => {
        console.log("🚀 Server started on localhost:4000");
    });
};

main().catch((err) => {
    console.error(err);
});

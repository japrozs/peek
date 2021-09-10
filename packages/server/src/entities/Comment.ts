import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Podcast } from "./Podcast";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    body: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.comments)
    creator: User;

    @Field()
    @Column()
    podcastId: number;

    @Field(() => Podcast)
    @ManyToOne(() => Podcast, (podcast) => podcast.comments, {
        nullable: false,
    })
    podcast: Podcast;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

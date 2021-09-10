import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Comment } from "./Comment";
import { Podcast } from "./Podcast";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    imgUrl: string;

    @Column()
    password: string;

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.creator)
    comments: Comment[];

    @Field(() => [Podcast])
    @ManyToOne(() => Podcast, (podcast) => podcast.creator)
    podcasts: Podcast[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

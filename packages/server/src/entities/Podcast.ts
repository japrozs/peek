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
import { User } from "./User";

@ObjectType()
@Entity()
export class Podcast extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    fileUrl: string;

    @Field()
    @Column()
    creatorId: number;

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.podcast)
    comments: Comment[];

    @Field()
    @Column({ default: 0 })
    likes: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.podcasts)
    creator: User;

    @Field()
    @Column()
    title: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

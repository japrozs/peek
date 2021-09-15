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

    @Field()
    @Column({
        default:
            "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop",
    })
    coverUrl: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}

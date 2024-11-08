import { PostType } from "@/types/post/types";

export interface UserType {
    _id: string;
    name: string;
    email: string;
    username: string;
    photo: string;
    followers: string[];
    following: string[];
    bookmarks: string[];
    __v: 0;
}

export interface UserTypeIncludeUserPosts {
    user: UserType;
    posts: PostType[];
}

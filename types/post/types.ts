export interface PostType {
    _id: string;
    title: string;
    body: string;
    posted_by: UserPostedByType;
    photo: string;
    likes: string[];
    comments: PostCommentType[];
}

export interface UserPostedByType {
    id: string;
    name: string;
    username: string;
}

export interface PostCommentType {
    _id: string;
    posted_by: {
        _id: string;
        name: string;
        email: string;
    };
    text: string;
}

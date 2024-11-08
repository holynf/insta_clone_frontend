export interface PostType {
    _id: string;
    title: string;
    body: string;
    posted_by: UserPostedByType;
    photo: string;
    likes: string[];
    comments: string[];
}

export interface UserPostedByType {
    id: string;
    name: string;
    username: string;
}

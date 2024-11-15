import { PostType } from "@/types/post/types";
import { UserType } from "@/types/user/types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { putFetchLikePost, putFetchUnLikePost } from "@/utils/api";
import { toast } from "react-toastify";
import Image from "next/image";
import { ServerUrl } from "@/utils/envPath";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart } from "lucide-react";
import PostCommentComponent from "@/components/profile/profilePostCommentsDialog";

function PostComponent({ post, userProfile }: { post: PostType; userProfile: UserType }) {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.user);

    const handleLikePost = async (post: PostType) => {
        if (!token) return;
        const body = {
            postId: post._id ?? "",
        };

        try {
            if (post.likes.includes(userProfile._id)) {
                await putFetchUnLikePost(token, body);
            } else {
                await putFetchLikePost(token, body);
            }
            router.replace("/profile");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div key={post._id} className={"w-full flex flex-col"}>
            <div className='relative aspect-square shadow rounded-md'>
                <Image
                    src={`${ServerUrl}${post.photo.replace(/\\/g, "/")}`}
                    alt={post.title || "Instagram Post"}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-md'
                />
            </div>
            <div className={"flex justify-between gap-2 "}>
                <div className={"flex gap-2"}>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className={"p-0"}
                        onClick={() => handleLikePost(post)}
                    >
                        {post.likes.length}
                        <Heart
                            color={post.likes.includes(userProfile._id) ? "#db1414" : "black"}
                            fill={post.likes.includes(userProfile._id) ? "#db1414" : "white"}
                        />
                    </Button>

                    <PostCommentComponent {...{ post }} />
                </div>

                <Button variant={"ghost"} size={"icon"} className={"p-0"}>
                    <Bookmark />
                </Button>
            </div>
        </div>
    );
}
export default PostComponent;

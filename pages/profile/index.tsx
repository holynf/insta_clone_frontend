import { GetServerSideProps } from "next";
import { getFetchUserInformation, putFetchLikePost, putFetchUnLikePost } from "@/utils/api";
import { UserTypeIncludeUserPosts } from "@/types/user/types";
import nookies from "nookies";
import { ServerUrl } from "@/utils/envPath";
import Image from "next/image";
import { Bookmark, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { clearToken } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AvatarComponent from "@/components/shared/AvatarComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store";
import { toast } from "react-toastify";
import { PostType } from "@/types/post/types";
import PostCommentComponent from "@/components/profile/profilePostCommentsDialog";

const UserProfile = ({ user }: { user: UserTypeIncludeUserPosts }) => {
    const { user: userProfile, posts } = user;
    const router = useRouter();
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.user);

    function handleLogOutUser() {
        dispatch(clearToken());
        router.push("/");
    }

    const handleLikePost = async (post: PostType) => {
        if (!token) return;
        const body = {
            postId: post._id ?? "",
        };

        try {
            if (post.likes.includes(user.user._id)) {
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
        <div className={"p-4 flex flex-col h-full overflow-y-auto"}>
            <div className={"flex justify-between"}>
                <div className={"flex items-start gap-2 mb-4"}>
                    <AvatarComponent src='https://github.com/shadcn.png' />
                    <div className={"flex flex-col"}>
                        <p>{userProfile.username}</p>
                        <p>{userProfile.email}</p>
                    </div>
                </div>
                <Button className={"bg-red-500 text-white"} onClick={handleLogOutUser}>
                    <LogOut />
                </Button>
            </div>
            <hr />
            <div className='grid grid-cols-1 mt-4 gap-4 sm:grid-cols-1 lg:grid-cols-3'>
                {posts.length > 0 ? (
                    posts.map((post) => (
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
                                            color={
                                                post.likes.includes(userProfile._id)
                                                    ? "#db1414"
                                                    : "black"
                                            }
                                            fill={
                                                post.likes.includes(userProfile._id)
                                                    ? "#db1414"
                                                    : "white"
                                            }
                                        />
                                    </Button>

                                    <PostCommentComponent {...{ post }} />
                                </div>

                                <Button variant={"ghost"} size={"icon"} className={"p-0"}>
                                    <Bookmark />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <Skeleton className='w-full h-[300px] rounded-xl' />
                        <Skeleton className='w-full h-[300px] rounded-xl' />
                        <Skeleton className='w-full h-[300px] rounded-xl' />
                    </>
                )}
            </div>
        </div>
    );
};
export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const token = cookies.token;

    if (!token) {
        return { redirect: { destination: "/", permanent: false } };
    }

    try {
        const user: UserTypeIncludeUserPosts = await getFetchUserInformation(token);

        return { props: { user } };
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return { notFound: true };
    }
};

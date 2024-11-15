import { GetServerSideProps } from "next";
import { getFetchUserInformation } from "@/utils/api";
import { UserTypeIncludeUserPosts } from "@/types/user/types";
import nookies from "nookies";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { clearToken } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import AvatarComponent from "@/components/shared/AvatarComponent";
import { Skeleton } from "@/components/ui/skeleton";
import PostComponent from "@/components/post/PostComponent";

const UserProfile = ({ user }: { user: UserTypeIncludeUserPosts }) => {
    const { user: userProfile, posts } = user;
    const router = useRouter();
    const dispatch = useDispatch();

    function handleLogOutUser() {
        dispatch(clearToken());
        router.push("/");
    }

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
                    posts.map((post) => <PostComponent key={post._id} {...{ userProfile, post }} />)
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

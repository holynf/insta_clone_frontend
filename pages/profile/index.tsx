import { GetServerSideProps } from "next";
import { fetchUserInformation } from "@/utils/api";
import { UserTypeIncludeUserPosts } from "@/types/user/types";
import nookies from "nookies";
import { ServerUrl } from "@/utils/envPath";
import Image from "next/image";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { clearToken } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import AvatarComponent from "@/components/shared/AvatarComponent";

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
                    Logout
                </Button>
            </div>
            <hr />
            <div className='grid grid-cols-1 mt-4 gap-4 sm:grid-cols-1 lg:grid-cols-3'>
                {posts.map((post) => (
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
                        <div className={"flex justify-between gap-2 my-2"}>
                            <div className={"flex gap-2"}>
                                <Heart color='#db1414' fill={"#db1414"} />
                                <MessageCircle />
                            </div>
                            <div>
                                <Bookmark />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const token = cookies.token;

    if (!token) {
        return { redirect: { destination: "/login", permanent: false } };
    }

    try {
        const user: UserTypeIncludeUserPosts = await fetchUserInformation(token);

        return { props: { user } };
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return { notFound: true };
    }
};

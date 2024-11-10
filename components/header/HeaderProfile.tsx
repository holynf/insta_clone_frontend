import { useEffect, useState } from "react";
import DynamicDialog from "@/components/shared/Dialog/DialogComponent";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { LoginDialogComponent } from "@/components/shared/Dialog/LoginDialog";
import { RegisterDialogComponent } from "@/components/shared/Dialog/RegisterDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserType, UserTypeIncludeUserPosts } from "@/types/user/types";
import { useRouter } from "next/navigation";
import { getFetchUserInformation } from "@/utils/api";

export default function HeaderProfile() {
    const { token } = useSelector((state: RootState) => state.user);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [user, setUser] = useState<UserType>();
    const router = useRouter();

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const userInformation: UserTypeIncludeUserPosts =
                    await getFetchUserInformation(token);
                setUser(userInformation.user);
            } catch (error) {
                console.error("Failed to fetch user information:", error);
            }
        };

        fetchData();
    }, [token]);

    if (user) {
        return (
            <Button
                variant='outline'
                size='sm'
                onClick={() => router.push("/profile")}
                className={"header-navbar-profile"}
            >
                {user && user.username}
                <User className='w-5 h-5 mr-2' />
            </Button>
        );
    }

    return (
        <DynamicDialog
            isOpen={isDialogOpen}
            onOpenChange={setDialogOpen}
            title={isLoginForm ? "Login Form" : "Register Form"}
            trigger={
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setDialogOpen(true)}
                    className={"header-navbar-profile"}
                >
                    <User className='w-5 h-5 mr-2' />
                    Profile
                </Button>
            }
        >
            {isLoginForm ? (
                <LoginDialogComponent {...{ setDialogOpen }} />
            ) : (
                <RegisterDialogComponent {...{ setIsLoginForm }} />
            )}
            {isLoginForm ? (
                <Button
                    type={"button"}
                    className={"text-blue-400"}
                    variant={"ghost"}
                    onClick={() => setIsLoginForm(false)}
                >
                    register now!
                </Button>
            ) : (
                <Button
                    type={"button"}
                    className={"text-blue-400"}
                    variant={"ghost"}
                    onClick={() => setIsLoginForm(true)}
                >
                    do you have account ? login in
                </Button>
            )}
        </DynamicDialog>
    );
}

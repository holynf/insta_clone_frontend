import { useState } from "react";
import DynamicDialog from "@/components/shared/Dialog/DialogComponent";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { LoginDialogComponent } from "@/components/shared/Dialog/LoginDialog";
import { RegisterDialogComponent } from "@/components/shared/Dialog/RegisterDialog";

export default function HeaderProfile() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);

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

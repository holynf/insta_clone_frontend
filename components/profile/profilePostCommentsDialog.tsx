import { z } from "zod";
import { PostType } from "@/types/post/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { putFetchPostComment } from "@/utils/api";
import { toast } from "react-toastify";
import DynamicDialog from "@/components/shared/Dialog/DialogComponent";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import AvatarComponent from "@/components/shared/AvatarComponent";
import FormFieldInput from "@/components/shared/Form/FormFieldInput";
import { LoadingSpinner } from "@/components/shared/LoadingSvg";

const formSchema = z.object({
    text: z.string().min(3, {
        message: "text must be at least 3 characters.",
    }),
});

function PostCommentComponent({ post }: { post: PostType }) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useSelector((state: RootState) => state.user);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        if (!token) {
            setIsLoading(false);
            return;
        }
        const body = {
            postId: post._id,
            text: values.text,
        };

        try {
            await putFetchPostComment(token, body);

            toast.success("Comment Submitted successfully.");
            router.replace("/profile");
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                setIsLoading(false);
                toast.error(error.message);
            }
        }
    }

    return (
        <DynamicDialog
            isOpen={isDialogOpen}
            onOpenChange={setDialogOpen}
            title={"Post Comments"}
            trigger={
                <Button variant={"ghost"} size={"icon"} className={"p-0"}>
                    {post.comments.length}
                    <MessageCircle />
                </Button>
            }
        >
            <>
                <div className='h-96 overflow-y-auto'>
                    {post.comments.map((comment) => (
                        <div
                            key={post._id}
                            className={"flex flex-col my-2 border rounded-lg px-2 py-1"}
                        >
                            <div className={"flex items-center gap-2"}>
                                <AvatarComponent src='https://github.com/shadcn.png' size={"sm"} />
                                <div className={"flex flex-col"}>
                                    <p>{comment.posted_by.name}</p>
                                    <p>{comment.posted_by.email}</p>
                                </div>
                            </div>
                            <hr className={"my-1"} />
                            <div className={"ms-4"}>- {comment.text}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormFieldInput
                        inputType={"text"}
                        form={form}
                        name={"text"}
                        placeholder={"text"}
                        label={"text"}
                    />
                    <Button type='submit' disabled={isLoading} className={"btn-success"}>
                        {isLoading ? <LoadingSpinner /> : "Submit"}
                    </Button>
                </form>
            </>
        </DynamicDialog>
    );
}

export default PostCommentComponent;

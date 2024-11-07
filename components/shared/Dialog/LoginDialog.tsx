import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormFieldInput from "@/components/shared/Form/FormFieldInput";
import fetchData from "@/utils/fetchData";
import { AuthCredentialsType } from "@/types/auth/types";
import { useDispatch } from "react-redux";
import { setToken, setUserId } from "@/store/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { clsx } from "clsx";
import { LoadingSpinner } from "@/components/shared/LoadingSvg";

const formSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("This is not a valid email."),
    name: z.string().min(3, {
        message: "Name must be at least 3 characters.",
    }),
});

export function LoginDialogComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            email: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const login: AuthCredentialsType = await fetchData("/auth/login", {
                method: "POST",
                body: values,
            });

            if (login?.userId && login?.token) {
                dispatch(setUserId(login.userId));
                dispatch(setToken(login.token));
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    inputType={"text"}
                    form={form}
                    name={"name"}
                    placeholder={"Name"}
                    label={"Name"}
                />
                <FormFieldInput
                    inputType={"email"}
                    form={form}
                    name={"email"}
                    placeholder={"Email"}
                    label={"Email"}
                />
                <FormFieldInput
                    inputType={"password"}
                    form={form}
                    name={"password"}
                    placeholder={"Password"}
                    label={"Password"}
                />
                <Button type='submit' disabled={isLoading} className={"btn-success"}>
                    {isLoading ? <LoadingSpinner /> : "Submit"}
                </Button>
            </form>
        </Form>
    );
}

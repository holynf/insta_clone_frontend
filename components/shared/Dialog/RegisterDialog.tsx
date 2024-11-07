import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/shared/Form/FormFieldInput";
import fetchData from "@/utils/fetchData";

const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
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

export function RegisterDialogComponent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);

        const register = await fetchData("/auth/register", {
            method: "POST",
            body: values,
        });

        console.log(register);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormFieldInput
                    inputType={"email"}
                    form={form}
                    name={"email"}
                    placeholder={"Email"}
                    label={"Email"}
                />
                <FormFieldInput
                    inputType={"text"}
                    form={form}
                    name={"name"}
                    placeholder={"Name"}
                    label={"Name"}
                />
                <FormFieldInput
                    inputType={"text"}
                    form={form}
                    name={"username"}
                    placeholder={"Username"}
                    label={"Username"}
                />
                <FormFieldInput
                    inputType={"password"}
                    form={form}
                    name={"password"}
                    placeholder={"Password"}
                    label={"Password"}
                />
                <Button type='submit' className={"btn-success"}>
                    Submit
                </Button>
            </form>
        </Form>
    );
}

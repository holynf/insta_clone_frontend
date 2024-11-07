import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface FormFieldComponentProps {
    form: UseFormReturn<any>;
    inputType:
        | "number"
        | "search"
        | "button"
        | "time"
        | "image"
        | "text"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "month"
        | "password"
        | "radio"
        | "range";
    description?: string;
    name: string;
    label?: string;
    placeholder?: string;
}

const FormFieldInput: React.FC<FormFieldComponentProps> = ({
    form,
    description,
    name,
    inputType = "text",
    label,
    placeholder,
}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label && label}</FormLabel>
                    <FormControl>
                        <Input
                            type={inputType}
                            placeholder={placeholder && placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormDescription>{description && placeholder}</FormDescription>
                    <FormMessage className='text-red-500 mt-1' />
                </FormItem>
            )}
        />
    );
};
export default FormFieldInput;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { z } from "zod";
import { postCreatePost } from "@/utils/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const postSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    body: z.string().min(10, "Content must be at least 10 characters"),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported.",
        ),
});

export type PostSchema = z.infer<typeof postSchema>;

function CreatePostForm() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { token } = useSelector((state: RootState) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<PostSchema>({
        resolver: zodResolver(postSchema),
    });

    async function onSubmit(data: PostSchema) {
        if (!token) return;

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("body", data.body);
        formData.append("image", data.image);

        try {
            await postCreatePost(token, formData);
            toast.success("Comment Submitted successfully.");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setValue("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
                <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                    Title
                </label>
                <input
                    id='title'
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Post title'
                    {...register("title")}
                />
                {errors.title && (
                    <p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>
                )}
            </div>

            <div>
                <label htmlFor='body' className='block text-sm font-medium text-gray-700'>
                    Content
                </label>
                <textarea
                    id='body'
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Write something...'
                    {...register("body")}
                />
                {errors.body && <p className='text-red-500 text-xs mt-1'>{errors.body.message}</p>}
            </div>

            <div>
                <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                    Image
                </label>
                <input
                    type='file'
                    accept='image/*'
                    id='image'
                    onChange={handleImageChange}
                    className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100'
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt='Image Preview'
                        className='mt-2 w-32 h-32 object-cover rounded-md'
                    />
                )}
                {errors.image && (
                    <p className='text-red-500 text-xs mt-1'>{errors.image.message}</p>
                )}
            </div>

            <button
                type='submit'
                className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
                Create Post
            </button>
        </form>
    );
}

export default CreatePostForm;

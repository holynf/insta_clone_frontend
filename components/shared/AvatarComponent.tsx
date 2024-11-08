import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AvatarComponent({ src, size = "lg" }: { src: string; size?: "sm" | "md" | "lg" }) {
    const sizeClasses = {
        sm: "w-8 h-8", // Small size, e.g., 32x32px
        md: "w-12 h-12", // Medium size, e.g., 48x48px
        lg: "w-16 h-16", // Large size, e.g., 64x64px
    };

    return (
        <Avatar className={sizeClasses[size]}>
            <AvatarImage src={src} alt='User Avatar' className='object-cover' />
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
    );
}

export default AvatarComponent;

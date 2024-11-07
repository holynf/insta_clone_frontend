import { Dispatch, ReactNode, SetStateAction } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DynamicDialogProps {
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    title: string;
    description?: string;
    children: ReactNode;
    actionButtons?: ReactNode;
    trigger: ReactNode;
}

const DynamicDialog: React.FC<DynamicDialogProps> = ({
    isOpen = false,
    onOpenChange,
    title,
    description,
    children,
    actionButtons,
    trigger,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='dialog-content'>
                <DialogTitle>{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
                <div>{children}</div>
                {actionButtons && <div className='dialog-actions'>{actionButtons}</div>}
            </DialogContent>
        </Dialog>
    );
};

export default DynamicDialog;

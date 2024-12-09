import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash2, UserPlus } from "lucide-react";
import { AddGroup, BsInfoCircle } from "../svgs";

const DirectoryDialog: React.FC<{ onActionSelect: (action: string) => void }> = ({ onActionSelect }) => {
    const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="w-[25px] hover:none shadow-none outline-none hover:bg-[#FAFCFD] rounded-[4px] px-1 py-0.5"
                asChild
            >
                <button className="flex items-center justify-center">
                    <EllipsisVertical color="#737790" size={20} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={handleDropdownClick} className="w-[160px] -translate-x-3 rounded-[8px]">
                <DropdownMenuItem className="flex space-x-3" onClick={() => onActionSelect('rename')}>
                    <Pencil color="#737790" className="w-[15px]" />
                    <span className="text-[#44475B]">Rename</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex space-x-3" onClick={() => onActionSelect('collaborators')}>
                    <UserPlus color="#737790" className="w-[15px]" />
                    <span className="text-[#44475B]">Collaborators</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex space-x-3" onClick={() => onActionSelect('addgroup')}>
                    <AddGroup color="#737790" className="w-[15px]" />
                    <span className="text-[#44475B]">Groups</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex space-x-3" onClick={() => onActionSelect('details')}>
                    <BsInfoCircle color="#737790" className="w-[15px]" />
                    <span className="text-[#44475B]">Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex space-x-3" onClick={() => onActionSelect('delete')}>
                    <Trash2 color="#737790" className="w-[15px]" />
                    <span className="text-[#44475B]">Delete Directory</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DirectoryDialog;
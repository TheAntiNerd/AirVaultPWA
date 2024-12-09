import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu as MainMenu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Edit, Menu, ModeOffOn, Trash } from '../svgs';
interface PageProps {
    removeFolderModal: () => void;
    frequencyModal: () => void;
    turnOffHistory: () => void;
}
const MenuList: React.FC<PageProps> = ({ turnOffHistory, frequencyModal, removeFolderModal }) => {

    return (
        <>

            <MainMenu>
                <MenuButton className="inline-flex items-center w-[30px] h-[30px] ">
                    <Menu className='w-[30px] h-[30px]' />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-[200px]  origin-top-right bg-white rounded-xl border border-[#E1E3F5] p-1 text-sm/6 text-[#44475B] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <button onClick={turnOffHistory} className="flex w-full items-center gap-2 py-1.5 px-3 rounded-[6px] hover:bg-[#E9F2FF] ">
                            <ModeOffOn className="w-5 h-5" />
                            <span>Turn off history</span>
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={frequencyModal} className="group flex w-full items-center gap-2 py-1.5 px-3 rounded-[6px] hover:bg-[#E9F2FF] ">
                            <Edit className="w-5 h-5" />
                            <span>Edit frequency</span>
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button onClick={removeFolderModal} className="group flex w-full items-center gap-2 py-1.5 px-3 rounded-[6px] hover:bg-[#E9F2FF] ">
                            <Trash className="w-5 h-5" />
                            <span>Remove folder</span>
                        </button>
                    </MenuItem>

                </MenuItems>
            </MainMenu>

        </>
    )
}

export default MenuList
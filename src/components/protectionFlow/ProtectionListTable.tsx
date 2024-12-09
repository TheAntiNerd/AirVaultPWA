'use client'
import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import { ChevronRight, Trash2 } from 'lucide-react'
import { Frame, Trash } from '../svgs'
import RemoveFolder from '../Modal/Protection/RemoveFolder'
interface PageProps {
    onNext: () => void;
    onBack: () => void;
}

const people = [
    { name: 'team', snapshot: '22 Oct, 2024 at 11:45' },

]
const ProtectionListTable: React.FC<PageProps> = ({ onNext ,onBack }) => {
    const [enabled, setEnabled] = useState(false);
    const [removeFolderModal, setRemoveFolderModal] = useState(false)
    return (
        <div className='max-w-[1080px] mx-auto '>
            <div className='flex items-center justify-end'>
                <button onClick={onBack} className='w-[132px] font-medium h-[48px] rounded-[8px] border border-[#E1E3F5] text-[#298DFF]'>
                    + Add folder
                </button>
            </div>
            <div className="mt-8 flow-root">
                <div className=" overflow-x-auto ">
                    <div className="inline-block min-w-full rounded-[8px] align-middle">
                        <div className="overflow-hidden border border-[#E1E3F5] ring-opacity-5 rounded-[8px]">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" className="p-6 text-left text-base font-semibold text-[#44475B] ">
                                            Name
                                        </th>
                                        <th scope="col" className="p-6  text-left text-base font-semibold text-[#44475B]">
                                            Last snapshot captured
                                        </th>
                                        <th scope="col" className="p-6 w-[54px]  text-left text-base font-semibold text-[#44475B]">
                                            Status
                                        </th>

                                        <th scope="col" className="relative w-[72px] py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {people.map((person) => (
                                        <tr key={person.name}>
                                            <td className="whitespace-nowrap p-6 text-base text-[#44475B] ">
                                                {person.name}
                                            </td>
                                            <td className="whitespace-nowrap p-6 text-base text-[#44475B]">{person.snapshot}</td>
                                            <td className="whitespace-nowrap p-4 text-base text-[#44475B]">
                                                <span>
                                                    <Switch
                                                        checked={enabled}
                                                        onChange={setEnabled}
                                                        className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#DFDFDF] transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-[#36DB83]"
                                                    >
                                                        <span className="sr-only">Use setting</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                                                        />
                                                    </Switch>
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap p-6 text-base text-[#44475B]">
                                                <span className='flex gap-6 items-center'>
                                                    <button className='text-[#8C8FA3]' onClick={onNext}>
                                                            <ChevronRight className="w-7 h-7 hover:text-[#298DFF]" />
                                                      
                                                    </button>
                                                    <button className='hover:text-[#EB7B71] text-[#8C8FA3]' onClick={() => setRemoveFolderModal(true)}>

                                                        <Trash2  className="w-6 h-6  " />
                                                    </button>
                                                </span>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <RemoveFolder setIsOpen={setRemoveFolderModal} isOpen={removeFolderModal} />
        </div>
    )
}

export default ProtectionListTable
import React, { useState } from 'react'
import { ArrowBack, Menu } from '../svgs'
import MenuList from './MenuList'
import EditFrequency from '../Modal/Protection/EditFrequency'
import RemoveFolder from '../Modal/Protection/RemoveFolder'
import TurnOffHistory from '../Modal/Protection/TurnOffHistory'

interface PageProps {
        onBack: () => void;
}

const listDetailData = [
    { name: 'team', time: '22 Oct, 2024 at 11:45', size: '322 kb' },

]
const ListDetailTable: React.FC<PageProps> = ({ onBack }) => {
    const [turnOffHistoryModal, setTurnOffHistoryModal] = useState(false)
    const [removeFolderModal, setRemoveFolderModal] = useState(false)
    const [editFrequencyModal, setEditFrequencyModal] = useState(false)
    const handlefrequencyModal = () => {
        setEditFrequencyModal(true)
    };
    const handleturnOffHistory = () => {
        setTurnOffHistoryModal(true)
    };
    const handleremoveFolderModal = () => {
        setRemoveFolderModal(true)
    };
    return (
        <div className='max-w-[1080px] mx-auto '>
            <div className='flex items-center pl-6 md:pl-0 justify-between'>
                <div className='flex  items-center gap-3'>
                    <button className='w-6 h-6' onClick={onBack}>
                        <ArrowBack className='w-6 h-6' />
                    </button>
                    <h3 className='font-medium text-[#272B42] text-[30px]'>team</h3>
                </div>
                <MenuList turnOffHistory={handleturnOffHistory} frequencyModal={handlefrequencyModal} removeFolderModal={handleremoveFolderModal} />
            </div>
            <div className="mt-8 flow-root">
                <div className=" overflow-x-auto ">
                    <div className="inline-block min-w-full rounded-[8px] align-middle">
                        <div className="overflow-hidden border border-[#E1E3F5] ring-opacity-5 rounded-[8px]">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-[#F9FAFB]">
                                    <tr>
                                        <th scope="col" className="p-6 text-left text-base font-semibold text-[#44475B] ">
                                            Date & time
                                        </th>
                                        <th scope="col" className="p-6  text-left text-base font-semibold text-[#44475B]">
                                            Size
                                        </th>
                                        <th scope="col" className="p-6   text-left text-base font-semibold text-[#44475B]">
                                            Folder name
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {listDetailData.map((person) => (
                                        <tr key={person.name}>
                                            <td className="whitespace-nowrap p-6 text-base text-[#44475B] ">
                                                {person.time}
                                            </td>
                                            <td className="whitespace-nowrap p-6 text-base text-[#44475B]">{person.size}</td>
                                            <td className="whitespace-nowrap p-6 text-base text-[#44475B]">
                                                {person.name}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <EditFrequency setIsOpen={setEditFrequencyModal} isOpen={editFrequencyModal} />
            <RemoveFolder setIsOpen={setRemoveFolderModal} isOpen={removeFolderModal} />
            <TurnOffHistory setIsOpen={setTurnOffHistoryModal} isOpen={turnOffHistoryModal} />
        </div>
    )
}

export default ListDetailTable
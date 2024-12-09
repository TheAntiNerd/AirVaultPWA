'use client'
import React from 'react'
import { Download } from '@/components/svgs'
import FolderSelect from './FolderSelect';
import FrequencySelect from './FrequencySelect';


interface PageProps {
    onNext: () => void;
    onBack: () => void;
}

const features = [
    { feature: "Upgraded storage" },
    { feature: "Remote connectivity" },
    { feature: "Interactive care guides" },
    { feature: "Smart connectivity" },
    { feature: "Up to 4 users" },
];
const ProtectioOptions: React.FC<PageProps> = ({ onBack, onNext }) => {

    return (
        <div className='flex items-start justify-center px-3  min-h-[calc(100vh_-_49px)]'>
            <div className='md:w-[600px] mt-6'>
                <h2 className='text-[#272B42] w-full mb-6 text-center font-medium text-[30px]'>Choose your protection options</h2>
                <div className='grid gap-3'>
                    <span className='text-[#44475B] text-base font-medium'>Select folder</span>
                    <div className='grid gap-[6px]'>
                        <FolderSelect />
                    </div>
                    <div>
                        <FrequencySelect />
                    </div>
                </div>
                <button
                    className={'w-[124px] text-center block mx-auto h-[48px] mt-6 font-medium rounded-[8px] text-white bg-[#298DFF]'}
                    onClick={onNext}
                >
                    Done
                </button>
            </div>
        </div >
    );
};


export default ProtectioOptions
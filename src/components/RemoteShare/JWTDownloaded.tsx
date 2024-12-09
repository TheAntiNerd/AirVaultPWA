import { BsCheckSquareFill } from '@/components/svgs';
import React from 'react';

interface PageProps {
    onNext: () => void;
    onBack: () => void;
}

const JWTDownloaded: React.FC<PageProps> = ({ onBack, onNext }) => {
    const handleJWTDownloaded = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onNext(); 
    };

    return (
        <div className="flex flex-col w-full -mx-3 -my-6 min-h-lvh justify-center items-center">
            <div className="max-w-[400px] flex flex-col w-full justify-center items-center">
                <BsCheckSquareFill className="w-[68px] h-[68px]" />
                <h1 className="text-[30px] text-[#44475B] mt-3 font-medium mb-2">JWT file downloaded!</h1>
                <span className="text-[#737790] mx-auto block max-w-[340px] text-center text-sm font-normal">
                    Please install this on the remote device on <span className='font-medium'>AirVault Remote Connect Client</span>
                </span>
                <button onClick={handleJWTDownloaded} className="bg-[#298DFF] mt-6 w-[176px] mx-auto text-white px-6 py-3 font-medium rounded-[8px] outline-none">
                    Okay
                </button>
            </div>
        </div>
    );
};

export default JWTDownloaded;

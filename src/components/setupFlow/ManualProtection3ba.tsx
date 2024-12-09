'use client';
import { Framedtick } from '@/components/svgs';
import { ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type RaidType = 'RAID0' | 'RAID1' | 'LINEAR' | 'RAID4' | 'RAID5' | 'RAID6' | 'RAID10';

interface PageProps {
    diskCount: number
    onNext: (ProtectionType: RaidType) => void;
    onBack: () => void;
}

const ManualProtection3ba: React.FC<PageProps> = ({ diskCount, onBack, onNext }) => {
    const searchParams = useSearchParams();
    const ProtectionType = searchParams.get('ProtectionType');
    const diskCountFromUrl = searchParams.get('diskCount') || "";
    const [selectedRaid, setSelectedRaid] = useState<RaidType | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const savedRaid = localStorage.getItem('selectedRaid');
        const savedDiskCount = diskCount;
        if (savedRaid) {
            setSelectedRaid(savedRaid as RaidType);
        } else if (diskCountFromUrl) {
            localStorage.setItem('diskCount', diskCountFromUrl);
        }
        console.log(selectedRaid)
        setIsLoading(false);
    }, [selectedRaid]);


    const handleSelect = (raidType: RaidType) => {
        setSelectedRaid(raidType);
        localStorage.setItem('selectedRaid', raidType);
        console.log("selected:", raidType)
    };


    const isRaidDisabled = (raidType: RaidType) => {
        if (raidType === 'RAID1' && diskCount < 2) return true;
        if (raidType === 'LINEAR' && diskCount < 1) return true;
        if ((raidType === 'RAID4' || raidType === 'RAID5') && diskCount < 3) return true;
        if (raidType === 'RAID6' && diskCount < 4) return true;
        if (raidType === 'RAID10' && diskCount < 4) return true;
        return false;
    };

    return (
        <div className='flex items-stretch flex-wrap md:h-auto min-h-screen md:items-center justify-center'>
            <div className='md:w-[600px] w-[96%] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]'>
                <div className="text-center text-[30px] mb-3">
                    Choose your data protection level
                </div>
                <div className="flex flex-wrap space-y-3 text-[20px] font-normal">
                    {/* RAID0 Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px]  
                    ${isRaidDisabled('RAID0') ? 'bg-[#E7EBF0] cursor-not-allowed opacity-50' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'RAID0' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('RAID0') && handleSelect('RAID0')}
                    >
                        {selectedRaid === 'RAID0' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">RAID0</div>
                    </div>

                    {/* LINEAR Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px]  
                    ${isRaidDisabled('LINEAR') ? 'bg-[#E7EBF0] cursor-not-allowed opacity-50' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'LINEAR' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('LINEAR') && handleSelect('LINEAR')}
                    >
                        {selectedRaid === 'LINEAR' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">LINEAR</div>
                    </div>

                    {/* RAID1 Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px]  
                    ${isRaidDisabled('RAID1') ? 'bg-[#E7EBF0] cursor-not-allowed opacity-50' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'RAID1' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('RAID1') && handleSelect('RAID1')}
                    >
                        {selectedRaid === 'RAID1' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">RAID1</div>
                    </div>

                    {/* RAID4 Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px] 
                    ${isRaidDisabled('RAID4') ? 'bg-[#E7EBF0] cursor-not-allowed opacity-50' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'RAID4' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('RAID4') && handleSelect('RAID4')}
                    >
                        {selectedRaid === 'RAID4' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">RAID4</div>
                    </div>

                    {/* RAID5 Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px] 
                    ${isRaidDisabled('RAID5') ? 'bg-[#E7EBF0] opacity-50 cursor-not-allowed' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'RAID5' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('RAID5') && handleSelect('RAID5')}
                    >
                        {selectedRaid === 'RAID5' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">RAID5</div>
                    </div>

                    {/* RAID6 Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px] 
                    ${isRaidDisabled('RAID6') ? 'bg-[#E7EBF0] cursor-not-allowed opacity-50' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'RAID6' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('RAID6') && handleSelect('RAID6')}
                    >
                        {selectedRaid === 'RAID6' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">RAID6</div>
                    </div>

                    {/* RAID10 Option */}
                    <div
                        className={`w-full h-[70px] relative flex items-center border-2 rounded-[8px]  
                    ${isRaidDisabled('RAID10') ? 'bg-[#E7EBF0] cursor-not-allowed opacity-50' : 'hover:bg-[#E7EBF0] cursor-pointer'} 
                    ${selectedRaid === 'RAID10' ? 'border-[#0084FF]' : ''}`}
                        onClick={() => !isRaidDisabled('RAID10') && handleSelect('RAID10')}
                    >
                        {selectedRaid === 'RAID10' && (
                            <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                        )}
                        <div className="mx-6">RAID10</div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap justify-center mt-10 md:relative md:visible invisible absolute">
                    <button className="w-[122px] h-12 mr-5 rounded-[8px] flex items-center justify-center cursor-pointer"
                        onClick={onBack}>
                        <ArrowLeft className="mr-[10px]" />
                        Back
                    </button>

                    <button
                        className={`w-[122px] h-12 cursor-pointer rounded-[8px] text-[#FFFFFF] 
                        ${!selectedRaid || isRaidDisabled(selectedRaid) ? 'bg-gray-400' : 'bg-[#007AFF]'}`}
                        disabled={!selectedRaid || isRaidDisabled(selectedRaid)}
                        onClick={() => onNext(selectedRaid as RaidType)}
                    >
                        Continue
                    </button>

                </div>

            </div>
            <div className="flex w-[96%] flex-wrap justify-center mb-[10px] items-end mt-10 md:absolute md:invisible visible relative">
                <div className='w-full flex flex-wrap items-center justify-center font-light mb-[5px]'>
                    <button
                        className={`w-full mb-[7px] h-12 cursor-pointer rounded-[8px] text-[#FFFFFF] 
                        ${!selectedRaid || isRaidDisabled(selectedRaid) ? 'bg-gray-400' : 'bg-[#298DFF]'}`}
                        onClick={() => onNext(selectedRaid as RaidType)}
                        disabled={!selectedRaid || isRaidDisabled(selectedRaid)}
                    >
                        Continue
                    </button>


                    <button className="w-full h-12 rounded-[8px] flex items-center justify-center cursor-pointer"
                        onClick={onBack}>
                        <ArrowLeft className="mr-[10px]" />
                        Back
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ManualProtection3ba;




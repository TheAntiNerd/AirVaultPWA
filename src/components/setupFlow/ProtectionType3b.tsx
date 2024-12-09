
'use client';
import React, { useState, useEffect } from 'react';
import { AiOutlineWarning, BiCheck, BsInfoCircle, FaRegDotCircle, Framedtick, RxCross2 } from '@/components/svgs';
import { ArrowLeft } from 'lucide-react';


type RaidType = 'RX1' | 'RX2' | 'Manual';

interface PageProps {
    diskCount: number;
    onNext: (ProtectionType: RaidType) => void;
    onBack: () => void;
}

const ProtectionType3b: React.FC<PageProps> = ({ diskCount, onNext, onBack }) => {
    const [ProtectionType, setProtectionType] = useState<RaidType | null>(null);

    useEffect(() => {
        const storedRaid = localStorage.getItem('ProtectionType') as RaidType | null;
        if (storedRaid) {
            setProtectionType(storedRaid);
        } else {
            if (diskCount > 2) {
                setProtectionType('RX2');
            } else {
                setProtectionType('RX1');
            }
        }

        const handlePopState = () => {
            localStorage.removeItem('ProtectionType');
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [diskCount]);


    const handleSelect = (raidType: RaidType) => {
        setProtectionType(raidType);
        localStorage.setItem('ProtectionType', raidType);
    };

    const getValidationMessage = () => {
        if (ProtectionType === 'RX1') {
            return 'Requires a minimum of 1 disk';
        } else if (ProtectionType === 'RX2') {
            return diskCount < 2 ? 'RX2 requires a minimum of 2 disks' : 'Requires a minimum of 2 disks';
        } else if (ProtectionType === 'Manual') {
            return 'Manual setup requires at least 1 disk';
        }
        return '';
    };

    const isDefaultSelected = (raidType: RaidType) => {
        if (raidType === 'RX1' && diskCount <= 2) return true;
        if (raidType === 'RX2' && diskCount > 2) return true;
        return false;
    };

    return (
        <div className='flex md:items-start min-h-screen md:h-auto justify-center flex-wrap'>
            <div className='flex flex-wrap items-start justify-center'>
                <div className='md:w-[600px] mt-6 relative w-[96%] justify-center md:items-center items-start flex flex-wrap '>
                    <div className="text-center text-[30px] mb-3">
                        Choose your data protection level
                    </div>
                    <div className="flex flex-wrap items-start space-y-3 md:w-full relative">
                        <div
                            className={`w-full border-2 rounded-[8px] cursor-pointer hover:bg-[#E7EBF0] relative ${ProtectionType === 'RX1' ? 'border-[#0084FF]' : ''}`}
                            onClick={() => handleSelect('RX1')}
                        >
                            {ProtectionType === 'RX1' && (
                                <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                            )}
                            <div className="mx-3 my-6 md:m-6">
                                <div className="text-[20px] mb-[6px]">
                                    RX1{' '}
                                    {isDefaultSelected('RX1') && (
                                        <span className="text-[14px] text-[#72758e]">(recommended)</span>
                                    )}
                                </div>
                                <div className="text-[16px] relative font-light">
                                    <p>
                                        Protects your data from a single drive failure, while giving you the flexibility to add new disks of different sizes.
                                        <BsInfoCircle className='ml-[10px] text-[18px] inline-block' />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`w-full border-2 rounded-[8px] cursor-pointer hover:bg-[#E7EBF0] relative ${ProtectionType === 'RX2' ? 'border-[#0084FF]' : ''}`}
                            onClick={() => handleSelect('RX2')}
                        >
                            {ProtectionType === 'RX2' && (
                                <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                            )}
                            <div className="mx-3 my-6 md:m-6">
                                <div className="text-[20px] mb-[6px]">
                                    RX2{' '}
                                    {isDefaultSelected('RX2') && (
                                        <span className="text-[14px] text-[#72758e]">(recommended)</span>
                                    )}
                                </div>
                                <div className="text-[16px] font-light">
                                    <p>
                                        Protects your data from two drive failures, while giving you the flexibility to add new disks of different sizes.
                                        <BsInfoCircle className='ml-[10px] text-[18px] inline-block' />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`w-full border-2 rounded-[8px] cursor-pointer hover:bg-[#E7EBF0] relative ${ProtectionType === 'Manual' ? 'border-[#0084FF]' : ''}`}
                            onClick={() => handleSelect('Manual')}
                        >
                            {ProtectionType === 'Manual' && (
                                <Framedtick className="absolute top-[-8px] left-[-8px] border-[#0084FF] bg-white rounded-full" />
                            )}
                            <div className="mx-3 my-6 md:m-6">
                                <div className="text-[20px] mb-[6px]">Manual</div>
                                <div className="text-[16px] font-light">
                                    Manually select your RAID level. For advanced users only.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-3 relative flex flex-wrap space-y-3 font-light text-[14px] w-full'>
                        <div className='text-[14px] flex flex-wrap items-center w-full'>
                            {ProtectionType === 'RX2' && diskCount < 2 ? (
                                <RxCross2 className='pr-[2px] translate-y-[2px] text-[20px]' />
                            ) : (
                                <BiCheck className='pr-[2px] text-[20px]' />
                            )}
                            <span className='ml-[10px]'>
                                {getValidationMessage()}
                            </span>
                        </div>
                        {ProtectionType === 'RX1' && <div className='text-[14px] flex flex-wrap items-center w-full'>
                            <FaRegDotCircle className='pr-[2px] text-[20px]' />
                            <span className='ml-[10px]'>Total expected capacity: 989 GiB</span>
                        </div>}
                        <div className='text-[14px] flex flex-wrap items-center w-full'>
                            {ProtectionType === 'RX2' && (
                                <div className='text-[14px] flex flex-wrap items-center w-full'>
                                    <AiOutlineWarning className='pr-[2px] text-[20px]' />
                                    <span className='ml-[10px]'>You cannot downgrade your protection level</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='flex w-full md:relative absolute md:visible invisible flex-wrap justify-center mt-[40px] font-[300] text-[16px] items-center'>
                        <button
                            className="md:w-[122px] w-[96%] md:bottom-0 bottom-[25px] h-12 md:mr-[20px] rounded-[8px] flex flex-wrap items-center justify-center cursor-pointer"
                            onClick={onBack}
                        >
                            <ArrowLeft className="mr-[10px]" />
                            Back
                        </button>

                        <button className={`md:w-[122px] w-[96%] md:bottom-0 bottom-[25px] md:relative absolute h-12 cursor-pointer rounded-[8px] text-[#FFFFFF] ${diskCount < 2 && ProtectionType === 'RX2' ? 'bg-gray-400' : 'bg-[#298DFF]'
                            }`}
                            onClick={() => onNext(ProtectionType as RaidType)}
                            disabled={diskCount < 2 && ProtectionType === 'RX2'}>
                            Continue
                        </button>
                    </div>


                </div>
            </div>
            <div className='flex  items-end mb-[15px] w-[96%] mt-[40px] md:absolute md:invisible visible flex-wrap justify-center font-[300] text-[16px]'>
                <div className='flex flex-wrap w-full justify-center '>
                    <button className={`w-full flex items-center justify-center  mb-[7px] h-12 cursor-pointer rounded-[8px] text-[#FFFFFF] ${diskCount < 2 && ProtectionType === 'RX2' ? 'bg-gray-400' : 'bg-[#298DFF]'
                        }`}
                        onClick={() => onNext(ProtectionType as RaidType)}
                        disabled={diskCount < 2 && ProtectionType === 'RX2'}>
                        Continue
                    </button>


                    <button
                        className="w-[96%] mb-[10px h-12 flex items-center rounded-[8px] flex-wrap justify-center cursor-pointer"
                        onClick={onBack}
                    >
                        <ArrowLeft className="mr-[10px]" />
                        Back
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProtectionType3b

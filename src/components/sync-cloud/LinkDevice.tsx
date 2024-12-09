import React from 'react'
import { Cloudsync } from '../svgs';

const LinkDevices = ({ onNext }: { onNext: () => void }) => {
    return (
        <>
            <div className='w-full ext-[#272B42] mb-36 space-x-[9px] text-[30px] flex items-center'>
                <Cloudsync />
                <p>Cloud sync</p>
            </div>
            <div className='flex flex-wrap items-start justify-center'>
                <div className='md:w-[600px] w-[340px] justify-center items-center flex flex-wrap'>
                    <div className='w-full flex flex-wrap items-center justify-center mb-12'>
                        <div className='text-[24px] font-[500] mb-2 text-center md:w-full text-[#44475B] w-[300px]'>
                            No accounts linked yet
                        </div>
                        <div className='text-[15px] text-center w-full font-[300] text-[#8C8FA3]'>
                            Link your account and sync you files with AirVault
                        </div>
                    </div>
                    <button
                        onClick={onNext}
                        className='absolute md:relative items-center w-[96%] bottom-[25px] md:w-auto justify-center flex md:items-center px-[25px] h-12 bg-[#298DFF] rounded-[8px] text-[#FFFFFF]'
                    >
                        Link account
                    </button>
                </div>
            </div >
        </>
    );
};

export default LinkDevices

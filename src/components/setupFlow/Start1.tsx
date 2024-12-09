import React from 'react'

const Start1 = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className='flex items-center min-h-screen justify-center'>
            <div className='md:w-[600px] w-[340px] justify-center items-center flex flex-wrap md:mb-[200px]'>
                <div className='w-full flex flex-wrap items-center justify-center mb-10'>
                    <div className='text-[30px] text-center md:w-full w-[300px] text-[#272B42]'>
                        Let's setup your AirVault!
                    </div>
                    <div className='text-[15px] mt-3 text-center w-full font-[200] text-[#737790]'>
                        Please make sure you have all your disks connected before you continue.
                    </div>
                </div>
                <button
                    onClick={onNext}
                    className='absolute md:relative items-center w-[96%] bottom-[25px] md:w-auto justify-center flex md:items-center px-[25px] h-12 bg-[#298DFF] rounded-[8px] text-[#FFFFFF]'
                >
                    Let's go!
                </button>
            </div>
        </div>
    );
};

export default Start1

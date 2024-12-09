import React from 'react'

interface PageProps {
    onNext: () => void;
    onBack: () => void;
}

const ProtectionOn: React.FC<PageProps> = ({ onBack, onNext }) => {
    return (
        <div className='flex  items-center justify-center px-3  min-h-[calc(100vh_-_49px)]'>
            <div className='md:w-[600px] mt-6 justify-center items-center flex-col flex flex-wrap '>


                <p className='text-[#44475B] w-full mt-2 text-center text-[30px]'>
                    Ransomware protection is <span className='font-semibold'>off</span>
                </p>

                <button
                    className={'w-[124px] font-medium h-[48px] mt-6 rounded-[8px] text-white bg-[#298DFF]'}
                    onClick={onNext}
                >
                    Turn it on
                </button>
            </div>
        </div>
    );
};

export default ProtectionOn
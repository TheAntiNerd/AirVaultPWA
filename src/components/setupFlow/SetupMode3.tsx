import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';
import { BsCheckSquareFill } from '../svgs';

const SetupMode3 = ({
	onBack,
	onNext,
	onManualSetup,
}: {
	onBack: () => void;
	onNext: () => void;
	onManualSetup: () => void;
}) => {
	return (
		<div className="flex min-h-screen px-3 items-start md:w-auto md:items-center justify-center">
			<div className="max-w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]">
				<div className="text-center md:w-full w-[80%] text-[30px] text-[#272B42]">
					Let AirVault do the magic
				</div>
				<div className="w-full flex flex-wrap text-[#737790] items-center justify-center text-[16px] text-center font-light mt-3">
					<div className="w-full flex flex-wrap mb-[18px] items-center text-center justify-center">
						Sit back, relax, and let AirVault decide the best settings for you
					</div>
					<div className="max-w-[470px] flex flex-wrap items-start justify-start text-[14px]">
						<div className="flex flex-wrap w-full items-center justify-start">
							<BsCheckSquareFill className="mr-[10px]" />
							<p className="w-[90%] text-left">66 TB of maximum storage</p>
						</div>
						<div className="flex flex-wrap w-full items-center justify-start">
							<BsCheckSquareFill className="mr-[10px]" />
							<p className="w-[90%] text-left">Remote connectivity from anywhere in the world</p>
						</div>
						<div className="flex flex-wrap w-full items-center justify-start">
							<BsCheckSquareFill className="mr-[10px]" />
							<p className="w-[90%] text-left">
								62.5 Gigabit speeds (~50GB transferable in less than 3 mins)
							</p>
						</div>
						<div className="flex flex-wrap w-full items-center justify-start">
							<BsCheckSquareFill className="mr-[10px]" />
							<p className="w-[90%] text-left">Single disk protection</p>
						</div>
						<div className="flex flex-wrap w-full items-center justify-start">
							<BsCheckSquareFill className="mr-[10px]" />
							<p className="w-[90%] text-left">Up to 4 users at the same time</p>
						</div>
					</div>
				</div>

				<div className="flex w-full md:relative bottom-0 absolute flex-wrap justify-center mt-10 font-[300] text-[16px] items-center">
					<button
						className="md:w-[122px] md:relative absolute md:bottom-0 bottom-[15px] w-[96%] h-12 md:mr-[20px] rounded-[8px] flex flex-wrap items-center justify-center cursor-pointer"
						onClick={onBack}>
						<ArrowLeft className="mr-[10px]" /> Back
					</button>

					<button
						onClick={onNext}
						className="md:w-[122px] w-[96%] md:bottom-0 bottom-[70px] md:relative absolute h-12 bg-[#298DFF] cursor-pointer rounded-[8px] text-[#FFFFFF]">
						Continue
					</button>
				</div>

				{/* <div className='w-full flex flex-wrap items-center justify-center text-[15px] text-[#a09d9e] text-center font-light mt-10'>
                    <div className='border-b-[1.5px] w-[120px] mr-[10px]' /> or <div className='border-b-[1.5px] w-[120px] ml-[10px]' />
                </div>

                <button
                    className='w-full flex flex-wrap text-[#747690] mt-10 items-center justify-center text-[16px] cursor-pointer'
                    onClick={onNext}
                >
                    Manually setup your AirVault <span className='font-light text-[14px] ml-[5px] mr-[10px]'>(advanced)</span>
                    <ArrowRight />
                </button> */}
			</div>
		</div>
	);
};

export default SetupMode3;

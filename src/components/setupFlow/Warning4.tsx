'use client';

import { AiOutlineWarning } from '@/components/svgs';
import { ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface PageProps {
	RaidType: string;
	onNext: () => void;
	onBack: () => void;
}

const Warning4: React.FC<PageProps> = ({ onBack, onNext, RaidType }) => {
	const [timer, setTimer] = useState(3);
	const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	// Countdown timer effect
	useEffect(() => {
		if (timer > 0) {
			const countdown = setTimeout(() => setTimer(timer - 1), 1000);
			return () => clearTimeout(countdown);
		} else {
			setIsButtonEnabled(true);
		}
	}, [timer]);

	return (
		<div className="flex items-start md:items-center justify-center px-3 min-h-screen">
			<div className="md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]">
				<div className="flex flex-wrap items-center justify-center">
					<AiOutlineWarning className="text-[70px]" />
					<div className="text-center text-[30px] mt-5 py-2 w-full text-[#272B42]">Data Loss Warning</div>
				</div>
				<div className="flex flex-wrap items-center w-[96%] font-light mt-1 justify-center text-[16px] text-[#444558]">
					<div className="mb-[10px] flex flex-wrap items-center text-center">
						You are about to lose all data on the selected disks. This process is irreversible. Make sure to
						have a backup of your important data.
					</div>
					<div className="flex flex-wrap items-center justify-center">
						Are you sure you want to create your storage pool in the disks selected?
					</div>
				</div>
				<div className="flex w-[97%] md:relative bottom-4 absolute flex-wrap justify-center mt-10 font-[300] text-[16px] items-center">
					<button
						className="md:w-[122px] md:relative absolute md:bottom-0 bottom-[15px] w-[96%] h-[48px] md:mr-5 rounded-[8px] flex flex-wrap items-center justify-center cursor-pointer md:mb-0 mb-[5px]"
						onClick={onBack}>
						<ArrowLeft className="mr-[10px]" />
						Back
					</button>
					<button
						className={`md:w-[161px] w-full md:bottom-0 bottom-[70px] md:relative absolute animation-all duration-300 h-[48px] rounded-[8px] text-[#FFFFFF] ${
							isButtonEnabled ? 'bg-[#E6594F] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
						}`}
						disabled={!isButtonEnabled}
						onClick={onNext}>
						Yes! Let's do it
					</button>

					<div
						className="text-center mt-[12px] w-full text-[14px] font-thin"
						style={{
							opacity: timer > 0 ? 1 : 0,
							transition: 'opacity 1s ease-in-out',
						}}>
						Time remaining: <span className="font-light">{timer} seconds</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Warning4;

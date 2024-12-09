'use client';
import React, { useState } from 'react';
import { Download } from '@/components/svgs';
import InstallUpdate from '../Modal/Update/InstallUpdate';

interface PageProps {
	onNext: () => void;
	onBack: () => void;
	newVersionDetails: any;
	clearDownloadedUpdate: () => Promise<void>;
	installUpdates: () => Promise<void>;
}

const Installing: React.FC<PageProps> = ({
	onBack,
	onNext,
	newVersionDetails,
	clearDownloadedUpdate,
	installUpdates,
}) => {
	let [isOpen, setIsOpen] = useState(false);

	async function handleResetUpdate() {
		if (confirm('Are you sure you want to reset the update?')) {
			clearDownloadedUpdate();
		}
	}

	return (
		<div className="flex items-start md:items-center justify-center px-3 min-h-[calc(100vh_-_49px)]">
			<div className="md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]">
				<div className="flex flex-wrap items-center mb-4 justify-center">
					<div className="w-full flex flex-wrap justify-center items-center">
						<Download className="text-[70px]" />
						<p className="text-[#8C8FA3] w-full mt-2 text-center text-[12px]">
							New AV version {newVersionDetails?.version}
						</p>
					</div>
					<div className="text-center text-[24px] font-semibold mt-5 w-full text-[#44475B]">
						Ready to install?
					</div>
					<div className="text-[16px] font-normal mt-2 text-[#8C8FA3] max-w-lg">
						Your AirVault might temporarily be unavailable during this update.
					</div>
				</div>
				<div className="flex flex-wrap  items-center w-full mt-1 justify-center text-[16px] text-[#8C8FA3]">
					<div className="max-w-lg">
						<div className="mb-[10px] font-normal w-full text-start">
							What's new in <span className="font-medium"> v{newVersionDetails?.version}</span>
						</div>
						{newVersionDetails?.main_text && (
							<div className="mb-[10px] font-normal w-full text-start">
								{newVersionDetails?.main_text}
							</div>
						)}
						{newVersionDetails?.points?.map((point: any, idx: number) => (
							<ul key={point} className="list-disc font-normal list-inside flex justify-center">
								<li className="w-full mb-0.5">{point}</li>
							</ul>
						))}
					</div>
				</div>
				<div className="w-full flex flex-col justify-center items-center">
					<button
						onClick={() => setIsOpen(true)}
						className={'w-[161px] h-[48px] mt-6 font-[300] rounded-[8px] text-white bg-[#298DFF]'}>
						Install
					</button>
					<button
						onClick={handleResetUpdate}
						className={'w-[161px] h-[48px] mt-2 font-[300] rounded-[8px]  text-[#298DFF]'}>
						Reset
					</button>
				</div>
				<InstallUpdate setIsOpen={setIsOpen} installUpdates={installUpdates} isOpen={isOpen} onNext={onNext} />
			</div>
		</div>
	);
};

export default Installing;

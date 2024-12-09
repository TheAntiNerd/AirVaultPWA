'use client';
import React, { useState } from 'react';
import { Download } from '@/components/svgs';
import RollbackUpdate from '../Modal/Update/RollbackUpdate';

type Props = {
	currentVersion: string;
	checkForUpdates: () => Promise<void>;
};

const Updated = ({ currentVersion, checkForUpdates }: Props) => {
	let [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex items-start md:items-center justify-center px-3 min-h-[calc(100vh_-_49px)]">
			<div className="md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]">
				<div className="flex flex-wrap items-center mb-6 justify-center">
					<div className="w-full flex flex-wrap justify-center items-center">
						<Download className="text-[70px]" />
						<p className="text-[#8C8FA3] w-full mt-2 text-center text-[12px]">
							AV version {currentVersion}
						</p>
					</div>
					<div className="text-center text-[24px] font-semibold mt-5 w-full text-[#44475B]">
						You are up to date
					</div>
				</div>
				<div className="w-full flex-col flex items-center justify-center">
					<button
						className={'px-6 font-[400] h-[48px] rounded-[8px] text-white bg-[#298DFF]'}
						onClick={checkForUpdates}>
						Check for updates
					</button>
					{/* <button onClick={() => setIsOpen(true)} className={' mt-6 text-sm font-medium  text-[#298DFF]'}>
						Rollback update
					</button> */}
					<RollbackUpdate setIsOpen={setIsOpen} isOpen={isOpen} />
				</div>
			</div>
		</div>
	);
};

export default Updated;

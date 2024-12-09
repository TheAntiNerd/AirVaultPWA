'use client';
import React, { useState } from 'react';
import { Download, Spinner } from '@/components/svgs';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';

interface PageProps {
	onNext: () => void;
	onBack: () => void;
	newVersionDetails: any;
	downloadUpdates: (version: string) => Promise<void>;
}

const Checking: React.FC<PageProps> = ({ onBack, onNext, newVersionDetails, downloadUpdates }) => {
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownloadClick = async () => {
		setIsDownloading(true); // Show spinner when button is clicked

		// download updates
		await downloadUpdates(newVersionDetails?.version);

		setIsDownloading(false); // Hide spinner after 2 seconds
	};
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
						A newer version is available
					</div>
					<div className="text-[16px] font-normal mt-2 text-[#8C8FA3]">
						Please update to get new features.
					</div>
				</div>
				<div className="flex flex-wrap  items-center w-full mt-1 justify-center text-[16px] text-[#8C8FA3]">
					<div className="w-full max-w-lg">
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
				<button
					className={
						'w-[161px] flex items-center justify-center font-[300] h-[48px] mt-6 rounded-[8px] text-white bg-[#298DFF]'
					}
					onClick={handleDownloadClick}
					disabled={isDownloading} // Disable button during download
				>
					{isDownloading ? (
						<>
							<Spinner className="w-6 h-6 mr-2" />
						</>
					) : (
						<span>Download</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default Checking;

'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
	onNext: () => void;
	onBack: () => void;
}

const Processing: React.FC<PageProps> = ({ onNext }) => {
	const router = useRouter();

	useEffect(() => {}, [router]);

	return (
		<div className="flex items-center px-3 justify-center min-h-[calc(100vh_-_49px)]">
			<div className="md:w-[600px] justify-center items-center flex flex-wrap md:mb-[200px]">
				<div className="flex flex-wrap items-center justify-center">
					<div className="loader mb-9" />
					<div className="text-center text-[24px] text-[#44475B] font-[500] w-full">
						Working on updates. Don't turn off your device.
					</div>
				</div>
				<div className="text-center mt-3 text-[#8C8FA3] font-light">Please keep your device turned on.</div>
			</div>
		</div>
	);
};

export default Processing;

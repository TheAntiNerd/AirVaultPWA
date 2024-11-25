import { useState, useEffect } from 'react';
import LoaderFull from '../wait/LoaderFull';
import SideMenu from '../SideMenu';
import { NewVersionIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';

const NewVersion = () => {
	const [percentage, setPercentage] = useState(0);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		// Simulate percentage going from 1 to 90 in 3 seconds
		let progress = 0;
		const interval = setInterval(() => {
			if (progress < 90) {
				progress += 1;
				setPercentage(progress);
			} else {
				clearInterval(interval);
				// Wait for 1 second, then complete from 90 to 100
				setTimeout(() => {
					setPercentage(100); // Jump directly to 100%
					setIsSuccess(true); // Show success message
					setIsLoading(false); // Hide loader
				}, 1000); // 1 second pause before completing to 100
			}
		}, 40); // Update every 30ms for smooth progress

		return () => clearInterval(interval); // Clean up on component unmount
	}, []);

	const closePopup = () => {
		setShowPopup(false); // Close the RemoveUser popup
	};
	const handleRollbackClick = () => {
		setShowPopup(true);
	};

	return (
		<SideMenu>
			<div className=" text-sans">
				{isLoading && <LoaderFull />} {/* Show loader until update completes */}
				{!isLoading && isSuccess && (
					<div className="flex flex-col items-center justify-center mt-28">
						<NewVersionIcon />
						<p className="mt-2 text-[#8C8FA3] font-medium text-xs">AV version 0.0.2</p>
						<h1 className="text-2xl font-semibold text-[#44475B] my-6">You are up to date</h1>
						<div className="max-sm:flex max-sm:flex-col max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:px-3">
							<div className="flex justify-center w-full">
								<button className="px-5 py-3 bg-[#298DFF] rounded-lg text-white font-medium w-full max-w-xs">
									Check for updates
								</button>
							</div>

							<div className="flex justify-center w-full mt-4">
								<button
									className="text-[#298DFF] font-medium w-full max-w-xs mb-2"
									onClick={handleRollbackClick}>
									Rollback update
								</button>
							</div>
						</div>
					</div>
				)}
				{isLoading && (
					<>
						<div className="flex flex-col items-center justify-center -mt-80">
							<h1 className="text-2xl font-medium text-[#44475B]">{`Working on Updates ${percentage}%`}</h1>
							<p className="text-base text-[#8C8FA3] mt-1">Please keep your device turned on.</p>
						</div>
					</>
				)}
			</div>
			{/* popup  */}

			{showPopup && (
				<RemoveUserPopup
					onClose={closePopup}
					text={'Rollback update?'}
					description="You may lose security patches and new features."
				/>
			)}
		</SideMenu>
	);
};

export default NewVersion;

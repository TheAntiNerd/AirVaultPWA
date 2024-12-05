import { useState, useEffect } from 'react';
import SideMenu from '../SideMenu';
import { NewVersionIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import { Link } from 'react-router-dom';

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
				{!isLoading && isSuccess && (
					<div className="flex flex-col items-center justify-center mt-20">
						<NewVersionIcon />

						<p className="mt-2 text-[#8C8FA3] font-medium text-xs">AV version 0.0.2</p>
						<h1 className="text-2xl font-semibold text-[#44475B] my-6">You are up to date</h1>
						<div className="max-sm:flex max-sm:flex-col max-sm:absolute bottom-6 max-sm:px-3 max-sm:w-full">
							<div className="flex justify-center max-sm:w-full">
								<Link to="/updates">
									<button className="py-3 shadow-custom px-6 max-sm:px-20 cursor-pointer bg-[#298DFF] rounded-lg text-white font-medium max-sm:w-full">
										Check for updates
									</button>
								</Link>
							</div>

							<div className="flex justify-center w-full mt-4">
								<button
									className="text-[#298DFF] font-medium w-full max-w-xs mb-4"
									onClick={handleRollbackClick}>
									Rollback update
								</button>
							</div>
						</div>
					</div>
				)}
				{/* Show loader until update completes */}

				{isLoading && (
					<>
						<div className="flex min-h-screen items-center justify-center -mt-16">
							<div className="flex flex-col items-center justify-center">
								<div className="loader mb-8" />
								<div className="relative">
									<h1 className="text-2xl font-medium text-[#44475B] mr-[58px]">
										Working on Updates
									</h1>
									<span className="absolute text-2xl text-[#44475B]   right-0 top-[-0px]">
										{`${percentage}`}%
									</span>
								</div>

								<p className="text-base text-[#8C8FA3] mt-1">Please keep your device turned on.</p>
							</div>
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

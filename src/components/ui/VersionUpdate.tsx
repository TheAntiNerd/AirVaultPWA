import { useState } from 'react';
import SideMenu from '../SideMenu';
import { VersionIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';

const versionDetails = [
	{
		version: 'AV version 0.0.1',
		heading: 'A newer version is on the line',
		subHeading: 'Please update to get new features.',
		label: "What's new in v0.0.2",
		points: [
			'Upgraded storage',
			'Remote connectivity',
			'Interactive care guides',
			'Smart connectivity',
			'Up to 4 users',
		],
	},
];

const VersionUpdate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [buttonText, setButtonText] = useState('Download');
	const [showPopup, setShowPopup] = useState(false);

	const handleClick = () => {
		if (buttonText === 'Install Now') {
			// Trigger RemoveUser popup
			setShowPopup(true);
		} else {
			// Show spinner for "Download"
			setIsLoading(true); // Show spinner
			setTimeout(() => {
				setIsLoading(false); // Hide spinner
				setButtonText('Install Now'); // Update button text
			}, 2000); // 2-second delay
		}
	};

	const closePopup = () => {
		setShowPopup(false); // Close the RemoveUser popup
	};

	return (
		<SideMenu>
			<div
				className="pt-20 text-sans
			">
				{/* Version Icon */}
				<div className="flex items-center justify-center mb-2">
					<VersionIcon />
				</div>

				{/* Version Details */}
				<div className="text-center">
					{versionDetails.map(item => (
						<div key={item.version}>
							{/* Version Info */}
							<div className="text-[#8C8FA3] font-medium text-sm mb-6">{item.version}</div>
							<div className="text-[#44475B] text-2xl font-semibold mb-4 max-sm:px-3 max-sm:text-left">
								{item.heading}
							</div>
							<div className="text-[#8C8FA3] text-base mb-5 max-sm:px-3 max-sm:text-left">
								{item.subHeading}
							</div>

							{/* What's New Label */}
							<div className="flex flex-col items-center justify-center max-sm:px-3 max-sm:items-start">
								<div className="text-[#8C8FA3] mb-3 text-base">{item.label}</div>

								{/* Points List */}
								<div className="text-center">
									{item.points.map((point, index) => (
										<div key={`point-${index}`} className="flex items-center justify-center mb-1">
											<div className="flex items-center max-w-xs w-full">
												<span className="text-gray-400 mr-2">•</span>
												<span className="text-gray-400 text-sm">{point}</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
				{/* Button */}
				<div className="flex items-center justify-center pt-4 max-sm:px-3">
					<button
						className="bg-[#298DFF] max-sm:w-full px-6 py-4 rounded-lg text-white font-medium flex flex-col items-center justify-center w-40 relative"
						onClick={handleClick}
						disabled={isLoading} // Disable button while loading
					>
						<div className="flex flex-col items-center">
							{isLoading && (
								<div className="w-6 h-6 border-4 border-[#8C8FA3] border-t-transparent rounded-full animate-spin mb-2"></div>
							)}
							<span>{buttonText}</span>
						</div>
					</button>
				</div>
			</div>
			{/* Popups */}
			{showPopup && (
				<RemoveUserPopup
					onClose={closePopup}
					text={'Install update?'}
					description={'The system may behave unusually during installation.'}
				/>
			)}
		</SideMenu>
	);
};

export default VersionUpdate;

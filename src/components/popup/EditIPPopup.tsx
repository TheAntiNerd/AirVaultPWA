import { useState, useEffect, useRef } from 'react';

type AddMemberPopupProps = {
	onClose: () => void;
	placeholderh1?: string;
	placeholderp?: string;
};

const EditIPPopup = ({ onClose, placeholderh1 = 'Edit' }: AddMemberPopupProps) => {
	const [username, setUsername] = useState('');
	const popupRef = useRef<HTMLDivElement | null>(null); // Reference for the popup

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setUsername(value);
	};

	// Close the popup when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				onClose(); // Close the popup
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	const maxLength = 63;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-sans">
			<div
				ref={popupRef} // Attach the reference to the popup
				className="bg-white p-10 rounded-lg shadow-lg w-1/3 min-h-fit flex flex-col max-sm:w-[320px] max-sm:px-8 max-sm:pb-5">
				<h2 className="text-3xl font-medium text-center text-[#44475B] mb-4">{placeholderh1}</h2>

				{/* input field */}

				<div className="relative mb-2">
					<label className="block font-medium mb-2 text-[#44475B]">Network</label>
					<input
						type="text"
						placeholder="Enter username"
						value={username}
						onChange={handleUserNameChange}
						maxLength={maxLength}
						className={`w-full px-3 py-4 border bg-white rounded-md border-[#C4C7E3] text-sm text-[#44475B] focus:outline-none focus:border-blue-500 
						}`}
					/>

					<span
						className="absolute right-0 bottom-0 mb-3 mr-2 text-xs text-gray-400"
						style={{
							transform: 'translateY(120%)',
							padding: '0 4px',
							backgroundColor: 'white',
						}}>
						{username.length}/{maxLength}
					</span>
				</div>
				<div className="relative mb-2 mt-4">
					<label className="block font-medium mb-2 text-[#44475B]">IP address</label>
					<input
						type="input"
						placeholder="Enter IP address"
						className={`w-full px-3 py-4 border bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500 border-[#C4C7E3]`}
					/>
				</div>

				{/* Buttons */}
				<div className="flex justify-center items-center mt-9 space-x-3">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5] focus:outline-none"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-[#298DFF] flex-grow text-white px-6 py-3 rounded-lg focus:outline-none">
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditIPPopup;

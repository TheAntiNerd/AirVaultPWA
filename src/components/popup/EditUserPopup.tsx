import { useEffect, useRef } from 'react';

const EditUserPopup = ({ onClose }: { onClose: () => void }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	// Close the modal if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-sans">
			<div ref={modalRef} className="bg-white px-10 rounded-lg shadow-lg w-1/3 min-h-fit">
				<h2 className="mt-10 text-[#44475B] text-3xl font-medium text-center">Edit users</h2>
				{/* input box */}
				<p className="text-[#44475B] text-sm font-medium mt-6">First Name</p>
				<input
					type="text"
					className="mt-2 border-2 border-[#C4C7E3] rounded-lg px-2 py-3 focus:outline-none focus:border-[#298DFF] w-full"
					placeholder="Enter First Name"
				/>
				<p className="text-[#44475B] text-sm font-medium mt-6">Last Name</p>
				<input
					type="text"
					className="mt-2 border-2 border-[#C4C7E3] rounded-lg px-2 py-3 focus:outline-none focus:border-[#298DFF] w-full"
					placeholder="Enter Last Name"
				/>

				<div className="flex items-center justify-center space-x-3 mt-9 mb-14">
					<button
						className="bg-white text-[#737790] px-4 py-3 rounded-lg flex-grow border border-[#E1E3F5] focus:outline-none"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-blue-500 text-white px-4 py-3 rounded-lg flex-grow focus:outline-none">
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditUserPopup;

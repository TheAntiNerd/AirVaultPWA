import { useEffect, useRef } from 'react';
type RemovePopUpProps = {
	text?: string;
	onClose: () => void;
	buttonText?: string;
	placeholder?: string;
};
const CreateGroupPopup = ({
	text = 'Create Group',
	onClose,
	buttonText = 'Create',
	placeholder = 'Name your group',
}: RemovePopUpProps) => {
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
			<div
				ref={modalRef}
				className="bg-white rounded-lg shadow-lg w-1/3 min-h-fit text-center px-5 max-sm:w-[320px] max-sm:px-8">
				<h2 className="text-[#44475B] text-3xl font-medium mt-10 text-nowrap max-sm:text-xl">{text}</h2>
				<div className="px-10 max-sm:px-0">
					<p className="mt-4 text-[#737790] text-regular text-left mb-2">{placeholder}</p>
					<input
						type="text"
						className="w-full border border-[#C4C7E3] focus:border-blue-500 focus:outline-none rounded-lg px-3 py-3"
					/>
				</div>
				<div className="flex justify-center items-center mt-9 mx-10 max-sm:mx-0 space-x-3 mb-10 max-sm:mt-6">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5]"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-[#298DFF] flex-grow text-white px-6 py-3 rounded-lg text-nowrap">
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateGroupPopup;

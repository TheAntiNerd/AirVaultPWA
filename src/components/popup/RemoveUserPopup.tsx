import { useEffect, useRef } from 'react';

const RemoveUserPopup = ({ onClose }: { onClose: () => void }) => {
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
			<div ref={modalRef} className="bg-white rounded-lg shadow-lg w-1/3 min-h-fit text-center max-sm:w-[300px]">
				<h2 className="text-[#44475B] text-3xl font-medium mt-10">Remove user?</h2>
				<p className="mt-4 text-[#737790] text-regular">This can&apos;t be undone</p>
				<div className="flex justify-center items-center mt-9 mx-10 space-x-3 mb-5">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5]"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-blue-500 flex-grow text-white px-6 py-3 rounded-lg text-nowrap">
						Yes! do it.
					</button>
				</div>
			</div>
		</div>
	);
};

export default RemoveUserPopup;

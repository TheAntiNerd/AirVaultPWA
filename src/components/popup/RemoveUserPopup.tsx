import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
type RemovePopUpProps = {
	text?: string;
	onClose: () => void;
	description?: string;
};
const RemoveUserPopup = ({ text = 'Remove user', onClose, description = "This can't be undone" }: RemovePopUpProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

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
	const handleClick = () => {
		if (text == 'Install update?') {
			navigate('/updates/new');
		} //add other cliks as you want
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-sans">
			<div
				ref={modalRef}
				className="bg-white rounded-lg shadow-lg w-[410px] min-h-fit text-center max-sm:w-[320px]">
				<h2 className="text-[#44475B] text-2xl font-medium mt-10">{text}</h2>
				<p className="mt-4 text-[#737790] text-regular text-center px-10">{description}</p>
				<div className="flex justify-center items-center mt-9 mx-10 space-x-3 mb-10">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5]"
						onClick={onClose}>
						Cancel
					</button>
					<button
						className="bg-[#298DFF] flex-grow text-white px-6 py-3 rounded-lg text-nowrap"
						onClick={handleClick}>
						Yes! do it.
					</button>
				</div>
			</div>
		</div>
	);
};

export default RemoveUserPopup;

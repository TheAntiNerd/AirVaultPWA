import { useEffect, useRef } from 'react';
import { HoverTick, RemovePoolsIcons } from '../../assets/svg';

type User = {
	username: string;
	email: string;
	role: string;
};

type RemovePopUpProps = {
	onClose: () => void;
	users: User[];
	groupIndex?: number | null;
};

const DirectoryGroupPopup = ({ onClose, users, groupIndex = null }: RemovePopUpProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	// Prevent scrolling and ensure modal is at bottom
	useEffect(() => {
		// Disable body scroll
		document.body.style.overflow = 'hidden';

		// Ensure modal is always at the bottom when opened
		if (modalRef.current) {
			modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}

		// Cleanup function to re-enable scrolling
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	// Close the modal if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (overlayRef.current && modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	// Get user details based on groupIndex
	const user = groupIndex !== null ? users[groupIndex] : null;

	return (
		<div
			ref={overlayRef}
			className="hidden fixed inset-0 bg-black bg-opacity-50 max-sm:flex justify-center items-end z-50 text-sans overflow-hidden">
			<div
				ref={modalRef}
				className="bg-white rounded-t-lg shadow-lg w-full max-w-[410px] max-sm:w-full absolute bottom-0">
				<div className="px-3 py-4">
					<h2 className="text-[#44475B] font-medium text-left">{user?.username}</h2>
					<p className="text-[#8C8FA3] text-sm mt-1">{user?.email}</p>
				</div>
				<div>
					<div>
						<div className="flex items-center justify-between hover:bg-[#EBF2FA]">
							<label className="text-[#44475B] px-3 py-3 flex items-center space-x-2 group">
								<span className="opacity-0 group-hover:opacity-100 transition-opacity">
									<HoverTick />
								</span>
								<span>Viewer</span>
							</label>
						</div>
						<div className="flex items-center justify-between hover:bg-[#EBF2FA]">
							<label className="text-[#44475B] px-3 py-3 flex items-center space-x-2 group">
								<span className="opacity-0 group-hover:opacity-100 transition-opacity">
									<HoverTick />
								</span>
								<span>Editor</span>
							</label>
						</div>
					</div>
					<button className="flex items-center space-x-2 text-[#44475B] hover:bg-[#EBF2FA] w-full mb-2 p-3">
						<RemovePoolsIcons />
						<span>Remove user</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DirectoryGroupPopup;

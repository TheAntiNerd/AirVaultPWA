import { useState, useEffect, useRef } from 'react';
import Dropdown from './DropDown';

const GroupsPopup = ({ onClose }: { onClose: () => void }) => {
	const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);

	const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
	const groups = ['Collabs', 'Teachers', 'Creators', 'Interns'];

	const popupRef = useRef<HTMLDivElement | null>(null); // Reference for the popup

	const handleAddGroup = (group: string) => {
		if (selectedGroups.includes(group)) {
			setSelectedGroups(prev => prev.filter(item => item !== group));
		} else {
			setSelectedGroups(prev => [...prev, group]);
		}
	};

	const toggleDropdown = (dropdown: 'role' | 'group') => {
		if (dropdown === 'role') {
			setGroupDropdownOpen(false); // Close the group dropdown when toggling role
		} else {
			setGroupDropdownOpen(prev => !prev);
		}
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

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-sans">
			<div
				ref={popupRef} // Attach the reference to the popup
				className="bg-white p-10 rounded-lg shadow-lg w-1/3 min-h-fit flex flex-col max-sm:w-[320px] max-sm:px-8 max-sm:pb-10">
				<h2 className="text-3xl font-medium text-center text-[#44475B]">Groups</h2>

				{/* Groups Selector */}
				<p className="mt-6">Select groups</p>
				<Dropdown
					button={
						<div
							className="mt-2 text-[#737790] border border-[#C4C7E3] rounded-lg px-2 py-3 cursor-pointer flex items-center justify-between"
							onClick={() => toggleDropdown('group')}>
							<div className="flex flex-wrap gap-2">
								{selectedGroups.length === 0 ? (
									<span>Select Groups</span>
								) : (
									selectedGroups.map(group => (
										<span
											key={group}
											className="bg-white text-[#44475B] py-2 px-4 rounded-full text-sm flex items-center space-x-1 border border-[#44475B] cursor-default">
											<span>{group}</span>
											<span
												onClick={e => {
													e.stopPropagation();
													handleAddGroup(group);
												}}
												className="text-xs text-gray-500 cursor-pointer">
												X
											</span>
										</span>
									))
								)}
							</div>
						</div>
					}
					onToggle={setGroupDropdownOpen}>
					{groupDropdownOpen && (
						<ul className="bg-white border border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10 max-h-40 overflow-hidden">
							{groups.map(group => (
								<li
									key={group}
									onClick={() => handleAddGroup(group)}
									className={`px-4 py-2 hover:bg-[#F1F4FF] cursor-pointer text-[#44475B] ${
										selectedGroups.includes(group) ? 'text-gray-400 cursor-not-allowed' : ''
									}`}>
									{group}
								</li>
							))}
						</ul>
					)}
				</Dropdown>

				{/* Buttons */}
				<div className="flex justify-center items-center mt-9 space-x-3">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5] focus:outline-none"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-blue-500 flex-grow text-white px-6 py-3 rounded-lg focus:outline-none">
						Invite
					</button>
				</div>
			</div>
		</div>
	);
};

export default GroupsPopup;

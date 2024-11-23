import { useState, useEffect, useRef } from 'react';
import { DownArrow } from '../../assets/svg';
import Dropdown from './DropDown';

const RolePopup = ({ onClose }: { onClose: () => void }) => {
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
	const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
	const [role, setRole] = useState('Default');
	const popupRef = useRef<HTMLDivElement | null>(null); // Reference for the popup
	const handleRoleSelect = (selectedRole: string) => {
		setRole(selectedRole);
		setRoleDropdownOpen(false); // Close the role dropdown after selection
	};

	const toggleDropdown = (dropdown: 'role' | 'group') => {
		if (dropdown === 'role') {
			setRoleDropdownOpen(prev => !prev);
			setGroupDropdownOpen(false); // Close the group dropdown when toggling role
		} else {
			setGroupDropdownOpen(prev => !prev);
			setRoleDropdownOpen(false); // Close the role dropdown when toggling group
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
				className="bg-white p-10 rounded-lg shadow-lg w-1/3 min-h-fit flex flex-col max-sm:w-[320px] max-sm:px-8 max-sm:pb-5">
				<h2 className="text-3xl font-medium text-center text-[#44475B]">Select Role</h2>

				{/* Role Selector */}
				<p className="mt-6">Select Role</p>
				<Dropdown
					button={
						<div
							className="mt-2 text-[#737790] border-2 border-[#C4C7E3] rounded-lg px-2 py-3 cursor-pointer flex items-center justify-between"
							onClick={() => toggleDropdown('role')}>
							<span className="text-[#44475B]">{role}</span>
							<span className="text-[#737790]">
								<DownArrow />
							</span>
						</div>
					}
					onToggle={setRoleDropdownOpen}>
					{roleDropdownOpen && (
						<ul className="bg-white border-2 border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10 max-h-40 overflow-hidden">
							{['Default', 'Moderator', 'Admin'].map(option => (
								<li
									key={option}
									onClick={() => handleRoleSelect(option)}
									className="px-4 py-2 hover:bg-[#F1F4FF] cursor-pointer text-[#44475B]">
									{option}
								</li>
							))}
						</ul>
					)}
				</Dropdown>
				<div className={`flex-grow ${roleDropdownOpen ? 'pb-28' : ''}`}></div>
				{/* Groups Selector */}

				{/* Dynamic Height Content */}
				<div className={`flex-grow ${groupDropdownOpen ? 'pb-36' : ''}`}></div>

				{/* Buttons */}
				<div className="flex justify-center items-center mt-9 space-x-3">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5] focus:outline-none"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-blue-500 flex-grow text-white px-6 py-3 rounded-lg focus:outline-none">
						Add
					</button>
				</div>
			</div>
		</div>
	);
};

export default RolePopup;

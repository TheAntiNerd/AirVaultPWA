import { useState, useEffect, useRef } from 'react';
import { DownArrow } from '../../assets/svg';
import Dropdown from './DropDown';

const FrequencyPopup = ({ onClose }: { onClose: () => void }) => {
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
	const [role, setRole] = useState('--Select--');
	const popupRef = useRef<HTMLDivElement | null>(null); // Reference for the popup
	const handleRoleSelect = (selectedRole: string) => {
		setRole(selectedRole);
		setRoleDropdownOpen(false); // Close the role dropdown after selection
	};

	const toggleDropdown = (dropdown: 'role') => {
		if (dropdown === 'role') {
			setRoleDropdownOpen(prev => !prev);
		} else {
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
				<h2 className="text-3xl font-medium text-center text-[#44475B]">Edit frequency</h2>

				{/* Role Selector */}
				<p className="mt-6">Frequency</p>
				<Dropdown
					button={
						<div
							className="mt-2 text-[#737790] border border-[#C4C7E3] rounded-lg px-2 py-3 cursor-pointer flex items-center justify-between"
							onClick={() => toggleDropdown('role')}>
							<span className="text-[#44475B]">{role}</span>
							<span className="text-[#737790]">
								<DownArrow />
							</span>
						</div>
					}
					onToggle={setRoleDropdownOpen}>
					{roleDropdownOpen && (
						<ul className="bg-white border border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10  overflow-hidden">
							{['1 hour', '6 hours', '12 hours', '1 day', '3 days', '1 week'].map(option => (
								<li
									key={option}
									onClick={() => handleRoleSelect(option)}
									className="px-4 py-1 hover:bg-[#F1F4FF] cursor-pointer text-[#44475B]">
									{option}
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
					<button className="bg-[#298DFF] flex-grow text-white px-6 py-3 rounded-lg focus:outline-none">
						Yes! do it
					</button>
				</div>
			</div>
		</div>
	);
};

export default FrequencyPopup;

import { useState, useEffect, useRef } from 'react';
import { DownArrow } from '../../assets/svg';
import Dropdown from './DropDown';

type AddMemberPopupProps = {
	onClose: () => void;
	placeholderh1?: string;
	placeholderp?: string;
};

const AddSMBPopup = ({ onClose, placeholderh1 = 'Add member', placeholderp = 'Select role' }: AddMemberPopupProps) => {
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
	const [role, setRole] = useState('Default');
	const [username, setUsername] = useState('');

	const popupRef = useRef<HTMLDivElement | null>(null); // Reference for the popup

	const handleRoleSelect = (selectedRole: string) => {
		setRole(selectedRole);
		setRoleDropdownOpen(false); // Close the role dropdown after selection
	};

	const toggleDropdown = (dropdown: 'role' | 'group') => {
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

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const maxLength = 63;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-sans">
			<div
				ref={popupRef} // Attach the reference to the popup
				className="bg-white p-10 rounded-lg shadow-lg w-1/3 min-h-fit flex flex-col max-sm:w-[320px] max-sm:px-8 max-sm:pb-5">
				<h2 className="text-3xl font-medium text-center text-[#44475B] mb-4">{placeholderh1}</h2>

				{/* input field */}
				<div className="relative mb-4">
					<label className="block font-medium mb-2 text-[#44475B]">Name *</label>
					<input
						type="text"
						placeholder="Enter username"
						value={username}
						onChange={handleUserNameChange}
						maxLength={maxLength}
						className="w-full px-3 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
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

				{/* Groups Selector */}
				<p className="mt-4">{placeholderp}</p>

				<Dropdown
					button={
						<div
							className="mt-2 text-[#737790] border-2 border-[#C4C7E3] rounded-lg px-2 py-3 cursor-pointer flex items-center justify-between focus:outline-none focus:border-blue-500"
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
				{/* Dynamic Height Content */}
				<div className={`flex-grow ${roleDropdownOpen ? 'pb-28' : ''}`}></div>

				{/* Buttons */}
				<div className="flex justify-center items-center mt-9 space-x-3">
					<button
						className="bg-white flex-grow text-[#737790] px-6 py-3 rounded-lg border border-[#E1E3F5] focus:outline-none"
						onClick={onClose}>
						Cancel
					</button>
					<button className="bg-blue-500 flex-grow text-white px-6 py-3 rounded-lg focus:outline-none">
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddSMBPopup;

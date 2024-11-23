import SideMenu from '../SideMenu';
import { DownArrow, PasswordEyeOpen, PasswordEyeClose, BackArrowIcon } from '../../assets/svg';
import { useState } from 'react';
import Dropdown from '../popup/DropDown';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
	const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
	const [role, setRole] = useState('Default');
	const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	const groups = ['Collabs', 'Teachers', 'Creators', 'Interns'];

	const maxLength = 63;
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};
	const handleBackClick = () => {
		navigate('/users');
	};

	const handleAddGroup = (group: string) => {
		if (selectedGroups.includes(group)) {
			setSelectedGroups(prev => prev.filter(item => item !== group));
		} else {
			setSelectedGroups(prev => [...prev, group]);
		}
	};

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

	const toggleVisibility = (field: string) => {
		if (field === 'password') {
			setShowPassword(!showPassword);
		} else {
			setShowConfirmPassword(!showConfirmPassword);
		}
	};
	return (
		<SideMenu>
			<div className="flex items-center justify-center">
				<div className="bg-white  max-sm:w-full w-[1000px] px-48 text-sans max-sm:px-3">
					<h1 className="text-3xl font-medium my-6 text-center text-[#272B42] max-sm:text-left">
						Add a user
					</h1>

					{/* Name Fields */}
					<div className="mb-4">
						<div>
							<label className="block mb-2 text-[#44475B] font-medium">Enter the name</label>
							<div className="grid grid-cols-2 gap-3">
								<input
									type="text"
									placeholder="First name"
									className="px-6 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
								/>
								<input
									type="text"
									placeholder="Last name"
									className="px-6 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
								/>
							</div>
						</div>
					</div>

					{/* Email Field */}
					<div className="relative mb-4">
						<label className="block font-medium mb-2 text-[#44475B]">Enter the email *</label>
						<input
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={handleEmailChange}
							maxLength={maxLength}
							className="w-full px-6 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
						/>
						<span
							className="absolute right-0 bottom-0 mb-3 mr-2 text-xs text-gray-400"
							style={{
								transform: 'translateY(120%)',
								padding: '0 4px',
								backgroundColor: 'white',
							}}>
							{email.length}/{maxLength}
						</span>
					</div>

					{/* Username Field */}
					<div className="relative mb-4">
						<label className="block font-medium mb-2 text-[#44475B]">Enter username *</label>
						<input
							type="text"
							placeholder="Enter username"
							value={username}
							onChange={handleUserNameChange}
							maxLength={maxLength}
							className="w-full px-6 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
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

					{/* Password Fields */}
					<div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-6">
						<div>
							<label className="block font-medium mb-2 text-[#44475B]">Set a password</label>
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={e => setPassword(e.target.value)}
									className="w-full px-6 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
									required
								/>
								<div
									className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
									onClick={() => toggleVisibility('password')}>
									{showPassword ? <PasswordEyeOpen /> : <PasswordEyeClose />}
								</div>
							</div>
						</div>
						<div>
							<label className="block font-medium mb-2 text-[#44475B]">Confirm password</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
									className="w-full px-6 py-3 border-2 border-[#C4C7E3] bg-white rounded-md text-sm text-[#44475B] focus:outline-none focus:border-blue-500"
									required
								/>
								<div
									className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
									onClick={() => toggleVisibility('confirm')}>
									{showConfirmPassword ? <PasswordEyeOpen /> : <PasswordEyeClose />}
								</div>
							</div>
						</div>
					</div>

					{/* Role Dropdown */}
					<div className="flex items-start justify-between max-sm:grid max-sm:grid-cols-1">
						<p className="text-[#44475B] font-medium mt-4 max-sm:mt-0 ">Set a specific role for them *</p>

						<Dropdown
							button={
								<div
									className="mt-2 w-32 max-sm:w-full text-[#737790] border-2 border-[#C4C7E3] rounded-lg px-2 py-3 cursor-pointer flex items-center justify-between"
									onClick={() => toggleDropdown('role')}>
									<span className="text-[#44475B]">{role}</span>
									<span className="text-[#737790]">
										<DownArrow />
									</span>
								</div>
							}
							onToggle={setRoleDropdownOpen}>
							{roleDropdownOpen && (
								<ul className="bg-white border-2 border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10  max-h-40 overflow-hidden">
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
					</div>

					<div className={`max-sm:flex-grow  ${roleDropdownOpen ? 'max-sm:pb-28' : ''}`}></div>

					{/* Group dropdowm */}
					<div>
						<p className="text-[#44475B] font-medium mt-4 max-sm:flex">
							Add members to your groups <span className="text-[#A3A09F] font-light">(optional)</span>
						</p>
						<Dropdown
							button={
								<div
									className="mt-2 text-[#737790] border-2 border-[#C4C7E3] rounded-lg px-2 py-3 cursor-pointer flex items-center justify-between"
									onClick={() => toggleDropdown('group')}>
									<div className="flex flex-wrap gap-2">
										{selectedGroups.length === 0 ? (
											<span>Select Groups</span>
										) : (
											selectedGroups.map(group => (
												<span
													key={group}
													className="bg-white text-[#44475B] py-2 px-4 rounded-full text-sm flex items-center space-x-1 border-2 border-[#44475B] cursor-default">
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
								<ul className="bg-white border-2 border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10 max-h-40 overflow-hidden">
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
					</div>
					<div className={`flex-grow mt-6 ${groupDropdownOpen ? 'pb-36' : ''}`}></div>

					{/* Action Buttons */}
					<div className="flex justify-center space-x-5 max-sm:space-x-0 mt-6">
						<button
							onClick={handleBackClick}
							className="px-6 py-3 max-sm:absolute max-sm:top-0 max-sm:left-0  bg-white rounded-md text-sm text-[#44475B] focus:outline-none ">
							<span className="hidden max-sm:inline">
								<BackArrowIcon />
							</span>
							<span className="flex max-sm:hidden">
								<BackArrowIcon /> <span className="ml-1 text-base">Back</span>
							</span>
						</button>

						<button className="px-6 py-3 max-sm:w-full max-sm:mb-6 bg-blue-500 rounded-md text-sm text-white focus:outline-none hover:bg-blue-600">
							<span className="hidden max-sm:inline">Confirm</span>
							<span className="inline max-sm:hidden">Add user</span>
						</button>
					</div>
				</div>
			</div>
		</SideMenu>
	);
};

export default NewUser;

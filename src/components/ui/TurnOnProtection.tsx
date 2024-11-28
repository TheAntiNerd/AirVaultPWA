import React, { useState } from 'react';
import SideMenu from '../SideMenu';
import { DirectoryIcon, DownArrow, SearchIcon } from '../../assets/svg';
import Dropdown from '../popup/DropDown';
import { useNavigate } from 'react-router-dom';

const TurnOnProtection = () => {
	const [isProtectionOn, setIsProtectionOn] = useState(false);
	const [selectedPath, setSelectedPath] = useState(''); // Stores the selected path
	const [highlightedFolder, setHighlightedFolder] = useState(''); // Tracks the highlighted folder
	const [expandedFolders, setExpandedFolders] = useState({}); // Tracks expanded folders
	const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
	const [role, setRole] = useState('--Select--');
	const navigate = useNavigate();

	const folders = [
		{
			name: 'cloud',
			subfolders: [],
		},
		{
			name: 'AirVault',
			subfolders: [
				{
					name: 'SubVault1',
					subfolders: [],
				},
				{
					name: 'SubVault2',
					subfolders: [],
				},
			],
		},
		{
			name: 'archive',
			subfolders: [],
		},
		{
			name: 'content',
			subfolders: [
				{
					name: 'docs',
					subfolders: [
						{ name: 'files', subfolders: [] },
						{ name: 'media', subfolders: [] },
					],
				},
			],
		},
		{
			name: 'courses',
			subfolders: [],
		},
	];

	// Toggle folder visibility
	const toggleFolder = path => {
		setExpandedFolders(prev => ({
			...prev,
			[path]: !prev[path],
		}));
	};
	const handleNavigation = () => {
		navigate('/protection/On');
	};

	const toggleDropdown = (dropdown: 'role') => {
		if (dropdown === 'role') {
			setRoleDropdownOpen(prev => !prev);
		} else {
			setRoleDropdownOpen(false); // Close the role dropdown when toggling group
		}
	};
	const handleRoleSelect = (selectedRole: string) => {
		setRole(selectedRole);
		setRoleDropdownOpen(false); // Close the role dropdown after selection
	};

	// Handle folder click
	const handleFolderClick = path => {
		setSelectedPath(path); // Update the selected path
		setHighlightedFolder(path); // Highlight the clicked folder
	};

	/*  function to render folders and subfolders */
	const renderFolders = (folderList, currentPath) => {
		return (
			<div className="border-2 rounded-lg border-[#C4C7E3] mb-3 text-sans">
				<ul className=" mt-2 px-2 text-sm ">
					{folderList.map((folder, index) => {
						const folderPath = `${currentPath} > ${folder.name}`;
						const isHighlighted = highlightedFolder === folderPath;
						const isExpanded = expandedFolders[folderPath];

						return (
							<li key={index} className="mb-2">
								<div
									className={`cursor-pointer flex items-center mt-2 ${
										isHighlighted ? 'text-[#298DFF] text-sm' : 'text-[#44475B]'
									}`}>
									<span className="mr-2 cursor-pointer " onClick={() => toggleFolder(folderPath)}>
										{folder.subfolders.length > 0 ? (
											isExpanded ? (
												<span className="flex items-center">
													<span className="mr-1 ">
														<DownArrow />
													</span>

													<DirectoryIcon />
												</span>
											) : (
												<span className="flex items-center">
													<span className="-rotate-90 mr-1">
														<DownArrow />
													</span>
													<DirectoryIcon />
												</span>
											)
										) : (
											<DirectoryIcon />
										)}
									</span>

									<span onClick={() => handleFolderClick(folderPath)}>{folder.name}</span>
								</div>
								{/* Render Subfolders */}
								{isExpanded &&
									folder.subfolders.length > 0 &&
									renderFolders(folder.subfolders, folderPath)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	return (
		<SideMenu>
			<div className="max-w-[1200px] mx-auto">
				{!isProtectionOn ? (
					/* for pc */
					<>
						<div className="flex flex-col items-center justify-center h-screen -mt-28 max-sm:hidden">
							<h1 className="text-3xl text-center text-[#44475B] mb-6">
								Ransomware protection is <span className="font-medium">off</span>
							</h1>
							<button
								className="bg-[#298DFF] text-white font-medium px-6 py-3 rounded-md"
								onClick={() => setIsProtectionOn(true)}>
								Turn it on
							</button>
						</div>

						{/* for mobile */}
						<div className="px-3 mt-4">
							<h1 className="text-[#44475B] text-semibold text-2xl hidden text-left max-sm:block mb-4">
								Protection
							</h1>
							<div className="hidden max-sm:block  max-sm:w-full mb-4 ">
								<div className="relative flex items-center">
									{/* Search Icon */}
									<span className="absolute left-2 text-[#9AA1B7]">
										<SearchIcon />
									</span>

									{/* Search Input */}
									<input
										type="search"
										className="border-2 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
										placeholder="Search"
									/>
								</div>
								{/* Table */}
								<div className="w-full mt-4 ">
									<table className="w-full border-collapse max-sm:overflow-hidden">
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 max-sm:px-3 py-4 text-left text-sm font-semibold text-gray-600">
													<div className="flex flex-col items-start">Name</div>
												</th>

												<th className="px-20 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
													<div className="flex flex-col items-start ">Path</div>
												</th>

												<th className="px-6 max-sm:px-3 py-4  text-left text-sm font-semibold text-gray-600 ">
													<div className="flex flex-col items-start max-sm:items-end max-sm:mr-16">
														Status
													</div>
												</th>
												<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden ">
													<div className="flex flex-col items-start"></div>
												</th>
											</tr>
										</thead>
									</table>
								</div>
								{/* h1 */}
								<h2 className="text-[#44475B] text-center mt-28">
									Ransomware protection is <span className="font-medium">off</span>
								</h2>
								<div className="hidden max-sm:flex ">
									<button
										className="bg-[#298DFF] text-white font-medium px-6 py-3 rounded-md  w-full absolute bottom-0"
										onClick={() => setIsProtectionOn(true)}>
										Turn it on
									</button>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center justify-center min-h-fit mt-4 w-[600px] mx-auto max-sm:px-3 max-sm:w-full">
						<h1 className="text-center text-3xl font-medium text-[#272B42] mb-6 max-sm:hidden">
							Choose your protection options
						</h1>
						<h1 className="text-3xl font-medium text-[#272B42] mb-4 max-sm:flex hidden -ml-[56px]">
							Protection options
						</h1>
						<div className="w-full rounded-lg">
							{/* Selected Path Display */}
							<div className="mb-4">
								<label
									htmlFor="folder-selection"
									className="block text-sm font-medium text-[#44475B] mb-2">
									Select folder
								</label>
								<div className="border-2 py-3 border-[#C4C7E3] focus:outline-none focus:border-blue-500 rounded-md text-[#737790] px-6">
									{selectedPath || 'Select a folder'}
								</div>
							</div>

							{/* Folder List */}
							<div>{renderFolders(folders, 'mat dev > device > Vault')}</div>

							{/* Frequency Selection */}
							<p className="mt-6">Frequency</p>
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
									<ul className="bg-white border-2 border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10  overflow-hidden">
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

							{/* Done Button */}
							<div className="flex  items-center justify-center mt-6 max-sm:pb-4 ">
								<button
									className="px-6 py-3 bg-[#298DFF] text-white font-medium rounded-lg max-sm:w-full "
									onClick={handleNavigation}>
									Done
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</SideMenu>
	);
};

export default TurnOnProtection;

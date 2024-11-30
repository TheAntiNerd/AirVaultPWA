import { useState, useEffect, useRef } from 'react';
import { DirectoryIcon, DownArrow } from '../../assets/svg';

type AddMemberPopupProps = {
	onClose: () => void;
	placeholderh1?: string;
	placeholderp?: string;
};
interface Folder {
	name: string;
	subfolders: Folder[];
}

const AddSMBPopup = ({ onClose, placeholderh1 = 'Add member' }: AddMemberPopupProps) => {
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
			name: 'freelance',
			subfolders: [],
		},
		{
			name: 'vaultAIr',
			subfolders: [],
		},
		{
			name: 'Nav',
			subfolders: [],
		},
		{
			name: 'Brnad',
			subfolders: [],
		},
		{
			name: 'cour',
			subfolders: [],
		},
	];

	const [username, setUsername] = useState('');
	const [error, setError] = useState<string>('');
	const [selectedPath, setSelectedPath] = useState(''); // Stores the selected path
	const [highlightedFolder, setHighlightedFolder] = useState(''); // Tracks the highlighted folder
	const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({}); // Tracks expanded folders

	const popupRef = useRef<HTMLDivElement | null>(null); // Reference for the popup

	/* folder selection */
	const renderFolders = (folderList: Folder[], currentPath: string, isRoot = true) => {
		return (
			<div
				className={`${
					isRoot ? 'border-2 rounded-lg border-[#C4C7E3] mb-3 custom-scrollbar' : ''
				}  max-h-[200px] overflow-y-auto  py-2`}>
				<ul className="mt-2 px-2 text-sm">
					{folderList.map((folder, index) => {
						const folderPath = `${currentPath} > ${folder.name}`;
						const isHighlighted = highlightedFolder === folderPath;
						const isExpanded = expandedFolders[folderPath];

						return (
							<li key={index} className="mb-2">
								<div
									className={`cursor-pointer flex items-center ${
										isHighlighted ? 'text-[#298DFF]' : 'text-[#44475B]'
									}`}>
									<span
										className="mr-2 cursor-pointer flex items-center"
										onClick={() => toggleFolder(folderPath)}>
										{folder.subfolders.length > 0 ? (
											isExpanded ? (
												<span className="flex items-center">
													<span className="mr-1">
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
									<span onClick={() => handleFolderClick(folderPath)} className="flex-grow">
										{folder.name}
									</span>
								</div>

								{/* Render Subfolders */}
								{isExpanded && folder.subfolders.length > 0 && (
									<div className="pl-4">{renderFolders(folder.subfolders, folderPath, false)}</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	const handleFolderClick = (path: string) => {
		setSelectedPath(path); // Update the selected path
		setHighlightedFolder(path); // Highlight the clicked folder
	};
	const validateUserName = (value: string): void => {
		const regex = /^[a-z][a-zA-Z]*$/; // Starts with a lowercase letter, no numbers or symbols
		if (!regex.test(value)) {
			setError('Username must start with a lowercase letter.');
		} else {
			setError('');
		}
	};
	const toggleFolder = (path: string) => {
		setExpandedFolders(prev => ({
			...prev,
			[path]: !prev[path],
		}));
	};
	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setUsername(value);
		validateUserName(value);
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

	const maxLength = 63;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-sans">
			<div
				ref={popupRef} // Attach the reference to the popup
				className="bg-white  p-10 max-sm:pt-4 rounded-lg shadow-lg w-1/3 min-h-fit flex flex-col max-sm:w-[320px] max-sm:px-8 max-sm:pb-10">
				<h2 className="text-3xl font-medium text-center text-[#44475B] mb-4">{placeholderh1}</h2>

				{/* input field */}

				<div className="relative mb-2">
					<label className="block font-medium mb-2 text-[#44475B]">Name *</label>
					<input
						type="text"
						placeholder="Enter username"
						value={username}
						onChange={handleUserNameChange}
						maxLength={maxLength}
						className={`w-full px-3 py-3 border-2 bg-white rounded-md text-sm text-[#44475B] focus:outline-none ${
							error ? 'border-red-500' : 'border-[#C4C7E3] focus:border-blue-500'
						}`}
					/>

					<span
						className="absolute right-0 bottom-0 mb-5 mr-2 text-xs text-gray-400"
						style={{
							transform: 'translateY(120%)',
							padding: '0 4px',
							backgroundColor: 'white',
						}}>
						{username.length}/{maxLength}
					</span>
					<div className="my-2">{error && <p className="text-red-500 text-sm mb-2">{error}</p>}</div>
				</div>

				{/* Groups Selector */}

				<div className="mb-1">
					<label htmlFor="folder-selection" className="block text-sm font-medium text-[#44475B] mb-2">
						Location*
					</label>
					<div className="border-2 py-3 border-[#C4C7E3] focus:outline-none focus:border-blue-500 rounded-md text-[#737790] px-6">
						{selectedPath || 'Select a folder'}
					</div>
				</div>
				<div>{renderFolders(folders, 'mat dev > device > Vault')}</div>

				{/* Buttons */}
				<div className="flex justify-center items-center mt-2 space-x-3">
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

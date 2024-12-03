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
			name: 'clouds',
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
	const [selectedPath, setSelectedPath] = useState('');
	const [highlightedFolder, setHighlightedFolder] = useState('');
	const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

	const popupRef = useRef<HTMLDivElement | null>(null);

	const renderFolders = (folderList: Folder[], currentPath: string, isRoot = true) => {
		return (
			<div
				className={`${
					isRoot ? 'border rounded-lg border-[#C4C7E3] mb-3 custom-scrollbar ' : ''
				} max-h-[200px] overflow-y-auto `}>
				<ul className=" text-sm ">
					{folderList.map((folder, index) => {
						const folderPath = `${currentPath} > ${folder.name}`;
						const isHighlighted = highlightedFolder === folderPath;
						const isExpanded = expandedFolders[folderPath];

						return (
							<li key={index} className="my-1 ">
								<div
									className={`flex items-center justify-between pt-1 px-2   ${
										isHighlighted ? 'text-[#298DFF]' : 'text-[#44475B]'
									}`}>
									<div className="flex items-center flex-grow truncate">
										<span
											onClick={() => handleFolderClick(folderPath)}
											className="cursor-pointer flex items-center truncate flex-grow">
											<span className="mr-2">
												<DirectoryIcon />
											</span>

											{folder.name}
										</span>

										{folder.subfolders.length > 0 && (
											<span
												className="ml-2 cursor-pointer flex items-center "
												onClick={() => toggleFolder(folderPath)}>
												<span className={isExpanded ? 'rotate-180' : ''}>
													<DownArrow />
												</span>
											</span>
										)}
									</div>
								</div>

								{/* Render Subfolders */}
								{isExpanded && folder.subfolders.length > 0 && (
									<div className="pl-5 ">{renderFolders(folder.subfolders, folderPath, false)}</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	const handleFolderClick = (path: string) => {
		setSelectedPath(path);
		setHighlightedFolder(path);
	};

	const toggleFolder = (path: string) => {
		setExpandedFolders(prev => {
			const newExpandedFolders: Record<string, boolean> = {};

			// Close all folders that are not parents or children of the current path
			Object.keys(prev).forEach(existingPath => {
				// Check if the existing path is not a parent or child of the current path
				if (!path.startsWith(existingPath) && !existingPath.startsWith(path)) {
					newExpandedFolders[existingPath] = false;
				}
			});

			// Toggle the current path
			newExpandedFolders[path] = !prev[path];

			return newExpandedFolders;
		});
	};

	const validateUserName = (value: string): void => {
		const regex = /^[a-z][a-zA-Z]*$/; // Starts with a lowercase letter, no numbers or symbols
		if (!regex.test(value)) {
			setError('Username must start with a lowercase letter.');
		} else {
			setError('');
		}
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
				ref={popupRef}
				className="bg-white p-10 max-sm:pt-4 rounded-lg shadow-lg w-1/3 min-h-fit flex flex-col max-sm:w-[320px] max-sm:px-8 max-sm:pb-10">
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
						className={`w-full px-3 py-3 border bg-white rounded-md text-sm text-[#44475B] focus:outline-none ${
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
					<div className="border py-3 border-[#C4C7E3] focus:outline-none focus:border-blue-500 rounded-md text-[#737790] px-6 truncate">
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
					<button className="bg-[#298DFF] flex-grow text-white px-6 py-3 rounded-lg focus:outline-none">
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddSMBPopup;

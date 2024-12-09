import { useState } from 'react';
import { Folder, Frame } from '../svgs';

interface Folder {
	name: string;
	subfolders?: Folder[];
}

const folderStructure: Folder[] = [
	{
		name: 'team',
		subfolders: [
			{
				name: 'cloud',
				subfolders: [{ name: 'AirVault' }],
			},
			{ name: 'archive' },
		],
	},
	{ name: 'content' },
	{ name: 'courses' },
];

const FolderSelect = () => {
	const [path, setPath] = useState<string[]>([]);
	const [showBorder, setShowBorder] = useState(false);

	const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

	const toggleFolder = (folderPath: string) => {
		const newOpenFolders = new Set(openFolders);
		if (newOpenFolders.has(folderPath)) {
			newOpenFolders.delete(folderPath);
		} else {
			newOpenFolders.add(folderPath);
		}
		setOpenFolders(newOpenFolders);
	};

	const handleFolderClick = (folder: Folder, currentPath: string[]) => {
		setPath(currentPath);
		toggleFolder(currentPath.join('/'));
	};

	const renderFolders = (folders: Folder[], currentPath: string[] = []) => (
		<ul className="pl-3 space-y-2">
			{folders.map(folder => {
				const folderPath = [...currentPath, folder.name].join('/');
				const isOpen = openFolders.has(folderPath);

				return (
					<li key={folder.name} className="grid gap-2">
						<div
							className="cursor-pointer flex items-center"
							onMouseEnter={() => setShowBorder(true)}
							onMouseLeave={() => setShowBorder(false)}
							onClick={() => handleFolderClick(folder, [...currentPath, folder.name])}>
							{/* Render a placeholder for Frame to keep alignment consistent */}
							<span className="mr-[6px] w-4 h-4 flex items-center justify-center">
								{folder.subfolders && (
									<Frame
										className={`transition-transform duration-200 ${
											isOpen ? 'rotate-90' : 'rotate-0'
										}`}
									/>
								)}
							</span>
							<Folder className="mr-2" />
							<span className="hover:text-[#298DFF] text-[#44475B]">{folder.name}</span>
						</div>
						{/* Recursively render subfolders if the folder is open */}
						{isOpen && folder.subfolders && renderFolders(folder.subfolders, [...currentPath, folder.name])}
					</li>
				);
			})}
		</ul>
	);

	return (
		<div className="w-full">
			<div
				className={`border rounded-[8px] mb-[6px] px-6 py-4 w-full  ${
					showBorder ? 'border-[#298DFF]' : 'border-[#C4C7E3]'
				} text-[#737790]`}>
				{path?.length > 0 ? path.join(' > ') : 'No folder selected'}
			</div>
			<div className="border h-[190px] overflow-auto custom-scroll rounded-[8px] pl-3 pr-6 py-4 w-full border-[#C4C7E3]">
				{renderFolders(folderStructure)}
			</div>
		</div>
	);
};

export default FolderSelect;

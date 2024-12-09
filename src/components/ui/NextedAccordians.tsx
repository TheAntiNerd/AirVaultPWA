'use client';
import { AddFolder, AddFolderBlue, Folder } from '../svgs';
import React, { useState } from 'react';
import DirectoryDialog from '../poolFlow/DirectoryDialog';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import CustomDialog from '../poolFlow/CustomDialog';
import Details from '../poolFlow/Details'; // Import the Details component
import axiosPost from '@/functions/axios/axiosPost';

interface AccordionProps {
	items: string[];
	onSelectPath: (path: string) => void;
	poolname: string;
}

const NestedAccordions: React.FC<AccordionProps> = ({ items, onSelectPath, poolname }) => {
	const [currentItems, setCurrentItems] = useState<string[]>(items);
	const [path, setPath] = useState<string[]>([]);
	const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
	const [dialog, setDialog] = useState<{ open: boolean; type?: string; path?: string; currentFolder?: string }>({
		open: false,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
	const [currentFolder, setCurrentFolder] = useState<string>('');

	const fetchData = async (folderPath: string) => {
		let success = false;
		try {
			setLoading(true);
			const response = await axiosPost('/api/directory/list', {
				path: folderPath,
			});

			if (response && response?.status === 200 && response?.data?.success === true) {
				setCurrentItems(response.data?.contents);
				setLoading(false);
				success = true;
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
			setLoading(false);
		} finally {
			return success;
		}
	};

	const toggleAccordion = (key: string) => {
		setOpenItems(prevOpenItems => ({
			...prevOpenItems,
			[key]: !prevOpenItems[key],
		}));
	};

	const handleSelect = (item: string) => {
		setSelectedItem(item); // Set the selected item but don't show details yet
	};

	const handleOpen = async (item: string) => {
		const newPath = [...path, item];
		const folderPath = `./${newPath.join('/')}`;
		const success = await fetchData(folderPath);
		if (success) {
			setPath(newPath);
			onSelectPath(newPath.join(' > '));
			setOpenItems({});
		}
	};

	const handleBack = () => {
		const newPath = path.slice(0, -1);
		setPath(newPath);

		if (newPath?.length > 0) {
			const folderPath = `./${newPath.join('/')}`;
			fetchData(folderPath);
		} else {
			setCurrentItems(items);
		}

		setOpenItems({});
		setSelectedItem(null); // Reset the selected item when navigating back
	};

	const handleOpenDetails = () => {
		setIsDetailsVisible(true); // Show the Details panel
	};

	const handleCloseDetails = () => {
		setIsDetailsVisible(false); // Close Details
	};

	const handleActionSelect = (action: string, curFolder?: string) => {
		if (action === 'details') {
			handleOpenDetails(); // Open details if "Details" option is selected
		} else {
			setDialog({ open: true, type: action, path: path.join('/'), currentFolder: curFolder }); // Handle other actions
		}
	};

	const renderAccordionItems = (items: string[]) => {
		return items.map((item, index) => {
			const itemKey = `${item}-${index}`;
			const isOpen = openItems[itemKey];
			return (
				<div key={itemKey} className="rounded-[4px] w-full flex flex-wrap justify-self-end select-none">
					<div
						className="group flex space-x-3 px-2 py-4 hover:bg-[#E5F1FF] justify-between w-full font-[300] rounded-md cursor-pointer"
						onClick={() => handleSelect(item)} // Single click for selection
						onDoubleClick={() => handleOpen(item)} // Double click to open
					>
						<div className="flex items-center space-x-3">
							<Folder color="#8C8FA3" className="w-5 h-5" />
							<span>{item}</span>
						</div>
						<div className="flex items-center space-x-3">
							<DirectoryDialog
								onActionSelect={action => {
									setCurrentFolder(item);
									handleActionSelect(action, item);
								}}
							/>
						</div>
					</div>
					{isOpen && (
						<div className="text-[#44475B] w-full cursor-pointer">
							{loading ? (
								<div></div>
							) : currentItems?.length > 0 ? (
								renderAccordionItems(currentItems)
							) : (
								<div className="text-center text-[#44475B] w-full py-4">This is empty</div>
							)}
						</div>
					)}
				</div>
			);
		});
	};

	return (
		<div className="flex space-x-3">
			{/* Left Accordion Panel */}
			<div className="text-[#44475B] w-full">
				<div className="flex justify-between">
					<div className="flex items-center space-x-2 mb-4">
						<button
							onClick={handleBack}
							className="text-blue-600 hover:bg-[#E5F1FF] font-semibold rounded-full p-1"
							disabled={path?.length === 0}>
							<ArrowLeft color="#737790" />
						</button>
						<span className="text-[22px] flex items-center">
							{poolname}
							{path?.length > 0 && <ChevronRight />}
							{path.join(' > ')}
						</span>
					</div>
					<div
						className="flex border text-[#298DFF] px-4 rounded-[8px] h-10 cursor-pointer items-center space-x-3"
						onClick={() => setDialog({ open: true, type: 'directory' })}>
						<AddFolderBlue />
						<p> New directory</p>
					</div>
				</div>
				{error && <div className="text-red-500 mb-4">{error}</div>}
				{currentItems && currentItems?.length > 0 ? (
					renderAccordionItems(currentItems)
				) : (
					<div className="text-[#44475B] mt-28 font-[300] flex flex-wrap items-center justify-center select-none">
						<div className="w-full text-center mb-2">No directories here.</div>
						<div className="w-full flex justify-center text-center mb-6">
							Click on <p className="font-[400] px-2">“Create directory”</p> to create one.
						</div>
						<div
							className="flex text-[#298DFF] cursor-pointer items-center space-x-3"
							onClick={() => setDialog({ open: true, type: 'directory' })}>
							<AddFolderBlue />
							<p> New directory</p>
						</div>
					</div>
				)}
				<CustomDialog
					open={dialog.open}
					setDialog={setDialog}
					onClose={() => setDialog({ open: false })}
					type={dialog.type as any}
					path={path}
					currentFolder={dialog.currentFolder}
					fetchDirectories={() => fetchData(path.join('/'))} // Add this line to trigger refetch
				/>
			</div>

			<div
				className={`transition-all flex justify-center border-l min-h-[770px] overflow-y-hidden duration-300 ease-in-out ${
					isDetailsVisible ? 'max-w-[380px] w-full' : 'w-0 overflow-hidden hidden'
				}`}>
				<div className="px-4 h-full w-full">
					{isDetailsVisible && (
						<Details
							dialogueOpen={dialog.open}
							onClose={handleCloseDetails}
							path={path}
							directoryName={currentItems}
							currentFolder={currentFolder}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default NestedAccordions;

'use client';

import CollaboratorsAdd from '@/components/directory/CollaboratorsAdd';
import CreateNewDirectory from '@/components/directory/CreateNewDirectory';
import DetailsDir from '@/components/directory/DetailsDir';
import DirMenuSmall from '@/components/directory/DirMenuSmall';
import GroupAdd from '@/components/directory/GroupAdd';
import GroupDelete from '@/components/directory/GroupDelete';
import RenamePopup from '@/components/directory/RenamePopup';
import { Folder } from '@/components/svgs';
import axiosPost from '@/functions/axios/axiosPost';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react';

import { useEffect, useState, Fragment } from 'react';

export default function DirectoryPage() {
	const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
	const [contents, setContents] = useState<string[]>([]); // contains the folders in the directory
	const [selectedFolder, setSelectedFolder] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [showDirMenu, setShowDirMenu] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<string>('');

	// fetch the contents of the directory
	async function fetchContents() {
		setLoading(true);
		const axiosRes = await axiosPost('/api/directory/list', {
			path: breadcrumbs?.join('/') || './',
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			setContents(axiosRes?.data?.contents);
		}
		setLoading(false);
	}

	// function to open a folder
	function openFolder(folder_name: string) {
		setBreadcrumbs(b => [...b, folder_name]);
	}

	// function to go back to the previous folder
	function goBack() {
		setBreadcrumbs(b => b.slice(0, -1));
	}

	useEffect(() => {
		fetchContents();
	}, [breadcrumbs]);

	return (
		<div className="w-full h-full flex flex-col max-h-[100vh] user-select-none">
			<div className="top-bar flex justify-between items-center mb-2">
				<div className="left-top-bar flex justify-start items-center gap-2">
					<div
						className={`p-2 rounded-full hover:bg-blue-200 transition-all duration-300 cursor-pointer ${
							breadcrumbs?.length === 0 ? 'opacity-0 pointer-events-none' : ''
						}`}
						onClick={goBack}>
						<ArrowLeft />
					</div>

					<div className="text-2xl text-gray-500 ">AirVault</div>
					{breadcrumbs?.length >= 1 && <ChevronRight className="text-gray-500" />}

					{breadcrumbs.map((crumb, index) => (
						<Fragment key={index}>
							<div className="text-2xl text-gray-500 ">{crumb}</div>
							{index < breadcrumbs?.length - 1 && <ChevronRight className="text-gray-500" />}
						</Fragment>
					))}
				</div>
				<div className="right-top-bar">
					<button
						onClick={() => setShowPopup('new-directory')}
						className="cta button p-2 rounded border border-grey-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300 cursor-pointer flex items-center gap-2 justify-start">
						<Plus />
						New Directory
					</button>
				</div>
			</div>
			<div
				className="directory-body flex-grow flex flex-col justify-start items-start overflow-auto max-h-[calc(100vh-100px)]"
				onClick={e => {
					if (e.target === e.currentTarget) {
						setSelectedFolder('');
					}
				}}>
				{loading ? (
					<>
						<div className="flex items-center justify-center w-full min-h-screen">
							<div className="loader mb-9" />
						</div>
					</>
				) : contents?.length > 0 ? (
					contents.map((content, index) => (
						<div
							key={`folder-${index}`}
							onClick={e => {
								e.stopPropagation();
								setSelectedFolder(content);
							}}
							onDoubleClick={e => {
								e.stopPropagation();
								setTimeout(() => {
									openFolder(content);
								}, 300);
							}}
							className={`w-full p-4 flex justify-between items-center hover:bg-blue-50 transition-all duration-300 cursor-pointer user-select-none rounded relative ${
								selectedFolder === content ? 'bg-blue-50' : ''
							}`}>
							<div className="left-item flex justify-start items-center gap-4">
								<Folder />
								<div className="text-gray-600 user-select-none">{content}</div>
							</div>
							<div className="right-item">
								<div
									className="p-2 rounded-full hover:bg-blue-200 transition-all duration-300 cursor-pointer"
									onClick={() => setShowDirMenu(true)}>
									<DotsVerticalIcon />
								</div>
							</div>

							{showDirMenu && selectedFolder === content && (
								<DirMenuSmall
									selectedFolder={content}
									breadcrumbs={breadcrumbs}
									setShowDirMenu={setShowDirMenu}
									setShowPopup={setShowPopup}
								/>
							)}
						</div>
					))
				) : (
					<div className="w-full h-full flex flex-col justify-center items-center gap-4 user-select-none">
						<div className="text-gray-500">No directories here.</div>
						<div className="user-select-none">Click on "New directory" to create one.</div>
						<button
							onClick={() => setShowPopup('new-directory')}
							className="cta button p-2 rounded border border-grey-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 transition-all duration-300 cursor-pointer flex items-center gap-2 justify-start">
							<Plus />
							New Directory
						</button>
					</div>
				)}
			</div>

			{showPopup === 'rename' && (
				<RenamePopup
					setShowPopup={setShowPopup}
					breadcrumbs={breadcrumbs}
					folderName={selectedFolder}
					fetchContents={fetchContents}
				/>
			)}
			{showPopup === 'new-directory' && (
				<CreateNewDirectory
					setShowPopup={setShowPopup}
					breadcrumbs={breadcrumbs}
					fetchContents={fetchContents}
				/>
			)}
			{showPopup === 'collaborators' && (
				<CollaboratorsAdd setShowPopup={setShowPopup} breadcrumbs={breadcrumbs} folderName={selectedFolder} />
			)}
			{showPopup === 'groups' && (
				<GroupAdd setShowPopup={setShowPopup} breadcrumbs={breadcrumbs} folderName={selectedFolder} />
			)}
			{showPopup === 'details' && (
				<DetailsDir
					setShowPopup={setShowPopup}
					breadcrumbs={breadcrumbs}
					folderName={selectedFolder}
					fetchContents={fetchContents}
				/>
			)}
			{showPopup === 'delete-dir' && (
				<GroupDelete
					setShowPopup={setShowPopup}
					breadcrumbs={breadcrumbs}
					folderName={selectedFolder}
					fetchContents={fetchContents}
				/>
			)}
		</div>
	);
}

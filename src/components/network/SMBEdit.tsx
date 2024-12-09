import axiosPost from '@/functions/axios/axiosPost';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Folder, Spinner } from '../svgs';
import { ChevronRight } from 'lucide-react';

type Props = {
	setShowPopup: (popup: string) => void;
	fetchContents: () => Promise<void>;
	initialShareName: string;
	initialCumbs: string[];
};

type ShowDirectoriesProps = {
	crumbs: string[];
	initialCumbs: string[];
	directories: string[];
	setBreadcrumbs: Dispatch<SetStateAction<string[]>>;
	fetchDirectories: (crumbs: string[], setContents: (contents: string[]) => void) => Promise<void>;
};

// react component to show directories
function ShowDirectories({
	crumbs,
	directories,
	setBreadcrumbs,
	fetchDirectories,
	initialCumbs,
}: ShowDirectoriesProps) {
	// handle click on a directory
	const [contents, setContents] = useState<string[]>([]);
	const [selectedDirectory, setSelectedDirectory] = useState<string>('');

	const firstElement = initialCumbs[0];
	const updatedInitialCumbs = initialCumbs.slice(1);

	// handle click on a directory
	async function handleClick(directory: string) {
		if (directory === selectedDirectory) {
			setSelectedDirectory('');
			setContents([]);
		} else {
			setContents([]);
			setSelectedDirectory(directory);
			await fetchDirectories([...crumbs, directory], setContents);
		}
		setBreadcrumbs([...crumbs, directory]);
	}

	useEffect(() => {
		(async () => {
			if (directories.includes(firstElement)) {
				setSelectedDirectory(firstElement);
				await fetchDirectories([...crumbs, firstElement], setContents);
			}
		})();
	}, []);

	return directories.map((directory, index) => (
		<div key={`dir-${index}`} className="w-full">
			<div
				onClick={() => handleClick(directory)}
				className=" w-full text-gray-600 flex justify-start items-center gap-2 cursor-pointer mb-2 hover:text-blue-500 transition-all duration-300">
				<div className={`transition-all duration-300 ${directory === selectedDirectory ? 'rotate-90' : ''}`}>
					<ChevronRight />
				</div>
				<Folder />
				<div className={`${directory === selectedDirectory ? 'text-blue-500' : ''}`}>{directory}</div>
			</div>

			{/* contents */}
			{directory === selectedDirectory && (
				<div className="pl-4 flex flex-col justify-start items-center gap-2">
					<ShowDirectories
						crumbs={[...crumbs, directory]}
						directories={contents}
						fetchDirectories={fetchDirectories}
						setBreadcrumbs={setBreadcrumbs}
						initialCumbs={updatedInitialCumbs}
					/>
				</div>
			)}
		</div>
	));
}

export default function SMBEdit({ setShowPopup, fetchContents, initialShareName, initialCumbs }: Props) {
	const [loading, setLoading] = useState(false);
	const [breadcrumbs, setBreadcrumbs] = useState<string[]>(initialCumbs);
	const [contents, setContents] = useState<string[]>([]);
	const [shareName, setShareName] = useState<string>(initialShareName);

	// function to create a new SMB share
	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (loading) return;
		setLoading(true);

		if (breadcrumbs?.length === 0) {
			toast.error('No directory selected');
			setLoading(false);
			return;
		}

		const shareNamePattern = /^[a-z][a-z0-9_]*$/;
		if (!shareNamePattern.test(shareName)) {
			toast.error(
				'Share name must be alphanumeric, start with a letter, and contain no spaces or capital letters (underscores are allowed)'
			);
			setLoading(false);
			return;
		}

		try {
			const axiosRes = await axiosPost('/api/smb/edit-share', {
				folder_path: `./${breadcrumbs.join('/')}`,
				share_name: shareName,
			});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
				toast.success(axiosRes?.data?.message || 'SMB share edited successfully');
			} else {
				toast.error(axiosRes?.data?.message || 'Failed to edit SMB share');
			}
		} catch (error) {
			toast.error('Failed to create SMB share');
		} finally {
			setShowPopup('');
			setLoading(false);
			fetchContents();
		}
	}

	// function to fetch directories
	async function fetchDirectories(crumbs: string[], setContents: (contents: string[]) => void) {
		setLoading(true);
		const axiosRes = await axiosPost('/api/directory/list', {
			path: crumbs.join('/'),
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			setContents(axiosRes?.data?.contents);
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchDirectories([], setContents);
	}, []);

	return (
		<>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[110] w-96 rounded-lg">
				<form onSubmit={handleFormSubmit} className="w-full bg-white m-auto rounded-xl p-8">
					<h2 className="text-2xl text-center">Edit SMB share</h2>

					<label htmlFor="smb-share-name" className="flex flex-col gap-2">
						<div className="text-gray-600 mt-4">Name *</div>
						<input
							type="text"
							value={shareName}
							readOnly
							required
							id="smb-share-name"
							placeholder="New share name"
							className="w-full border text-gray-400 border-gray-200 rounded-xl p-4 outline-none border-width-2"
						/>
					</label>

					<label htmlFor="dir-path" className="flex flex-col gap-2">
						<div className="text-gray-600 mt-4">Location *</div>
						<input
							type="text"
							value={`./${breadcrumbs.join('/')}`}
							required
							readOnly
							id="dir-path"
							placeholder="Folder path"
							className="w-full border text-gray-400 text-sm border-gray-200 rounded-xl p-4 outline-none border-width-2 focus:border-blue-500 truncate"
						/>
						<div className="w-full h-60 overflow-auto border border-gray-600 rounded-xl p-4 border-width-2">
							{contents?.length > 0 ? (
								<ShowDirectories
									crumbs={[]}
									directories={contents}
									fetchDirectories={fetchDirectories}
									setBreadcrumbs={setBreadcrumbs}
									initialCumbs={initialCumbs}
								/>
							) : (
								<div className="w-full h-full flex justify-center items-center">
									<div className="text-gray-400">No directories found</div>
								</div>
							)}
						</div>
					</label>

					<div className="flex flex-row justify-between items-center gap-4 mt-6">
						<button
							type="button"
							className="border border-gray-200 w-full text-gray-600 px-4 py-4 rounded-[10px]"
							onClick={() => setShowPopup('')}>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex items-center justify-center bg-blue-500 w-full text-white px-4 py-4 rounded-[10px]">
							{loading ? (
								<>
									<Spinner className="w-6 h-6" />
								</>
							) : (
								<span>Edit</span>
							)}
						</button>
					</div>
				</form>
			</div>
			<div
				className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[100]"
				onClick={() => setShowPopup('')}></div>
		</>
	);
}

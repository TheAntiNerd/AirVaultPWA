'use client';
import axiosPost from '@/functions/axios/axiosPost';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

interface CustomDialogProps {
	open: boolean;
	setDialog: (props: any) => void;
	onClose: () => void;
	type: 'user' | 'directory' | 'rename' | 'delete' | 'addgroup' | 'collaborators';
	userEmail?: string;
	userName?: string;
	path?: string[];
	currentFolder?: string;
	fetchDirectories?: () => void;
}

const CustomDialog: FC<CustomDialogProps> = ({
	open,
	onClose,
	type,
	userEmail,
	userName,
	path,
	currentFolder,
	setDialog,
	fetchDirectories,
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [directoryName, setDirectoryName] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	const [usersList, setUsersList] = useState<any[]>([]);
	const [usernames, setUsernames] = useState<string[]>([]);
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>('');

	// function to fetch users
	const fetchUsers = async () => {
		const axiosRes = await axiosPost('/api/user/list', {});
		if (axiosRes && axiosRes.status === 200 && axiosRes.data.success) {
			const usernamesList = axiosRes.data.list.map((u: any) => u.username || '');
			setUsersList(axiosRes.data.list);
			setUsernames(usernamesList);
		}
	};

	// function to fetch groups
	const fetchGroups = async () => {
		const axiosRes = await axiosPost('/api/group/list', {});
		if (axiosRes && axiosRes.status === 200 && axiosRes.data.success) {
			const usernamesList = axiosRes.data.list.map((u: any) => u.username || '');
			setUsersList(axiosRes.data.list);
			setUsernames(usernamesList);
		}
	};

	useEffect(() => {
		if (type === 'delete' || type === 'collaborators') {
			fetchUsers();
		} else if (type === 'addgroup') {
			fetchGroups();
		}
	}, [type]);

	useEffect(() => {
		setSelectedValues([]);
		setSelectedAccessLevel('');
	}, [open]);

	if (!open) return null;

	function handleCreateDirectory() {
		if (directoryName && path) {
			const createDirectory = async (folderPath: string, name: string) => {
				try {
					setLoading(true);
					const response = await axios.post('/api/directory/new', {
						path: `${folderPath}/${name}`,
						name,
					});
					setLoading(false);
					onClose();
					if (fetchDirectories) fetchDirectories();
				} catch (err) {
					setLoading(false);
					console.error('Failed to create directory', err);
				} finally {
					setDirectoryName('');
				}
			};
			createDirectory(`./${path?.join('/')}`, directoryName);
		} else {
			alert('Please enter a valid directory name.');
		}
	}

	// function to add access to groups
	async function addAccessToGroups() {
		try {
			const axiosRes = await axiosPost(`/api/directory/group/grant-access`, {
				directoryPath: currentFolder
					? `./${[...(path || []), currentFolder]?.join('/')}`
					: `./${path?.join('/')}`,
				groupNames: selectedValues,
				accessLevel: selectedAccessLevel,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data.success) {
				toast.success('Access added to groups successfully!');
			} else {
				toast.error('Failed to add access to groups!');
			}
		} catch (error) {
			toast.error('Failed to add access to groups!');
		} finally {
			setDialog({ open: false });
		}
	}

	// function to handle CTA clicks
	async function handleCTAClick() {
		switch (type) {
			case 'addgroup':
				addAccessToGroups();
				break;

			default:
				return;
		}
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white w-full p-10 max-w-[414px] rounded-[12px] shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-[30px] text-[#44475B] text-center w-full ">
						{type === 'collaborators' && 'Collaborators'}
						{type === 'user' && 'Add User'}
						{type === 'directory' && 'Create Directory'}
						{type === 'rename' && 'Rename Directory'}
						{type === 'delete' && 'Delete'}
						{type === 'addgroup' && 'Groups'}
					</h2>
				</div>

				<div className="space-y-4 mb-6">
					<RenderContent
						type={type}
						directoryName={directoryName}
						setDirectoryName={setDirectoryName}
						userName={userName}
						userEmail={userEmail}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						usersList={usersList}
						usernames={usernames}
						selectedValues={selectedValues}
						setSelectedValues={setSelectedValues}
						selectedAccessLevel={selectedAccessLevel}
						setSelectedAccessLevel={setSelectedAccessLevel}
					/>
				</div>

				<div className="flex space-x-3 w-full justify-between font-[300]">
					<button
						onClick={onClose}
						className="px-4 py-4 w-[48%] text-[14px] font-light rounded-[8px] border text-[#737790] hover:bg-gray-100">
						Cancel
					</button>
					{type === 'directory' ? (
						<button
							onClick={handleCreateDirectory}
							className="px-4 py-4 text-white w-[48%] font-light text-[14px] rounded-[8px] bg-[#298DFF] hover:bg-blue-600">
							Create Directory
						</button>
					) : (
						<button
							onClick={handleCTAClick}
							className="px-4 py-4 text-white w-[48%] font-light text-[14px] rounded-[8px] bg-[#298DFF] hover:bg-blue-600">
							{type === 'collaborators' && 'Invite'}
							{type === 'user' && 'Add User'}
							{type === 'rename' && 'Done'}
							{type === 'delete' && 'Delete directory?'}
							{type === 'addgroup' && 'Done'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CustomDialog;

const RenderContent = ({
	type,
	directoryName,
	setDirectoryName,
	userName,
	searchTerm,
	setSearchTerm,
	usersList,
	usernames,
	selectedValues,
	setSelectedValues,
	selectedAccessLevel,
	setSelectedAccessLevel,
}: any) => {
	const [charCount, setCharCount] = useState(0);
	const [filteredUsers, setFilteredUsers] = useState<string[]>(usernames);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: (val: string) => void) => {
		const value = e.target.value.slice(0, 63);
		setValue(value);
		setCharCount(value?.length);
	};

	useEffect(() => {
		const filtered = usernames.filter((user: string) => user.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredUsers(filtered);
	}, [searchTerm, usernames]);

	const [showOptions, setShowOptions] = useState(false);

	const handleSelect = (value: string) => {
		setSelectedValues((c: any[]) => [...c, value]);
	};

	const handleRemove = (value: string) => {
		setSelectedValues((c: any[]) => c.filter((v: any) => v !== value));
	};

	const toggleOptions = () => setShowOptions(prev => !prev);

	switch (type) {
		case 'addgroup':
			return (
				<>
					<div className="flex flex-wrap">
						<label className="mb-2 text-[#44475B] text-[14px] font-light">Group</label>
						<div className="w-full relative">
							<div className="flex z-50 flex-wrap gap-2 p-2 border border-[#D8DAEB] rounded-[8px] max-h-60 min-h-14">
								<div className="flex flex-wrap items-center gap-2 ml-4">
									{selectedValues.map((value: string, i: number) => (
										<div
											key={`group-${i}`}
											className="flex border rounded-[40px] items-center px-2 py-1">
											<span className="text-[#44475B] mr-2">{value}</span>
											<button
												onClick={() => handleRemove(value)}
												className="text-red-500 hover:text-red-700">
												<p>
													<X color="#8F92A6" size={15} />
												</p>
											</button>
										</div>
									))}
								</div>
								<Select onValueChange={handleSelect}>
									<div>
										<SelectTrigger className="realative w-[320px] border-none">
											<div></div>
										</SelectTrigger>
										<SelectContent className="bg-white w-full rounded-[8px]">
											{usersList?.map(
												(userObj: any, i: number) =>
													!selectedValues.includes(userObj?.group_name) && (
														<SelectItem
															key={`users-${i}`}
															className="px-2"
															value={userObj?.group_name}>
															{userObj?.group_name}
														</SelectItem>
													)
											)}
										</SelectContent>
									</div>
								</Select>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap">
						<label className="mb-2 text-[#44475B] text-[14px] font-light">Access Level</label>
						<div className="w-full">
							<Select
								value={selectedAccessLevel}
								onValueChange={(value: any) => setSelectedAccessLevel(value)}>
								<SelectTrigger className="w-full h-14 border-[#D8DAEB] rounded-[8px] px-2">
									<div className="text-[#A3A09F] px-3">
										<SelectValue placeholder="--select--" />
									</div>
								</SelectTrigger>
								<SelectContent className="bg-white rounded-[8px]">
									<SelectItem value="Read">Read</SelectItem>
									<SelectItem value="Write">Write</SelectItem>
									<SelectItem value="Traverse">Traverse</SelectItem>
									<SelectItem value="None">None</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</>
			);

		case 'collaborators':
			return (
				<>
					<div className="flex flex-wrap">
						<label className="mb-2 text-[#44475B] text-[14px] font-light">Username</label>
						<div className="w-full relative">
							<div className="flex z-50 flex-wrap gap-2 p-2 border border-[#D8DAEB] rounded-[8px] max-h-60 min-h-14">
								<div className="flex flex-wrap items-center gap-2 ml-4">
									{selectedValues.map((value: string, i: number) => (
										<div
											key={`colab-${i}`}
											className="flex border rounded-[40px] items-center px-2 py-1">
											<span className="text-[#44475B] mr-2">{value}</span>
											<button
												onClick={() => handleRemove(value)}
												className="text-red-500 hover:text-red-700">
												<p>
													<X color="#8F92A6" size={15} />
												</p>
											</button>
										</div>
									))}
								</div>
								<Select onValueChange={handleSelect}>
									<div>
										<SelectTrigger className="realative w-[320px] border-none">
											<div></div>
										</SelectTrigger>
										<SelectContent className="bg-white w-full rounded-[8px]">
											{/* {options.map(option => (
												<SelectItem key={option} className="px-2" value={option}>
													{option}
												</SelectItem>
											))} */}
										</SelectContent>
									</div>
								</Select>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap">
						<label className="mb-2 text-[#44475B] text-[14px] font-light">Access Level</label>
						<div className="w-full">
							<Select>
								<SelectTrigger className="w-full h-14 border-[#D8DAEB] rounded-[8px] px-2">
									<div className="text-[#A3A09F] px-3">
										<SelectValue placeholder="--select--" />
									</div>
								</SelectTrigger>
								<SelectContent className="bg-white rounded-[8px]">
									<SelectItem value="Read">Read</SelectItem>
									<SelectItem value="Write">Write</SelectItem>
									<SelectItem value="Traverse">Traverse</SelectItem>
									<SelectItem value="None">None</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</>
			);
		case 'user':
			return (
				<>
					<label className="mb-2 text-[#44475B] text-[14px] font-light">Enter the email</label>
					<input
						type="text"
						placeholder="email@domain.com"
						className="w-full rounded-[8px] text-[#44475B] border px-6 py-4 text-[14px] focus:outline-blue-500"
						onChange={e => handleInputChange(e, () => setCharCount(e.target.value?.length))}
						maxLength={63}
					/>
					<div className="text-right -translate-y-2 flex justify-end text-[12px] text-[#A3A09F] w-full">
						<p className="bg-white px-2">{charCount}/63</p>
					</div>
				</>
			);

		case 'directory':
			return (
				<>
					<label className="mb-2 text-[#44475B] text-[14px] font-light">Directory name</label>
					<input
						type="text"
						value={directoryName}
						onChange={e => handleInputChange(e, setDirectoryName)}
						placeholder="Enter directory name"
						className="w-full rounded-[8px] text-[#44475B] border px-6 py-4 text-[14px] focus:outline-blue-500"
						maxLength={63}
					/>
					<div className="text-right -translate-y-6 flex justify-end text-[12px] text-[#A3A09F] w-full">
						<p className="bg-white px-2 -translate-x-2">{charCount}/63</p>
					</div>
				</>
			);

		case 'rename':
			return (
				<>
					<div className="flex flex-wrap">
						<label className="mb-2 text-[#44475B] text-[14px] font-light">Name</label>
						<input
							type="text"
							defaultValue={userName}
							className="w-full rounded-[8px] text-[#44475B] border px-6 py-4 text-[14px] focus:outline-blue-500"
							onChange={e => handleInputChange(e, val => setCharCount(val?.length))}
							maxLength={63}
						/>
						<div className="text-right -translate-y-2 flex justify-end text-[12px] text-[#A3A09F] w-full">
							<p className="bg-white px-2 -translate-x-2">{charCount}/63</p>
						</div>
					</div>
				</>
			);

		case 'delete':
			console.log(usersList);
			return (
				<div className="flex flex-wrap">
					<div className="mb-2 text-[#44475B] text-center w-full  text-[14px] font-light">
						This can't be undone
					</div>
				</div>
			);

		default:
			return null;
	}
};

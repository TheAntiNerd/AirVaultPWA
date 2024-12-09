import { CircleMinus, Search, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Folder, Network, OnSwitch, Switch as SvgSwitch } from '../svgs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosPost from '@/functions/axios/axiosPost';

interface DetailsProps {
	onClose: () => void;
	path: string[];
	directoryName: string[];
	currentFolder: string;
	dialogueOpen: boolean;
}

const mapPermission = (permission: string) => {
	switch (permission) {
		case 'rwx':
			return 'Write';
		case 'r-x':
			return 'Read';
		case '--x':
			return 'Traverse';
		case '---':
			return 'None';
		default:
			return 'None';
	}
};

const Details: React.FC<DetailsProps> = ({ onClose, path, directoryName, currentFolder, dialogueOpen }) => {
	const [groupSearchTerm, setGroupSearchTerm] = useState('');
	const [showAllUsers, setShowAllUsers] = useState(false);
	const [showAllGroups, setShowAllGroups] = useState(false);
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [udata, setuData] = useState<{ [key: string]: string }>({});
	const [gdata, setgData] = useState<{ [key: string]: string }>({});
	const [nameInput, setNameInput] = useState(''); // State for the input value

	const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value?.length <= maxLength) {
			setNameInput(value); // Update the input value
		}
	};
	const maxLength = 63;

	const setUserPermission = async (folderPath: string, user: string, permissions: string) => {
		try {
			setLoading(true);
			const response = await axios.post('/api/permissions/setuserpermissions', {
				path: `${folderPath}`,
				user: `${user}`,
				permission: `${permissions}`,
			});
			setLoading(false);
		} catch (err) {
			setLoading(false);
		}
	};

	const setGroupPermission = async (folderPath: string, group: string, permissions: string) => {
		console.log('Setting permissions to : ', folderPath);
		try {
			setLoading(true);
			const axiosRes = await axios.post('/api/directory/group/grant-access', {
				directoryPath: folderPath,
				groupNames: [group],
				accessLevel: permissions,
			});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
				toast.success('Access updated for the group successfully!');

				setgData(p => ({ ...p, [group]: permissions }));
			} else {
				toast.error('Failed to update access for the group!');
			}
		} catch (err) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchUser = async (folderPath: string) => {
			try {
				setLoading(true);
				const axiosRes = await axiosPost('/api/permissions/userpermissions', {
					path: `${folderPath}`,
				});

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
					const userPermissions = axiosRes.data?.permissions as { [key: string]: string };
					// Map permissions received from backend
					const mappedPermissions = Object.fromEntries(
						Object.entries(userPermissions)
							.map(([user, permission]) => {
								if (user) {
									return [user, mapPermission(permission)];
								} else undefined;
							})
							.filter(n => !!n)
							.sort(([groupA], [groupB]) => groupA.localeCompare(groupB))
					);

					setuData(mappedPermissions);
				}
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};
		fetchUser(currentFolder ? `./${[...path, currentFolder]?.join('/')}` : `./${path.join('/')}`);

		const fetchGroup = async (folderPath: string) => {
			try {
				setLoading(true);
				const axiosRes = await axiosPost('/api/directory/group/access-list', {
					path: `${folderPath}`,
				});

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
					const groupPermissions = axiosRes.data?.permissions as { [key: string]: string };

					// Map permissions received from backend
					const mappedPermissions = Object.fromEntries(
						Object.entries(groupPermissions)
							.map(([group, permission]) => {
								if (group) {
									return [group, mapPermission(permission)];
								} else undefined;
							})
							.filter(n => !!n)
							.sort(([groupA], [groupB]) => groupA.localeCompare(groupB))
					);
					setgData(mappedPermissions);
				}
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};
		fetchGroup(currentFolder ? `./${[...path, currentFolder]?.join('/')}` : `./${path.join('/')}`);
	}, [path, currentFolder, dialogueOpen]);

	// function to remove group permission
	async function removeGroupPermission(group: string) {
		setLoading(true);
		try {
			if (loading) return;

			// send the request to the server
			const axiosRes = await axiosPost(`/api/directory/group/remove`, {
				path: `./${path.join('/')}`,
				groupName: group,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data.success) {
				toast.success('Group permission removed successfully!');

				setgData(p => {
					delete p[group];
					return p;
				});
			} else {
				toast.error('Failed to remove group permission!');
			}
		} catch (error) {
			toast.error('Failed to remove group permission!');
		} finally {
			setLoading(false);
		}
	}

	return loading ? (
		<div className="flex items-center justify-center min-h-screen">
			<div className="loader mb-9" />
		</div>
	) : (
		<div className="max-w-[360px]">
			<div className="container">
				<div className="flex w-full text-[#44475B] mb-5 items-center justify-between">
					<div className="flex items-center space-x-2">
						<Folder />
						<p>Client resources details</p>
					</div>
					<button onClick={onClose}>
						<X color="#8F92A6" />
					</button>
				</div>
				{/* <div className={`flex flex-wrap justify-center  w-full items-start ${isSwitchOn ? 'h-48' : 'h-10'}`}> */}
				{/* <div className="w-full flex  justify-between">
						<div className="flex items-center space-x-2">
							<Network />
							<p>Network shared</p>
						</div>
						<div className="w-12 h-8 cursor-pointer" onClick={() => setIsSwitchOn(!isSwitchOn)}>
							{isSwitchOn ? (
								<OnSwitch className="w-12 h-8 cursor-pointer" />
							) : (
								<SvgSwitch className="w-12 h-8 cursor-pointer" />
							)}
						</div>
					</div> */}
				{/* {isSwitchOn && (
						<div className="flex w-full justify-center mt-4 flex-wrap">
							<label className="mb-2 w-full text-[#44475B] text-[14px] font-light">Share Name*</label>
							<input
								type="text"
								value={nameInput}
								onChange={handleNameInputChange}
								placeholder=""
								className="w-full rounded-[8px] text-[#44475B] border px-6 py-4 text-[14px] focus:outline-blue-500"
							/>
							<div className="w-full flex  items-center justify-end  -translate-y-2.5 -translate-x-3  text-[12px] text-[#737790]">
								<p className="bg-white px-2">
									{nameInput.length}/{maxLength}
								</p>
							</div>
							<button className="text-[#298DFF] border py-2 px-3 rounded-[8px]">Start Share</button>
						</div>
					)} */}
				{/* </div> */}
			</div>

			<div className="flex items-center bg-white w-full flex-wrap justify-center mt-6">
				{/* <div className="flex flex-wrap w-full mb-6">
					<div className="translate-x-3 translate-y-3">
						<Search color="#737790" />
					</div>
					<input
						className="text-[14px] -mx-6 border-[1.5px] w-full border-[#D8DAEB] rounded-[8px] px-12 py-3"
						placeholder="Search"
						value={groupSearchTerm}
						onChange={e => setGroupSearchTerm(e.target.value)}
					/>
				</div> */}

				{/* Shared Members */}
				<div className="max-h-[600px] w-full">
					<div className="flex flex-wrap w-full mb-9">
						<h3 className="text-[#737790] w-full mb-3">Shared members</h3>
						<div className="w-full">
							{Object.keys(udata)?.length !== 0 ? (
								Object.keys(udata)?.map(
									(user, index) =>
										user && (
											<div key={index} className="w-full">
												<div className="mb-2 flex w-full flex-wrap items-center justify-between">
													<div>
														<div className="text-[#44475B]">{user}</div>
														{/* <div className='text-[12px] text-[#8C8FA3]'>{udata[user]}</div> */}
													</div>
													<div className="flex items-center space-x-3">
														<select
															value={udata[user]}
															onChange={e => {
																const newPermission = e.target?.value;
																setUserPermission(
																	`./${[...path, currentFolder]?.join('/')}`,
																	user,
																	newPermission
																);
															}}
															className="appearance-none p-2 outline-none w-28 border border-gray-300 rounded-[8px] cursor-pointer">
															<option value="Read">Read</option>
															<option value="Write">Write</option>
															<option value="Traverse">Traverse</option>
															<option value="Deny">Deny</option>
														</select>
														<div className="cursor-pointer">
															<div className="cursor-pointer">
																<CircleMinus
																	className="hover:stroke-red-500 transition-all duration-300"
																	color="#8C8FA3"
																	size={17}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
								)
							) : (
								<div className="w-full py-10">
									<div className="text-center text-gray-500 text-sm">No user permissions</div>
								</div>
							)}
							{/* 
							{Object.keys(udata).length > 5 && (
								<button
									className="text-[#44475B] mt-3 text-center w-full"
									onClick={() => setShowAllUsers(!showAllUsers)}>
									{showAllUsers ? 'Show Less' : `Show ${Object.keys(udata).length - 5} More...`}
								</button>
							)} */}
						</div>
					</div>

					{/* Shared Groups */}
					<div className="flex flex-wrap w-full">
						<h3 className="text-[#737790] w-full mb-3">Shared groups</h3>
						<div className="w-full">
							{Object.keys(gdata)?.length !== 0 ? (
								Object.keys(gdata)?.map(
									(group, index) =>
										group && (
											<div key={index} className="w-full text-[#44475B] flex items-center">
												<div className="mb-3.5 flex w-full flex-wrap items-center justify-between">
													<div>
														<div className="text-[#44475B]">{group}</div>
														{/* <div className='text-[12px] text-[#8C8FA3]'>{gdata[group]}</div> */}
													</div>
													<div className="flex items-center space-x-3">
														<select
															value={gdata[group]}
															onChange={e => {
																const newPermission = e.target?.value;
																setGroupPermission(
																	`./${[...path, currentFolder].join('/')}`,
																	group,
																	newPermission
																);
															}}
															className="appearance-none p-2 outline-none w-28 border border-gray-300 rounded-[8px] cursor-pointer">
															<option value="Read">Read</option>
															<option value="Write">Write</option>
															<option value="Traverse">Traverse</option>
															<option value="Deny">Deny</option>
														</select>
														<div className="cursor-pointer">
															<div
																className="cursor-pointer"
																onClick={() => removeGroupPermission(group)}>
																<CircleMinus
																	className="hover:stroke-red-500 transition-all duration-300"
																	color="#8C8FA3"
																	size={17}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										)
								)
							) : (
								<div className="w-full py-10">
									<div className="text-center text-gray-500 text-sm">No group permissions</div>
								</div>
							)}
							{/* {Object.keys(gdata).length > 5 && (
								<button
									className="text-[#44475B] mt-3 text-center w-full"
									onClick={() => setShowAllGroups(!showAllGroups)}>
									{showAllGroups ? 'Show Less' : `Show ${Object.keys(gdata).length - 5} More...`}
								</button>
							)} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Details;

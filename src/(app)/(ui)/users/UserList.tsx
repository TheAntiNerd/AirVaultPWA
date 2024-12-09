'use client';
import { ArrowRightLeft, CircleMinus, EllipsisVertical, PenIcon, Users, X } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import ResetPassword from '@/components/forms/ResetPassword';
import EditUser from '@/components/forms/EditUser';
import { StyledTableCell, StyledTableRow } from '@/components/ui/table';
import { ThemeProvider } from '@/components/ui/theme';
import UserSettings from '@/components/forms/UserSettings';
import { Button } from '@/components/ui/button';
import { InputWithCopy } from '@/components/ui/input';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';

const UserDropdown: React.FC<any> = ({
	user,
	modalData,
	setModalData,
	removeUserModalData,
	setRemoveUserModalData,
	getUserList,
}) => {
	const closeModal = () => {
		setModalData({ ...modalData, isOpen: false });
	};

	const closeRemoveUserModal = () => {
		setRemoveUserModalData({ ...removeUserModalData, isOpen: false });
	};

	// edit user details
	async function editUserDetailsReq() {}

	const editUserDetails = (username: string) => {
		// const user = usersList.find((user: IUser) => user.username === username) as unknown as IUser;
		// if (!user) return;
		setModalData({
			...modalData,
			isOpen: true,
			header: 'Edit user',
			children: (
				<EditUser
					handleSuccess={() => closeModal()}
					handleCancel={closeModal}
					username={user?.username}
					getUserList={getUserList}
				/>
			),
			okButtonText: 'Save changes',
			showFooter: false,
			btnloader: false,
		});
	};

	const removeUser = async () => {
		if (!user?.username) return;

		setRemoveUserModalData({ ...removeUserModalData, btnLoading: true });

		const axiosRes = await axiosPost('/api/user/remove', { username: user?.username });

		if (axiosRes && axiosRes?.status && axiosRes?.data?.success === true) {
			toast.success(`User: ${user?.username} removed successfully`);

			await getUserList();
			setRemoveUserModalData({ ...removeUserModalData, btnLoading: false });
		} else {
			toast.error(`Failed to remove user: ${user?.username}`);
			setRemoveUserModalData({ ...removeUserModalData, btnLoading: false });
		}

		closeRemoveUserModal;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-[50px] hover:none shadow-none outline-none border-none" asChild>
				<Button>
					<EllipsisVertical color="#737790" size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[170px] mr-[45px]">
				<DropdownMenuItem
					onClick={() =>
						setRemoveUserModalData({
							...removeUserModalData,
							isOpen: true,
							header: 'Remove user?',
							okButtonText: 'Yes! Do it',
							children: <center className="mb-4">This can't be undone</center>,
							handleSuccess: () => {
								removeUser();
							},
						})
					}>
					<CircleMinus className="mr-[10px] w-[15px]" color="#737790" />
					<span>Remove user</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => editUserDetails(user.username)}>
					<PenIcon className="mr-[10px] w-[15px]" color="#737790" />
					<span>Edit user</span>
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() =>
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Change role',
							children: (
								<UserSettings
									getUserList={getUserList}
									handleCancel={closeModal}
									handleSuccess={closeModal}
									user={user}
								/>
							),
							showFooter: false,
						})
					}>
					<Users color="#737790" strokeWidth={2} className="mr-[10px] w-[15px] h-[15px]" />
					<span>Change role</span>
				</DropdownMenuItem>
				{/* <DropdownMenuItem
					onClick={() =>
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Cancel invite?',
							okButtonText: 'Yes! Do it',
							children: <></>,
						})
					}>
					<X
						color="#737790"
						strokeWidth={3}
						className="mr-[10px] w-[15px] h-[15px] border-[1.2px] p-[1px] border-black rounded-full"
					/>
					<span>Cancel invite</span>
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const UserList = ({ mode = 'default' }) => {
	const [usersList, setUsersList] = useState([]);
	const [modalData, setModalData] = useState({
		header: '',
		isOpen: false,
		okButtonText: '',
		children: <></>,
		handleSuccess: () => {
			console.log('handleSuccess');
		},
		showFooter: true,
		btnLoading: false,
	});
	const [loading, setLoading] = useState(true);
	const [removeUserModalData, setRemoveUserModalData] = useState({
		header: '',
		isOpen: false,
		okButtonText: '',
		children: <></>,
		handleSuccess: () => {
			console.log('remove user');
		},
		showFooter: true,
		btnLoading: false,
	});

	const closeModal = () => {
		setModalData({ ...modalData, isOpen: false });
	};

	const createOrResetPassword = (username: string) => {
		const user = usersList.find((user: IUser) => user.username === username) as unknown as IUser;
		if (!user) return;

		setModalData({
			...modalData,
			isOpen: true,
			header: 'Reset password',
			children: <ResetPassword handleSuccess={closeModal} handleCancel={closeModal} username={user?.username} />,
			okButtonText: 'Update',
			showFooter: false,
		});

		// if (user.password) {
		// 	setModalData({
		// 		...modalData,
		// 		isOpen: true,
		// 		header: 'Reset password',
		// 		children: <ResetPassword handleSuccess={closeModal} handleCancel={closeModal} />,
		// 		okButtonText: 'Update',
		// 		showFooter: false,
		// 	});
		// } else {
		// 	setModalData({
		// 		...modalData,
		// 		isOpen: true,
		// 		header: 'Create password',
		// 		children: <ResetPassword handleSuccess={closeModal} handleCancel={closeModal} />,
		// 		okButtonText: 'Save',
		// 		showFooter: false,
		// 	});
		// }
	};

	async function getUserList() {
		// fetch the users list from the server
		const axiosRes = await axiosPost('/api/user/list', {});

		if (axiosRes && axiosRes?.status && axiosRes?.data?.success === true) {
			setUsersList(axiosRes?.data?.list || []);
		}
	}

	useEffect(() => {
		(async () => {
			await getUserList();
			setLoading(false);
		})();
	}, []);

	return (
		<ThemeProvider>
			<Modal
				header={modalData.header}
				isOpen={modalData.isOpen}
				handleCancel={() => setModalData({ ...modalData, isOpen: false })}
				handleSuccess={modalData.handleSuccess}
				showFooter={modalData.showFooter}
				okButtonText={modalData?.okButtonText}
				btnLoading={modalData?.btnLoading}>
				{modalData.children}
			</Modal>
			<Modal
				header={removeUserModalData.header}
				isOpen={removeUserModalData.isOpen}
				handleCancel={() => setRemoveUserModalData({ ...removeUserModalData, isOpen: false })}
				handleSuccess={removeUserModalData.handleSuccess}
				showFooter={removeUserModalData.showFooter}
				okButtonText={removeUserModalData?.okButtonText}
				btnLoading={removeUserModalData?.btnLoading}>
				{removeUserModalData.children}
			</Modal>
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<div className="loader mb-9" />
				</div>
			) : (
				<div className="max-w-[1080px] mx-auto ">
					<div className="flex items-center pl-6 md:pl-0 justify-between">
						<div className="flex  items-center gap-3">
							<h3 className="font-medium text-[#272B42] text-[30px]">Users</h3>
						</div>
						{usersList?.length > 0 && (
							<Link
								className="px-6 py-3 block font-medium   rounded-[8px] border text-white border-[#E1E3F5] bg-[#298DFF] hover:bg-blue-700"
								href={'/users/new'}>
								Add user
							</Link>
						)}
					</div>
					<div className="mt-8 flow-root">
						<div className=" overflow-x-auto ">
							<div className="inline-block min-w-full rounded-[8px] align-middle">
								<div className="overflow-hidden border border-[#E1E3F5] ring-opacity-5 rounded-[8px]">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-[#F9FAFB]">
											<tr>
												<th
													scope="col"
													className="p-6 text-left text-base font-semibold text-[#44475B] ">
													Name
												</th>
												<th
													scope="col"
													className="p-6  text-left text-base font-semibold text-[#44475B]">
													Username
												</th>
												<th
													scope="col"
													className="p-6   text-left text-base font-semibold text-[#44475B]">
													Password
												</th>
												<th
													scope="col"
													className="p-6   text-left text-base font-semibold text-[#44475B]">
													Webrole
												</th>
												<th
													scope="col"
													className="p-4  w-[72px] text-left text-base font-semibold text-[#44475B]"></th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{usersList.map((user: IUser) => (
												<tr>
													<td className="whitespace-nowrap p-6 text-base text-[#44475B] ">
														<span className="flex gap-1 items-start flex-col ">
															<span>
																{user?.firstName} {user?.lastName}
															</span>
															{/* <Badge className="text-[12px] font-normal rounded-[40px] ">
															Pending
														</Badge> */}
														</span>
													</td>
													<td className="whitespace-nowrap p-6 text-base text-[#44475B]">
														{user.username}
													</td>
													<td className="whitespace-nowrap p-6 text-base text-[#44475B]">
														<div className="flex flex-col">
															<span>{`***********`}</span>
															<Link
																onClick={() => createOrResetPassword(user.username)}
																href="#"
																className="text-blue-500 font-medium hover:underline text-[14px]">
																Reset Password
															</Link>
														</div>
													</td>
													<td className="whitespace-nowrap p-6 text-base text-[#44475B]">
														{user?.role}
													</td>
													<td className="whitespace-nowrap p-4 text-base text-[#44475B]">
														<UserDropdown
															user={user}
															modalData={modalData}
															setModalData={setModalData}
															removeUserModalData={removeUserModalData}
															setRemoveUserModalData={setRemoveUserModalData}
															getUserList={getUserList}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					{usersList?.length < 1 && (
						<div className="flex flex-col gap-[24px] mt-[140px] justify-center text-center items-center">
							<span className="text-[#44475B]">
								No users added so far.
								<br />
								Click on the “<span className="font-medium">Add user</span>” button to build your team.
							</span>
							<Link
								className="px-6 py-3 block font-medium   rounded-[8px] border text-white border-[#E1E3F5] bg-[#298DFF]"
								href={'/users/new'}>
								Add user
							</Link>
						</div>
					)}
				</div>
			)}

			{/* <div className="flex justify-center">
				<Button
					onClick={() => {
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Password changed',
							children: (
								<>
									<div className="relative text-center pt-2">
										<InputWithCopy value="sfdhasnlkmsla256" />
										<div className="text-sm my-4">
											Please confirm if you have saved the password. You will not be able to see
											it again.
										</div>
										<Button
											className="m-auto px-6 pt-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px] w-[150px]"
											onClick={closeModal}>
											Confirm
										</Button>
									</div>
								</>
							),
							showFooter: false,
						});
					}}>
					Trigger Password Changes
				</Button>
				<Button
					onClick={() => {
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Password changed',
							children: (
								<ResetPassword
									handleSuccess={closeModal}
									handleCancel={closeModal}
									includeOldPassword={true}
								/>
							),
							showFooter: false,
						});
					}}>
					Trigger Password Reset with Old Password
				</Button>
				<Link href="/users/blank">
					<Button>Simulate No Users</Button>
				</Link>
				<Link href="/groups/blank">
					<Button>Simulate No Groups</Button>
				</Link>
			</div> */}
		</ThemeProvider>
	);
};

export default memo(UserList);

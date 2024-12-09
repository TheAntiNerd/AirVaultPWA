'use client';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCell, StyledTableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, CircleMinus, EllipsisVertical, PenIcon, Trash2Icon } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
// import { initialGroupValues } from '@/lib/utils-user';
import Paper from '@mui/material/Paper';
import AddUserGroup from '@/components/forms/AddUserGroup';
import { ThemeProvider } from '@/components/ui/theme';
import axiosPost from '@/functions/axios/axiosPost';
import EditUserGroup from '@/components/forms/EditUserGroup';
import toast from 'react-hot-toast';

const GroupDropDown: React.FC<any> = ({ modalData, setModalData, fetchGroupList, groupName }) => {
	const closeModal = () => {
		setModalData({ ...modalData, isOpen: false });
	};

	// function to delete the group
	const deleteGroup = async () => {
		setModalData({ ...modalData, btnLoading: true });
		const axiosRes = await axiosPost('/api/group/delete', {
			groupName,
		});
		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
			toast.success(axiosRes?.data?.msg || 'Successfully deleted group!');
			fetchGroupList();
			setModalData({ ...modalData, btnLoading: false });
			closeModal();
		} else {
			toast.error(axiosRes?.data?.msg || 'Failed to delete group!');
			setModalData({ ...modalData, btnLoading: false });
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-[50px] hover:none shadow-none outline-none border-none" asChild>
				<Button>
					<EllipsisVertical color="#737790" size={20} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[170px]">
				<DropdownMenuItem
					onClick={() =>
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Remove group?',
							okButtonText: 'Yes! Do it',
							children: <center className="mb-4">This can't be undone</center>,
							handleSuccess: () => {
								deleteGroup();
							},
						})
					}>
					<Trash2Icon className="mr-[10px] w-[15px]" color="#737790" />
					<span>Delete group</span>
				</DropdownMenuItem>
				{/* ✏️ I have no idea how to get this to work with transactions with sqlite3. So I am disabling the ability the edit the name of the group for now. */}
				{/* <DropdownMenuItem
					onClick={() => {
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Edit group',
							showFooter: false,
							children: (
								<EditUserGroup
									handleSuccess={closeModal}
									handleCancel={closeModal}
									fetchGroupList={fetchGroupList}
									oldGroupName={groupName}
									closeModal={closeModal}
								/>
							),
						});
					}}>
					<PenIcon className="mr-[10px] w-[15px]" color="#737790" />
					<span>Edit group</span>
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default function GroupList({ mode = 'default' }) {
	const [groupList, setGroupList] = useState([]);
	const [modalData, setModalData] = useState({
		header: '',
		isOpen: false,
		okButtonText: '',
		children: <></>,
		handleSuccess: () => {

		},
		showFooter: true,
		btnLoading: false,
	});
	console.log(modalData,"modalData")
	const [loading, setLoading] = useState(true);


	const closeModal = () => {
		setModalData({ ...modalData, isOpen: false });
	};

	// function to fetch the group list
	const fetchGroupList = async () => {
		const axiosRes = await axiosPost('/api/group/list');
		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
			setGroupList(axiosRes?.data?.list);
		}
	};

	useEffect(() => {
		fetchGroupList();
		setLoading(false)
	}, []);

	return (
		<ThemeProvider>
			<Modal
				btnLoading={modalData.btnLoading}
				header={modalData.header}
				isOpen={modalData.isOpen}
				handleCancel={closeModal}
				handleSuccess={modalData.handleSuccess}
				showFooter={modalData.showFooter}>
				{modalData.children}
			</Modal>
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<div className="loader mb-9" />
				</div>
			) : (
			<div className="flex min-h-screen items-start md:pt-13 pt-6 sm:pt-6 lg:pt-14 lg:mt-0 md:mt-7 w-full justify-center lg:px-3 md:px-16">
				<div className="w-full justify-center items-start flex flex-wrap">
					<div className="text-center lg:pl-0 md:pl-10 sm:pl-10 pl-10 flex items-center flex-wrap justify-between w-full text-[30px] mb-[36px]">
						<span>Groups</span>
						<Button
							className="text-[16px] px-4 rounded-[8px] bg-[#298DFF] text-white font-light h-12 flex items-center justify-center"
							onClick={() => {
								setModalData({
									...modalData,
									isOpen: true,
									header: 'Create group',
									children: (
										<AddUserGroup
											closeModal={closeModal}
											handleCancel={closeModal}
											fetchGroupList={fetchGroupList}
										/>
									),
									showFooter: false,
								});
							}}>
							Add group
						</Button>
					</div>

					<div className="w-full items-center justify-center flex flex-wrap rounded-[8px] overflow-hidden">
						<div className="w-full flex text-[16px] rounded-[8px] min-w-[0px]">
							<TableContainer className="border-[1.5px] rounded-[8px] p-0" component={Paper}>
								<Table
									className="bg-white rounded-[8px]"
									sx={{ minWidth: 350 }}
									aria-label="customized table">
									<TableHead className="h-[70px] border-0">
										<TableRow>
											<StyledTableCell className="font-semibold">Name</StyledTableCell>
											<StyledTableCell className="font-semibold">Members</StyledTableCell>
											<StyledTableCell className="font-semibold">Created On</StyledTableCell>
											<StyledTableCell className="w-[10px]" align="right"></StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{groupList?.length === 0 || mode === 'empty' ? (
											<TableRow>
												<TableCell colSpan={5}>
													<div className="h-[200px] w-full flex items-center justify-center text-center py-20">
														<div>
															No groups added so far.
															<br />
															Click on the "Add group” button to create a new one.
															<br />
															<div className="py-4 mt-4">
																<Button
																	className="text-[16px] px-6 py-2 rounded-[8px] bg-[#298DFF] text-white font-light h-12 items-center justify-center"
																	onClick={() => {
																		setModalData({
																			...modalData,
																			isOpen: true,
																			header: 'Create group',
																			children: (
																				<AddUserGroup
																					closeModal={closeModal}
																					handleCancel={closeModal}
																					fetchGroupList={fetchGroupList}
																				/>
																			),
																			showFooter: false,
																		});
																	}}>
																	Add group
																</Button>
															</div>
														</div>
													</div>
												</TableCell>
											</TableRow>
										) : (
											<>
												{groupList.map((group: any) => (
													<StyledTableRow key={group?.group_name}>
														<StyledTableCell className="flex min-w-[180px] items-center h-[70px] text-[#44475B]">
															{group?.group_name}
														</StyledTableCell>
														<StyledTableCell align="left">
															{group?.member_count}
														</StyledTableCell>
														<StyledTableCell align="left">
															{group?.created_at
																? new Date(group?.created_at)?.toLocaleDateString()
																: '-'}
														</StyledTableCell>
														<StyledTableCell className="w-[10px]" align="right">
															<div className="flex">
																<Link href={`/groups/${group?.group_name}`}>
																	<ChevronRightIcon className="my-1" />
																</Link>
																<GroupDropDown
																	modalData={modalData}
																	setModalData={setModalData}
																	fetchGroupList={fetchGroupList}
																	groupName={group?.group_name}
																/>
															</div>
														</StyledTableCell>
													</StyledTableRow>
												))}
											</>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>
				</div>
			</div>
			)}
		</ThemeProvider>
	);
}

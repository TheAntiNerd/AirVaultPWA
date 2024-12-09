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
import { ArrowLeft, ChevronRightIcon, CircleMinus, EllipsisVertical, PenIcon, Trash2Icon } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import Paper from '@mui/material/Paper';
import AddMemberToGroup from '@/components/forms/AddMemberToGroup';
import ChangeUserRole from '@/components/forms/ChangeUserRole';
import { ThemeProvider } from '@/components/ui/theme';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';

const GroupMemberDropdown: React.FC<any> = ({ modalData, setModalData, slug, username, getMembersList }) => {
	const closeModal = () => {
		setModalData({ ...modalData, isOpen: false });
	};

	// remove the user from the group
	const removeUserFromGroup = async () => {
		const axiosRes = await axiosPost('/api/group/members/remove', { groupName: slug, username: username });
		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success('User removed from group successfully');
		} else {
			toast.error('Failed to remove user from group');
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
							header: 'Remove user?',
							okButtonText: 'Yes! Do it',
							children: <center className="mb-4">This can't be undone</center>,
							handleSuccess: () => {
								(async () => {
									await removeUserFromGroup();
									await getMembersList();
									closeModal();
								})();
							},
						})
					}>
					<Trash2Icon className="mr-[10px] w-[15px]" color="#737790" />
					<span>Remove</span>
				</DropdownMenuItem>
				{/* <DropdownMenuItem
					onClick={() => {
						setModalData({
							...modalData,
							isOpen: true,
							header: 'Select role',
							showFooter: false,
							children: <ChangeUserRole handleSuccess={closeModal} handleCancel={closeModal} />,
						});
					}}>
					<PenIcon className="mr-[10px] w-[15px]" color="#737790" />
					<span>Change role</span>
				</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default function GroupMemberList({ slug }: { slug: string }) {
	const [memberList, setMemberList] = useState<IUser[]>([]);
	const [modalData, setModalData] = useState({
		header: '',
		isOpen: false,
		okButtonText: '',
		children: <></>,
		handleSuccess: () => {},
		showFooter: true,
	});

	const closeModal = () => {
		setModalData({ ...modalData, isOpen: false });
	};

	// get the users list
	async function getMembersList() {
		const axiosRes = await axiosPost('/api/group/members/list', { groupName: slug });
		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			setMemberList(axiosRes?.data?.list);
		}
	}

	useEffect(() => {
		getMembersList();
	}, []);

	return (
		<ThemeProvider>
			<Modal
				header={modalData.header}
				isOpen={modalData.isOpen}
				handleCancel={closeModal}
				handleSuccess={modalData.handleSuccess}
				showFooter={modalData.showFooter}
				okButtonText={modalData?.okButtonText}>
				{modalData.children}
			</Modal>

			<div className="flex min-h-screen items-start md:pt-13 pt-6 sm:pt-6 lg:pt-14 lg:mt-0 md:mt-7 w-full justify-center lg:px-3 md:px-16">
				<div className="w-full justify-center items-start flex flex-wrap">
					<div className="text-center lg:pl-0 md:pl-10 sm:pl-10 pl-10 flex items-center flex-wrap justify-between w-full text-[30px] mb-[36px]">
						<div className="flex items-center">
							<Link href="/groups" className="mr-4">
								<ArrowLeft className="h-6 w-6" />
							</Link>
							<span>Teams</span>
						</div>
						<Button
							className="text-[16px] px-4 rounded-[8px] bg-[#298DFF] text-white font-light h-12 flex items-center justify-center"
							onClick={() => {
								setModalData({
									...modalData,
									isOpen: true,
									header: 'Add Member',
									children: (
										<AddMemberToGroup
											handleSuccess={closeModal}
											handleCancel={closeModal}
											alreadyMembers={memberList}
											groupName={slug}
											getMembersList={getMembersList}
										/>
									),
									showFooter: false,
								});
							}}>
							Add Member
						</Button>
					</div>

					<div className="w-full items-center justify-center flex flex-wrap rounded-[8px] overflow-hidden">
						<div className="w-full flex text-[16px] rounded-[8px] min-w-[0px] ">
							<TableContainer className=" border-[1.5px] rounded-[8px]" component={Paper}>
								<Table
									className="bg-white rounded-[8px]"
									sx={{ minWidth: 350 }}
									aria-label="customized table">
									<TableHead className="h-[70px] border-0">
										<TableRow>
											<StyledTableCell className="font-semibold">Member</StyledTableCell>
											<StyledTableCell className="font-semibold">Webrole</StyledTableCell>
											<StyledTableCell className="w-[10px]" align="right"></StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{memberList.map((user: IUser) => (
											<StyledTableRow key={user?.username}>
												<StyledTableCell className="flex min-w-[180px] items-center h-[70px] text-[#44475B]">
													{user?.username}
												</StyledTableCell>
												<StyledTableCell align="left">{user?.role}</StyledTableCell>
												<StyledTableCell className="w-[10px]" align="right">
													<div className="flex">
														<GroupMemberDropdown
															modalData={modalData}
															setModalData={setModalData}
															slug={slug}
															username={user?.username}
															getMembersList={getMembersList}
														/>
													</div>
												</StyledTableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

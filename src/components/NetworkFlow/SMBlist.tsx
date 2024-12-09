import { useEffect, useState } from 'react';
import { EllipsisVertical, Pencil, Power, Trash2 } from 'lucide-react';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SwitchComponent from './SwitchComponent';
import CustomDialogNetwork from './CustomDialogNetwork';
import axios from 'axios';
import { fetchData } from 'next-auth/client/_utils';

interface SharedItem {
	active: number;
	id: number;
	share_name: string;
	share_path: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#F9FAFB',
		color: '#44475B',
		fontSize: 16,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
		innerHeight: 70,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: '#ffffff',
	},
	'&:last-child td, &:last-child th': {
		border: 0,
		font: 300,
	},
}));

function createData(name: string, Webrole: string, Groups: string) {
	return { name, Webrole, Groups };
}

const rows = [
	createData('Rituraj', 'Admin', 'Video Editing'),
	createData('Rituraj', 'Moderator', 'Video Editing'),
	createData('Rituraj', 'Default', 'Video Editing'),
	createData('Rituraj', 'Default', 'Video Editing'),
	createData('Rituraj', 'Default', 'Video Editing'),
];

const Dropdown: React.FC<{
	status: boolean;
	stopSMB: () => Promise<void>;
	startSMB: () => Promise<void>;
	onOpenDialog: (type: 'turnon' | 'turnoff') => void; // Add this prop
}> = ({ status, stopSMB, startSMB, onOpenDialog }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-10 shadow-none outline-none" asChild>
				<button className="flex items-center h-10 hover:bg-[#F9FAFB] rounded-[4px] justify-center">
					<EllipsisVertical color="#737790" size={20} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 rounded-[8px] -translate-x-4">
				{status ? (
					<DropdownMenuItem onClick={() => onOpenDialog('turnoff')}>
						<Power className="mr-[10px] w-[15px]" color="#737790" />
						<span>Turn off service</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem onClick={() => onOpenDialog('turnon')}>
						<Power className="mr-[10px] w-[15px]" color="#737790" />
						<span>Turn on service</span>
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};


const theme = createTheme({
	typography: {
		fontFamily: '',
	},
	components: {
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontFamily: ', sans-serif',
				},
			},
		},
	},
});

const SMBList = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [type, setType] = useState<'directory' | 'delete' | 'turnoff' | 'turnon' | 'rename'>('directory');
	const [status, setStatus] = useState(false);
	const handleCloseDialog = () => setIsDialogOpen(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<SharedItem[]>([]);

	const listTableData = async () => {
		try {
			setLoading(true);
			const response = await axios.post('/api/smb/list');
			console.log(response);
			setData(response.data.list);
		} catch (err) {
			console.error('Error fetching status:', err);
			setLoading(false);
		}
	};

	useEffect(() => {
		let isMounted = true;
		const fetchStatus = async () => {
			try {
				setLoading(true);
				const response = await axios.post('/api/smb/start-smb', {});

				if (isMounted) {
					const isSuccess = response.data.message === 'Successfully started the SMB service!';
					setStatus(isSuccess);
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					console.error('Error fetching status:', err);
					setLoading(false);
				}
			}
		};
		fetchStatus();

		listTableData();

		return () => {
			isMounted = false; // Clean up on unmount
		};
	}, []);


	const stopSMB = async () => {
		try {
			setLoading(true);
			const response = await axios.post('/api/smb/stop-smb', {});
			const isSuccess = response.data.message === 'Successfully stopped the SMB service!';
			setStatus(!isSuccess);
			setLoading(false);
		} catch (err) {
			console.error('Error fetching status:', err);
			setLoading(false);
		}
	};

	const startSMB = async () => {
		try {
			setLoading(true);
			const response = await axios.post('/api/smb/start-smb', {});
			const isSuccess = response.data.message === 'Successfully started the SMB service!';
			setStatus(isSuccess);
			setLoading(false);
		} catch (err) {
			console.error('Error fetching status:', err);
			setLoading(false);
		}
	};

	const handleOpenDialog = (dialogType: 'directory' | 'delete' | 'turnoff' | 'turnon' | 'rename') => {
		setType(dialogType);
		setIsDialogOpen(true);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="flex items-start md:pt-13 pt-6 sm:pt-6 lg:pt-0 lg:mt-0 md:mt-7 w-full justify-center lg:px-3 md:px-16">
				<div className="w-full justify-center items-start flex flex-wrap">
					<div className="text-center flex items-center flex-wrap justify-between w-full text-[30px] mb-6">
						<div className="flex items-center justify-between space-x-4">
							<div>SMB</div>
							<div
								className={`${status ? 'bg-[#E0EEE8] text-[#3A996D]' : 'bg-[#E7ECF3] text-[#737790]'
									} text-[14px] py-1 px-3 rounded-[40px]`}>
								{status ? 'Active' : 'Disabled'}
							</div>
						</div>
						<div className="flex space-x-3">
							<button
								className="text-[16px] px-4 rounded-[8px] text-[#298DFF] h-12 flex items-center justify-center border"
								onClick={() => (handleOpenDialog("directory"))}>
								+ New SMB
							</button>
							<div className="flex items-center">
								<Dropdown
									status={status}
									stopSMB={stopSMB}
									startSMB={startSMB}
									onOpenDialog={handleOpenDialog}
								/>
							</div>
						</div>
					</div>

					<div className="w-full items-center justify-center flex flex-wrap rounded-[8px] overflow-hidden">
						<div className="w-full flex text-[16px] rounded-[8px] min-w-[0px] overflow-x-scroll">
							<TableContainer
								className="overflow-x-scroll border-[1.5px] rounded-[8px]"
								component={Paper}>
								<Table
									className="bg-white rounded-[8px]"
									sx={{ minWidth: 350 }}
									aria-label="customized table">
									<TableHead className="h-[70px]">
										<TableRow>
											<StyledTableCell className="font-semibold ">Name</StyledTableCell>
											<StyledTableCell className="font-semibold" align="left">
												Path
											</StyledTableCell>
											<StyledTableCell className="font-semibold" align="right">
												Status
											</StyledTableCell>
											<StyledTableCell className="w-4" align="right"></StyledTableCell>
											<StyledTableCell className="w-4" align="right"></StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data?.map((items, idx) => (
											<StyledTableRow key={items.id}>
												<StyledTableCell className="h-[70px]">
													{items.share_name}
												</StyledTableCell>
												<StyledTableCell className="h-[70px]" align="left">
													<p className="text-[#44475B]">
														{items.share_path == '' ? './' : items.share_path}
													</p>
												</StyledTableCell>
												<StyledTableCell className="w-40 h-[70px]" align="right">
													<div className="flex justify-end">
														<SwitchComponent name={items.share_name} />
													</div>
												</StyledTableCell>
												<StyledTableCell className="w-36 h-[70px] " align="right">
													<div className="flex justify-end cursor-pointer items-center"
														onClick={() => (handleOpenDialog('rename'))}>
														<Pencil color="#8C8FA3" />
													</div>
												</StyledTableCell>
												<StyledTableCell
													className="w-16 cursor-pointer h-[70px]"
													align="right"
													onClick={() => (handleOpenDialog('delete'))}>
													<Trash2 color="#8C8FA3" />
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

			{/* Dialog Component */}
			<CustomDialogNetwork
				open={isDialogOpen}
				onClose={handleCloseDialog}
				type={type}
				refetchData={listTableData} />
		</ThemeProvider>
	);
};

export default SMBList;

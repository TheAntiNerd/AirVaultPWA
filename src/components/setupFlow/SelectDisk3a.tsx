'use client';

import {
	CellContext,
	ColumnDef,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import axiosPost from '@/functions/axios/axiosPost';
import { DiskDetails } from '@/app/(app)/setup/SetupFlow';

const STORAGE_KEY = 'selectedRows';

export const columns: ColumnDef<DiskDetails>[] = [
	{
		id: 'select-status',
		header: ({ table }) => (
			<div className="flex items-center">
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
				<span className="ml-[25px] font-medium">DISKS</span>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={value => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
				<span className="ml-[25px] capitalize">
					{row.original.vendor} {row.original.serial}
				</span>
				<Badge className="bg-[#E7ECF3] font-medium rounded-[40px] shadow-none ml-[20px] text-black border-[1.5px] hover:bg-[#E7ECF3]">
					SSD
				</Badge>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'size',
		header: 'SIZE',
		cell: ({ row }: CellContext<DiskDetails, unknown>) => (
			<div className="mr-[40px]">{(row.original.size / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB</div>
		),
		enableSorting: false,
	},
];

interface PageProps {
	setSelectedDiskList: React.Dispatch<React.SetStateAction<any[]>>;
	onNext: (diskCount: number) => void;
	onBack: () => void;
}
// Data table component
const DataTableDemo: React.FC<PageProps> = ({ setSelectedDiskList, onNext, onBack }) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>({});
	const [loading, setLoading] = useState(true);
	const [diskList, setDiskList] = useState<any[]>([]);

	useEffect(() => {
		const setDefaultSelection = () => {
			const initialSelection: { [key: number]: boolean } = {};
			diskList.forEach((_, index) => {
				initialSelection[index] = true;
			});
			setRowSelection(initialSelection);
		};

		if (diskList.length > 0) {
			const savedSelection = localStorage.getItem(STORAGE_KEY);
			if (savedSelection) {
				try {
					const parsedSelection = JSON.parse(savedSelection);
					setRowSelection(parsedSelection);
				} catch (error) {
					console.error('Error parsing saved selection from localStorage:', error);
					setDefaultSelection();
				}
			} else {
				setDefaultSelection();
			}
		}
	}, [diskList]);

	// HAVE TO DO THIS SINCE THIS IS A VERY POOR IMPLEMENTATION
	useEffect(() => {
		const allowedKeys = Object.keys(rowSelection)?.map(index => parseInt(index));
		setSelectedDiskList(allowedKeys.map(index => diskList[index]));
	}, [rowSelection]);

	const table = useReactTable<DiskDetails>({
		data: diskList,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
		},
	});

	const selectedDisk = table.getSelectedRowModel().rows?.length;

	const handleContinue = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(rowSelection));
		onNext(selectedDisk);
	};

	// send a request to the api requesting for connected disks
	useEffect(() => {
		(async () => {
			try {
				const axiosRes = await axiosPost('/api/disks/list');

				if (axiosRes && axiosRes.status === 200 && axiosRes.data.success === true) {
					// save the list
					setDiskList(axiosRes?.data?.list);

					// set loading to false
					setLoading(false);
				}
			} catch (error) {}
		})();
	}, []);

	return (
		<>
			{loading ? (
				<div className="w-full h-screen flex items-center justify-center">
					<div className="loader mb-9" />
				</div>
			) : (
				<div className="flex items-start md:items-start justify-center min-h-screen">
					<div className="md:w-[600px] max-w-[380px] w-full md:max-w-[100%] justify-center md:items-center items-start flex flex-wrap md:mb-[200px]">
						<div className="text-[30px] mt-6 text-center">Select disks</div>
						<div className="rounded-[8px] w-[600px] overflow-x-scroll flex flex-wrap justify-center items-start mt-[12px]">
							<Table className="flex flex-wrap w-[600px] items-start border-[1.5px] rounded-[8px] overflow-hidden">
								<TableHeader className="w-full flex flex-wrap justify-between items-start rounded-t-[8px]">
									{table.getHeaderGroups().map(headerGroup => (
										<TableRow
											className="w-full overflow-hidden flex flex-wrap bg-[#F9FAFB] justify-between items-center text-left"
											key={headerGroup.id}>
											{headerGroup.headers.map(header => {
												return (
													<TableHead
														className="h-[70px] mr-16 text-left flex flex-wrap items-center justify-start ml-[10px] py-0"
														key={header.id}>
														{header.isPlaceholder
															? null
															: flexRender(
																	header.column.columnDef.header,
																	header.getContext()
															  )}
													</TableHead>
												);
											})}
										</TableRow>
									))}
								</TableHeader>
								<TableBody className="w-full flex flex-wrap text-left justify-between items-center">
									{table.getRowModel().rows?.length ? (
										table.getRowModel().rows.map(row => (
											<TableRow
												className="h-[70px] w-full text-left flex flex-wrap justify-between items-center"
												key={row.id}
												data-state={row.getIsSelected() && 'selected'}>
												{row.getVisibleCells().map(cell => (
													<TableCell
														className="flex ml-[10px] text-left flex-wrap justify-between items-center"
														key={cell.id}>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={columns?.length} className="h-[55px] text-left">
												No results.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
						<div className="mt-3 text-[14px] w-full ml-5">
							{table.getSelectedRowModel().rows?.length} disks selected
						</div>

						<div className="flex w-full md:relative bottom-0 absolute flex-wrap justify-center mt-10 font-[300] text-[16px] items-center">
							<button
								className="md:w-[122px] md:relative absolute md:bottom-0 bottom-[15px] w-[96%] h-12 md:mr-5 rounded-[8px] flex flex-wrap items-center justify-center cursor-pointer"
								onClick={onBack}>
								<ArrowLeft className="mr-[10px]" />
								Back
							</button>

							<button
								className={`md:w-[122px] w-[96%] md:bottom-0 bottom-[70px] md:relative absolute h-12 bg-[#298DFF] cursor-pointer rounded-[8px] text-[#FFFFFF] ${
									selectedDisk === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#298DFF]'
								}`}
								onClick={handleContinue}
								disabled={selectedDisk === 0}>
								Continue
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

// Default export for the page
export default DataTableDemo;

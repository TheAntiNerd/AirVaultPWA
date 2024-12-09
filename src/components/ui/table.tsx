import * as React from 'react';

import { cn } from '@/lib/utils';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import MuiTableRow from '@mui/material/TableRow';
import MuiTableCell from '@mui/material/TableCell';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
	({ className, ...props }, ref) => (
		<div className="relative w-full overflow-auto">
			<table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
		</div>
	)
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
	)
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tfoot
			ref={ref}
			className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
			{...props}
		/>
	)
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr ref={ref} className={cn('border-b transition-colors hover:bg-muted/50', className)} {...props} />
	)
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				'h-10 px-2 text-left align-middle text-[16px] text-black font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className
			)}
			{...props}
		/>
	)
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={cn(
				'p-2 align-middle text-[16px] text-[#72758e] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
				className
			)}
			{...props}
		/>
	)
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
	({ className, ...props }, ref) => (
		<caption ref={ref} className={cn('mt-4 text-[16px] text-muted-foreground', className)} {...props} />
	)
);
TableCaption.displayName = 'TableCaption';

// Increase specificity for TableCell
const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#F9FAFB',
		color: '#44475B',
		fontSize: 16,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 16,
		border: '0px',
	},
}));

const StyledTableRow = styled(MuiTableRow)(({ theme }) => ({
	borderBottom: '1px solid #E1E3F5',
	'&:nth-of-type(odd)': {
		backgroundColor: '#ffffff',
	},
	'&:last-child td, &:last-child th': {
		border: 0,
	}, // Ensures Poppins font is applied to table rows
}));

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
	StyledTableCell,
	StyledTableRow,
};

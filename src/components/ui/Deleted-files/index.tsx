import React, { useState } from "react";
import { AudioIcon, CheckboxIcon, CopyIcon, CustomIcon, DeleteIcon, DocumentIcon, DownloadIcon, ExcelIcon, FormIcon, GridIcon, ImageIcon, ListIcon, OtherTypeIcon, PdfIcon, PptIcon, RestoreIcon, StarredIcon, UpIcon, VideoIcon, ZipIcon } from "../../../assets";
import SideMenu from "../../SideMenu";
import Navbar from "../navbar";

interface FileItem {
    name: string;
    size: string;
    type: string;
    modified: string;
    shared: string;
}
interface FileGroups {
    today: FileItem[];
    lastWeek: FileItem[];
    lastMonth: FileItem[];
    threeMonths: FileItem[];
    sixMonths: FileItem[];
    lastYear: FileItem[];
    beforeLastYear: FileItem[];
}
interface SectionProps {
    files: FileItem[];
    label: string;
    startIndex: number;
}
interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    index: number;
}
const files = [{ name: 'File 1', size: '2MB', type: 'PDF', modified: '2024-12-1', shared: 'legionwashere@legion.com' },
{ name: 'File 2', size: '5MB', type: 'Image', modified: '2024-11-16', shared: 'legionwashere@legion.com' },
{ name: 'File 3', size: '1MB', type: 'Audio', modified: '2024-1-15', shared: 'legionwashere@legion.com' },
{ name: 'File 4', size: '1MB', type: 'Video', modified: '2024-12-15', shared: 'legionwashere@legion.com' },
{ name: 'File 5', size: '1MB', type: 'Excel', modified: '2024-12-15', shared: 'legionwashere@legion.com' },]
const DeletedFiles = () => {
    const [selectedRow, setSelectedRows] = useState<number[]>([]);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [gridView, setGridView] = useState<boolean>(false);

    const fileTypeImages: Record<string, JSX.Element> = {
        Document: <DocumentIcon />,
        Folder: <CustomIcon />,
        Spreadsheet: <ExcelIcon />,
        Presentation: <PptIcon />,
        Form: <FormIcon />,
        PDF: <PdfIcon />,
        Video: <VideoIcon />,
        Image: <ImageIcon />,
        Audio: <AudioIcon />,
        Archive: <ZipIcon />,
        Other: <OtherTypeIcon />
    }

    // Function to group files by time period
    const groupFilesByDate = (files: FileItem[]): FileGroups => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Reset time to start of day

        // Calculate date thresholds
        const today = new Date(now);
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const threeMonths = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        const sixMonths = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        const lastYear = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

        // Initialize groups
        const groups: FileGroups = {
            today: [],
            lastWeek: [],
            lastMonth: [],
            threeMonths: [],
            sixMonths: [],
            lastYear: [],
            beforeLastYear: []
        };

        files.forEach(file => {
            const fileDate = new Date(file.modified);
            fileDate.setHours(0, 0, 0, 0); // Reset time to start of day

            if (fileDate >= today) {
                groups.today.push(file);
            } else if (fileDate >= lastWeek) {
                groups.lastWeek.push(file);
            } else if (fileDate >= lastMonth) {
                groups.lastMonth.push(file);
            } else if (fileDate >= threeMonths) {
                groups.threeMonths.push(file);
            } else if (fileDate >= sixMonths) {
                groups.sixMonths.push(file);
            } else if (fileDate >= lastYear) {
                groups.lastYear.push(file);
            } else {
                groups.beforeLastYear.push(file);
            }
        });

        return groups;
    };

    const groupedFiles = groupFilesByDate(files);

    /* Index for checkbox */
    const getStartIndex = (section: string): number => {
        switch (section) {
            case 'today':
                return 0;
            case 'lastWeek':
                return groupedFiles.today.length;
            case 'lastMonth':
                return groupedFiles.today.length + groupedFiles.lastWeek.length;
            case 'threeMonths':
                return groupedFiles.today.length + groupedFiles.lastWeek.length +
                    groupedFiles.lastMonth.length;
            case 'sixMonths':
                return groupedFiles.today.length + groupedFiles.lastWeek.length +
                    groupedFiles.lastMonth.length + groupedFiles.threeMonths.length;
            case 'lastYear':
                return groupedFiles.today.length + groupedFiles.lastWeek.length +
                    groupedFiles.lastMonth.length + groupedFiles.threeMonths.length +
                    groupedFiles.sixMonths.length;
            case 'beforeLastYear':
                return groupedFiles.today.length + groupedFiles.lastWeek.length +
                    groupedFiles.lastMonth.length + groupedFiles.threeMonths.length +
                    groupedFiles.sixMonths.length + groupedFiles.lastYear.length;
            default:
                return 0;
        }
    }

    const handleRowClick = (rowIndex: number) => {
        if (!isCheckboxVisible) {
            setIsCheckboxVisible(true);
            setSelectedRows([rowIndex]);
        } else {
            if (selectedRow.includes(rowIndex)) {
                const updatedRows = selectedRow.filter((row) => row !== rowIndex);
                setSelectedRows(updatedRows);

                if (updatedRows.length === 0) {
                    setIsCheckboxVisible(false);
                }
            } else {
                setSelectedRows((prev) => [...prev, rowIndex]);
            }
        }
    };

    const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, index }) => {
        return (
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    data-checkbox-index={index}
                    className="peer absolute h-0 w-0 opacity-0"
                />
                <div
                    className={`
                h-4 
                w-4 
                -ml-6 
                rounded
                border-2 
                border-border
                bg-white 
                transition-colors
                flex 
                items-center 
                justify-between
                cursor-pointer
                peer-checked:bg-buttonPrimary
                peer-checked:border-buttonPrimary
              `}
                >
                    {checked && (
                        <svg
                            className="h-4 w-4 text-white mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </div>
        );
    };
    // Component to render table section with label
    const TableSection: React.FC<SectionProps> = ({ files, label, startIndex }) => (
        files.length > 0 && (
            <div className="mb-8">
                <h2 className=" text-primary-heading font-medium text-sm mb-4">{label}</h2>
                <table className="w-full border-collapse cursor-default">
                    <tbody className="text-primary-para">
                        {files.map((file, index) => {
                            const globalIndex = startIndex + index
                            return (
                                <tr
                                    key={globalIndex}
                                    onClick={() => handleRowClick(globalIndex)}
                                    className={`border-b border-border/40 ${selectedRow.includes(globalIndex) ? 'bg-selected' : 'group hover:bg-gray-100'}`}
                                >
                                    <td className="py-2 w-1/5">
                                        <div className="flex flex-col items-start">
                                            <span className="flex items-center justify-between">
                                                <span>
                                                    {isCheckboxVisible && (
                                                        <CustomCheckbox
                                                            checked={selectedRow.includes(globalIndex)}
                                                            onChange={() => handleRowClick(globalIndex)}
                                                            index={globalIndex}
                                                        />
                                                    )}
                                                </span>
                                                <span className="pl-3 flex flex-row items-center  gap-x-2">
                                                    <span>
                                                        {fileTypeImages[file.type as keyof typeof fileTypeImages] || <OtherTypeIcon />}
                                                    </span>

                                                    {file.name}</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2 w-1/6">
                                        <div className="flex flex-col items-center">{file.size}</div>
                                    </td>
                                    <td className="py-2 w-1/6">
                                        <div className="flex flex-col items-start">{file.type}</div>
                                    </td>
                                    <td className="py-2 w-1/6">
                                        <div className="flex flex-col items-start">
                                            {file.modified}
                                        </div>

                                    </td>
                                    <td className="py-2 w-1/4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex flex-row items-center justify-center gap-4 opacity-0 group-hover:opacity-0 transition-opacity">
                                                <button className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button>
                                                <CopyIcon />
                                                <DownloadIcon />
                                                < StarredIcon />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 w-1/2">
                                        <div className="flex flex-col items-start cursor-pointer">
                                            <span className="rotate-90">•••</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    );

    // Component to render grid section with label
    const GridSection: React.FC<SectionProps> = ({ files, label, startIndex }) => (
        files.length > 0 && (
            <div className="mb-8">
                <h2 className=" text-primary-para text-sm font-medium mb-4">{label}</h2>
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 xl:grid-cols-4">
                    {files.map((file, index) => {
                        const globalIndex = startIndex + index;
                        return (
                            <div
                                key={globalIndex}
                                className={`h-[212px] w-[250px] rounded-lg bg-hover ${selectedRow.includes(globalIndex) ? 'bg-[#D6ECFF]' : 'group'}`}
                                onClick={() => handleRowClick(globalIndex)}
                            >
                                <div className="bg-white relative rounded-md m-2.5 h-[140px] flex">
                                    <img src="logo.svg" alt={file.name} className="object-contain h-full w-full" />
                                    <div className="absolute top-0 left-5">
                                        <span className="absolute top-1 left-2">
                                            {isCheckboxVisible && (
                                                <CustomCheckbox
                                                    checked={selectedRow.includes(globalIndex)}
                                                    onChange={() => handleRowClick(globalIndex)}
                                                    index={globalIndex}
                                                />
                                            )}
                                        </span>
                                    </div>

                                </div>
                                <div className='px-4 pt-px'>

                                    {/* File Info */}
                                    <div className='flex flex-row items-center space-x-1'>
                                        {fileTypeImages[file.type] || <OtherTypeIcon />}
                                        <h3 className="text-primary-para">
                                            {file.name}</h3>
                                    </div>

                                    <div className='text-xs flex flex-row pt-px space-x-2 pl-5'>
                                        <p className="text-primary-searchFilter">{file.type}</p>
                                        <p className="text-primary-searchFilter">● {file.size}</p>
                                    </div>
                                    <div className='flex items-center justify-end -mt-6 cursor-pointer'>
                                        <StarredIcon />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    );

    return (
        <SideMenu>
            <Navbar files={files} gridView={gridView} />
            <div className="px-9 pt-6 text-sm">
                {/* Header section remains the same */}
                <div className="pb-4 flex justify-between items-center">
                    <h1 className="text-[22px] font-medium text-primary-heading">Deleted files</h1>
                    <div className="flex gap-5">

                    </div>
                </div>

                {files.length === 0 ? (
                    <div className="flex items-center justify-center flex-col space-y-3 pt-64">
                        <p className="text-[22px] font-medium text-primary-heading">Nothing in here</p>
                        <p className="text-primary-para">Items deleted will be deleted forever after 30 days.</p>
                    </div>
                ) : (
                    <>
                        {/* Action buttons and view toggle */}
                        <div className="text-center text-sm flex justify-between items-center text-primary-para">
                            <div className={`flex gap-3 items-center justify-between  ${selectedRow.length > 0 ? 'opacity-100' : 'opacity-0'} `}>

                                <button className="bg-hover rounded-lg px-4 py-2">
                                    <span className="flex items-center justify-between">
                                        <RestoreIcon />
                                        <span className="pl-1.5">
                                            Restore
                                        </span>

                                    </span>
                                </button>
                                <button className="bg-hover rounded-lg px-4 py-2">
                                    <span className="flex items-center justify-between">
                                        <DeleteIcon />
                                        <span className="pl-1.5">
                                            Delete forever
                                        </span>

                                    </span>
                                </button>



                            </div>
                            <div className="flex gap-3 items-center justify-center">

                                {selectedRow.length > 0 && <h2 className="font-medium text-center text-primary-para">{selectedRow.length} selected</h2>}
                                <div onClick={() => setGridView(false)} className="flex items-center justify-center flex-col">
                                    <button className="mb-1">
                                        <ListIcon /> {/* Grid view */}
                                    </button>
                                    <div className={`pt-px ${!gridView ? 'border-t-2 w-6 border-borderView ' : ""}`} />
                                </div>
                                <div onClick={() => setGridView(true)} className="flex items-center justify-center flex-col" >
                                    <button className="mb-1">
                                        <GridIcon /> {/* Grid view */}
                                    </button>
                                    <div className={`pt-px ${gridView ? 'border-t-2 w-6 border-borderView ' : ""}`} />
                                </div>

                            </div>
                        </div>

                        <div className="mt-6">
                            {!gridView ? (
                                // Table headers
                                <div className="">
                                    <table className="w-full border-collapse">
                                        <thead className="text-primary-heading cursor-default ">
                                            <tr>
                                                <th className="py-4 text-left w-1/5">
                                                    <div className="flex flex-col items-start">
                                                        <span className="flex flex-row justify-between items-center">
                                                            <span>
                                                                {selectedRow.length > 0 && (
                                                                    <button onClick={() => {
                                                                        setIsCheckboxVisible(false);
                                                                        setSelectedRows([]);
                                                                    }}
                                                                        className="-ml-6 flex items-center justify-center"
                                                                    ><CheckboxIcon />
                                                                    </button>
                                                                )}
                                                            </span>

                                                            <span className="pl-3 font-medium flex flex-row items-center space-x-1">

                                                                Name
                                                                {selectedRow.length > 0 && <UpIcon />}

                                                            </span>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="py-4 text-left w-1/6">
                                                    <div className="flex flex-col items-center font-medium">Size</div>
                                                </th>
                                                <th className="py-4 text-left w-1/6">
                                                    <div className="flex flex-col items-start font-medium">Type</div>
                                                </th>
                                                <th className="py-4 text-left w-1/6">
                                                    <div className="flex flex-col items-start font-medium">Modified on</div>
                                                </th>
                                                <th className="py-4 text-left w-1/4">
                                                    <div className="flex flex-col items-start"></div>
                                                </th>
                                                <th className="py-4 text-left w-1/12"></th>
                                            </tr>
                                        </thead>
                                    </table>
                                    {/* Table sections by date */}

                                    <TableSection
                                        files={groupedFiles.today}
                                        label="Today"
                                        startIndex={getStartIndex('today')}
                                    />
                                    <TableSection
                                        files={groupedFiles.lastWeek}
                                        label="Last week"
                                        startIndex={getStartIndex('lastWeek')}
                                    />
                                    <TableSection
                                        files={groupedFiles.lastMonth}
                                        label="Last month"
                                        startIndex={getStartIndex('lastMonth')}
                                    />
                                    <TableSection
                                        files={groupedFiles.threeMonths}
                                        label="3 months"
                                        startIndex={getStartIndex('threeMonths')}
                                    />
                                    <TableSection
                                        files={groupedFiles.sixMonths}
                                        label="6 months"
                                        startIndex={getStartIndex('sixMonths')}
                                    />
                                    <TableSection
                                        files={groupedFiles.lastYear}
                                        label="Last year"
                                        startIndex={getStartIndex('lastYear')}
                                    />
                                    <TableSection
                                        files={groupedFiles.beforeLastYear}
                                        label="Before last year"
                                        startIndex={getStartIndex('beforeLastYear')}
                                    />


                                </div>
                            ) : (
                                // Grid view sections
                                <div className="pb-10">
                                    <div className="px-4 m-2">
                                        <button
                                            onClick={() => {
                                                setIsCheckboxVisible(false);
                                                setSelectedRows([]);
                                            }}
                                            className="-ml-6 flex items-center justify-center"
                                            style={{
                                                opacity: selectedRow.length > 0 ? 1 : 0,
                                                pointerEvents: selectedRow.length > 0 ? 'auto' : 'none',
                                            }}
                                        >
                                            <span className="flex flex-row items-center space-x-1">
                                                <CheckboxIcon />
                                                <span className="flex flex-row items-center space-x-1 text-primary-heading font-medium">
                                                    Name <UpIcon />
                                                </span>
                                            </span>

                                        </button>
                                    </div>

                                    {/* Grid sections by date */}
                                    <GridSection
                                        files={groupedFiles.today}
                                        label="Today"
                                        startIndex={getStartIndex('today')}
                                    />
                                    <GridSection
                                        files={groupedFiles.lastWeek}
                                        label="Last week"
                                        startIndex={getStartIndex('lastWeek')}
                                    />
                                    <GridSection
                                        files={groupedFiles.lastMonth}
                                        label="Last month"
                                        startIndex={getStartIndex('lastMonth')}
                                    />
                                    <GridSection
                                        files={groupedFiles.threeMonths}
                                        label="3 months"
                                        startIndex={getStartIndex('threeMonths')}
                                    />
                                    <GridSection
                                        files={groupedFiles.sixMonths}
                                        label="6 months"
                                        startIndex={getStartIndex('sixMonths')}
                                    />
                                    <GridSection
                                        files={groupedFiles.lastYear}
                                        label="Last year"
                                        startIndex={getStartIndex('lastYear')}
                                    />
                                    <GridSection
                                        files={groupedFiles.beforeLastYear}
                                        label="Before last year"
                                        startIndex={getStartIndex('beforeLastYear')}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </SideMenu>
    );
};

export default DeletedFiles;
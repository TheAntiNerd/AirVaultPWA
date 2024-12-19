import { useRef, useState } from "react";
import { GridIcon } from "../../../assets"
import SideMenu from "../../SideMenu"
import Navbar from "../navbar";

interface FileItem {
    name: string;
    size: string;
    type: string;
    modified: string;
}

interface SectionProps {
    files: FileItem[];
    label: string;
    startIndex: number;
}

const MyFiles = () => {
    const [files, setFiles] = useState<FileItem[]>([
        { name: 'File 1', size: '2MB', type: 'PDF', modified: '2024-12-1' },
        { name: 'File 2', size: '5MB', type: 'Image', modified: '2024-11-16' },
        { name: 'File 3', size: '1MB', type: 'Excel', modified: '2024-1-15' },
        { name: 'File 4', size: '1MB', type: 'Excel', modified: '2024-12-15' },
        { name: 'File 5', size: '1MB', type: 'Excel', modified: '2024-12-15' },
    ]);
    const [newFolderName, setNewFolderName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedRow, setSelectedRows] = useState<number[]>([]);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [isFolderInputVisible, setIsFolderInputVisible] = useState<boolean>(false);
    const [gridView, setGridView] = useState<boolean>(false);

    // Function to group files by time period
    const groupFilesByDate = () => {
        const now = new Date();
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const groups: {
            lastWeek: FileItem[];
            lastMonth: FileItem[];
            older: FileItem[];
        } = {
            lastWeek: [],
            lastMonth: [],
            older: []
        };

        files.forEach(file => {
            const fileDate = new Date(file.modified);
            if (fileDate >= lastWeek) {
                groups.lastWeek.push(file);
            } else if (fileDate >= lastMonth) {
                groups.lastMonth.push(file);
            } else {
                groups.older.push(file);
            }
        });

        return groups;
    };

    const groupedFiles = groupFilesByDate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            console.log(files);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

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

    const handleNewFolder = () => {
        if (newFolderName.trim()) {
            const currentDate = new Date().toISOString().split('T')[0];
            const newFolder: FileItem = {
                name: newFolderName,
                size: '-',
                type: 'Folder',
                modified: currentDate,
            };
            setFiles((prevFiles) => [...prevFiles, newFolder]);
            setNewFolderName('');
            setIsFolderInputVisible(false);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    // Component to render table section with label
    const TableSection: React.FC<SectionProps> = ({ files, label, startIndex }) => (
        files.length > 0 && (
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{label}</h2>
                <table className="w-full border-collapse">
                    <tbody>
                        {files.map((file, index) => (
                            <tr
                                key={startIndex + index}
                                onClick={() => handleRowClick(startIndex + index)}
                                className={`border-t ${selectedRow.includes(startIndex + index) ? 'bg-gray-800' : 'group hover:bg-gray-100'}`}
                            >
                                <td className="py-4 w-1/5">
                                    <div className="flex flex-col items-start">
                                        <span className="flex flex-row">
                                            <span>
                                                {isCheckboxVisible && (
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRow.includes(startIndex + index)}
                                                        onChange={() => handleRowClick(startIndex + index)}
                                                        className="-ml-5 h-[14px] w-5 peer checked:border-blue-500 checked:to-blue-700 transition-colors"
                                                    />
                                                )}
                                            </span>
                                            <span className="pl-5">{file.name}</span>
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 w-1/6">
                                    <div className="flex flex-col items-center">{file.size}</div>
                                </td>
                                <td className="py-4 w-1/6">
                                    <div className="flex flex-col items-start">{file.type}</div>
                                </td>
                                <td className="py-4 w-1/6">
                                    <div className="flex flex-col items-start">{formatDate(file.modified)}</div>
                                </td>
                                <td className="py-4 w-1/4">
                                    <div className="flex flex-col items-center">
                                        <div className="flex flex-row gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="bg-gray-600 rounded-lg px-2 py-1">share</button>
                                            <GridIcon />
                                            <GridIcon />
                                            <GridIcon />
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 w-1/2">
                                    <div className="flex flex-col items-center cursor-pointer">
                                        <span className="rotate-90">• • •</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );

    // Component to render grid section with label
    const GridSection: React.FC<SectionProps> = ({ files, label, startIndex }) => (
        files.length > 0 && (
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{label}</h2>
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 xl:grid-cols-4">
                    {files.map((file, index) => (
                        <div
                            key={startIndex + index}
                            className={`h-[212px] w-[250px] rounded-lg bg-zinc-500 ${selectedRow.includes(startIndex + index) ? '' : 'group'}`}
                            onClick={() => handleRowClick(startIndex + index)}
                        >
                            <div className="bg-white relative rounded-md m-2.5 h-[140px] flex">
                                <img src="logo.svg" alt={file.name} className="object-contain h-full w-full" />
                                <div className="absolute top-0 left-5">
                                    <span className="absolute top-1">
                                        {isCheckboxVisible && (
                                            <input
                                                type="checkbox"
                                                checked={selectedRow.includes(startIndex + index)}
                                                onChange={() => handleRowClick(startIndex + index)}
                                                className="-ml-5 h-[14px] w-5 peer checked:border-blue-500 checked:to-blue-700 transition-colors"
                                            />
                                        )}
                                    </span>
                                </div>
                                <div className={`absolute top-1 right-0 flex flex-row gap-x-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    <div><button className="bg-gray-500 rounded-lg px-4 py-1">Share</button></div>
                                    <div><GridIcon /></div>
                                    <div className="rotate-90 cursor-pointer">•••</div>
                                </div>
                            </div>
                            <div className="px-4 pt-px">
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="flex items-center justify-center space-x-2">
                                        <GridIcon />
                                        <div>
                                            <h3 className="font-semibold">{file.name}</h3>
                                            <div className="text-xs flex flex-row pt-px space-x-2">
                                                <p>{file.type}</p>
                                                <p>● {file.size}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-center cursor-pointer">
                                        <GridIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                    <h1 className="text-[22px] font-semibold">My files</h1>
                    <div className="flex gap-4">
                        {/* Upload button */}
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <button
                                onClick={handleButtonClick}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                <span className="flex flex-row gap-2 items-center justify-center">
                                    <GridIcon />
                                    Upload
                                </span>
                            </button>
                        </div>
                        {/* New folder button */}
                        <div>
                            <button
                                onClick={() => setIsFolderInputVisible(true)}
                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                            >
                                <span className="flex flex-row gap-2 items-center justify-center">
                                    <GridIcon />
                                    New folder
                                </span>
                            </button>
                            {isFolderInputVisible && (
                                <div>
                                    <input
                                        type="text"
                                        value={newFolderName}
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        placeholder="Enter folder name"
                                        className="mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <button
                                        onClick={handleNewFolder}
                                        className="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    >
                                        Create
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {files.length === 0 ? (
                    <div className="flex items-center justify-center flex-col space-y-3 pt-64">
                        <p className="text-[22px] font-medium">A place for all of your files</p>
                        <p>Drag your files and folders here or use the "Upload" button</p>
                    </div>
                ) : (
                    <>
                        {/* Action buttons and view toggle */}
                        <div className="text-center text-sm flex justify-between items-center">
                            <div className={`flex gap-3 ${selectedRow.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Share</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Copy link</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Download</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Move</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Delete</button>
                                <button className="rotate-90">• • •</button>
                            </div>
                            <div className="flex gap-3 items-center justify-center">
                                {selectedRow.length > 0 && <h2 className="font-medium text-center">{selectedRow.length} selected</h2>}
                                <div onClick={() => setGridView(false)} className="flex items-center justify-center flex-col">
                                    <button className="mb-px">
                                        <GridIcon />
                                    </button>
                                    <div className={`pt-[2px] ${!gridView ? 'border-t-2 w-6 border-black' : ''}`} />
                                </div>
                                <div onClick={() => setGridView(true)} className="flex items-center justify-center flex-col">
                                    <button className="mb-px">
                                        <GridIcon />
                                    </button>
                                    <div className={`pt-[2px] ${gridView ? 'border-t-2 w-6 border-black' : ''}`} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            {!gridView ? (
                                // Table headers
                                <div className="">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="py-4 text-left w-1/5">
                                                    <div className="flex flex-col items-start">
                                                        <span className="flex flex-row justify-center items-center">
                                                            {selectedRow.length > 0 && (
                                                                <input
                                                                    onClick={() => {
                                                                        setIsCheckboxVisible(false);
                                                                        setSelectedRows([]);
                                                                    }}
                                                                    type="checkbox"
                                                                    className="-ml-[20px] h-[14px] w-5 peer checked:border-blue-500 checked:to-blue-700 transition-colors"
                                                                />
                                                            )}
                                                            <span className="pl-4">Name</span>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="py-4 text-left w-1/6">
                                                    <div className="flex flex-col items-center">Size</div>
                                                </th>
                                                <th className="py-4 text-left w-1/6">
                                                    <div className="flex flex-col items-start">Type</div>
                                                </th>
                                                <th className="py-4 text-left w-1/6">
                                                    <div className="flex flex-col items-start">Modified on</div>
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
                                        files={groupedFiles.lastWeek}
                                        label="Last Week"
                                        startIndex={0}
                                    />
                                    <TableSection
                                        files={groupedFiles.lastMonth}
                                        label="Last Month"
                                        startIndex={groupedFiles.lastWeek.length}
                                    />
                                    <TableSection
                                        files={groupedFiles.older}
                                        label="Older"
                                        startIndex={groupedFiles.lastWeek.length + groupedFiles.lastMonth.length}
                                    />

                                </div>
                            ) : (
                                // Grid view sections
                                <div className="pb-10">
                                    <div className="px-4 m-2">
                                        <input
                                            onClick={() => {
                                                setIsCheckboxVisible(false);
                                                setSelectedRows([]);
                                            }}
                                            type="checkbox"
                                            className="-ml-[20px] h-[14px] w-5 peer checked:border-blue-500 checked:to-blue-700 transition-colors"
                                            style={{ visibility: selectedRow.length > 0 ? 'visible' : 'hidden' }}
                                        />
                                    </div>

                                    {/* Grid sections by date */}
                                    <GridSection
                                        files={groupedFiles.lastWeek}
                                        label="Last Week"
                                        startIndex={0}
                                    />
                                    <GridSection
                                        files={groupedFiles.lastMonth}
                                        label="Last Month"
                                        startIndex={groupedFiles.lastWeek.length}
                                    />
                                    <GridSection
                                        files={groupedFiles.older}
                                        label="Older"
                                        startIndex={groupedFiles.lastWeek.length + groupedFiles.lastMonth.length}
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

export default MyFiles;
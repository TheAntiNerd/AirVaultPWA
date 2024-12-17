import { useRef, useState } from "react";
import { GridIcon } from "../../../assets"
import SideMenu from "../../SideMenu"

const Home = () => {
    const [files, setFiles] = useState([
        { name: 'File 1', size: '2MB', type: 'PDF', modified: '2024-12-17' },
        { name: 'File 2', size: '5MB', type: 'Image', modified: '2024-12-16' },
        { name: 'File 3', size: '1MB', type: 'Text', modified: '2024-12-15' },
        { name: 'File 4', size: '1MB', type: 'Text', modified: '2024-12-15' },
    ]);
    const [newFolderName, setNewFolderName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedRow, setSelectedRows] = useState<number[]>([]);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [isFolderInputVisible, setIsFolderInputVisible] = useState<boolean>(false);


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
            const newFolder = {
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


    return (
        <SideMenu>
            {/* NavBar searchbar and account icon*/}

            {/* header*/}
            <div className="px-9 pt-6 text-sm">
                <div className="pb-4 flex justify-between items-center">
                    {/* Title */}
                    <h1 className="text-[22px] font-semibold">All files</h1>

                    {/* Buttons */}
                    <div className="flex gap-4">
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

                {/* hover buttons and toggle view */}
                <div className="text-center text-sm flex justify-between items-center">
                    <div className={`flex gap-3 ${selectedRow.length > 0 ? 'opacity-100' : 'opacity-0'} `}>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Share</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Copy link</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Download</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Move</button>
                        <button className="bg-gray-500 rounded-lg px-4 py-2">Delete</button>
                        <button className="rotate-90">• • •</button>
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                        <h2 className="font-medium text-center">{selectedRow.length} selected</h2>
                        <button className="">
                            <GridIcon />
                        </button>
                        <button className="">
                            <GridIcon />
                        </button>
                    </div>
                </div>

                {/* table */}
                <div className=" mt-6">
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


                                            <span className="pl-4">
                                                Name
                                            </span>

                                        </span>
                                    </div>
                                </th>
                                <th className=" py-4 text-left w-1/6">
                                    <div className="flex flex-col items-center">Size</div>
                                </th>
                                <th className=" py-4 text-left w-1/6">
                                    <div className="flex flex-col items-start">Type</div>
                                </th>
                                <th className=" py-4 text-left w-1/6">
                                    <div className="flex flex-col items-start">Modified on</div>
                                </th>
                                <th className=" py-4 text-left w-1/4">
                                    <div className="flex flex-col items-start"></div>
                                </th>
                                <th className=" py-4 text-left w-1/12">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(index)}
                                    className={`border-t ${selectedRow.includes(index) ? 'bg-gray-800' : 'group hover:bg-gray-100'}`}
                                >
                                    <td className="py-4 w-1/5">
                                        <div className="flex flex-col items-start">
                                            <span className="flex flex-row">
                                                <span>
                                                    {isCheckboxVisible && (
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedRow.includes(index)}
                                                            onChange={() => handleRowClick(index)}
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
                                        <div className="flex flex-col items-start">{file.modified}</div>
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
            </div>
        </SideMenu>

    )
}

export default Home
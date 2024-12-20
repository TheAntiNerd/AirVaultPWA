import { useRef, useState } from "react";
import {
    AudioIcon,
    CheckboxIcon,
    CopyIcon,
    CustomIcon,
    DeleteIcon,
    DocumentIcon,
    DownloadIcon,
    ExcelIcon,
    FormIcon,
    GridIcon,
    ImageIcon,
    ListIcon,
    MoveIcon,
    NewFolderIcon,
    OtherTypeIcon,
    PdfIcon,
    PptIcon,
    StarredIcon,
    UpIcon,
    UploadIcon,
    VideoIcon,
    ZipIcon
} from "../../../assets"
import SideMenu from "../../SideMenu"
import Navbar from "../navbar";

interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    index: number;
}
const Home = () => {
    const [files, setFiles] = useState([
        { name: 'File 1', size: '2 MB', type: 'PDF', modified: '2024-12-20' },
        { name: 'File 2', size: '5 MB', type: 'Image', modified: '2024-12-16' },
        { name: 'File 3', size: '1 MB', type: 'Audio', modified: '2024-12-15' },
        { name: 'File 4', size: '1 MB', type: 'Video', modified: '2024-12-15' },
        { name: 'File 5', size: '1 MB', type: 'Document', modified: '2024-12-15' },
    ]);
    const [newFolderName, setNewFolderName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedRow, setSelectedRows] = useState<number[]>([]);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [isFolderInputVisible, setIsFolderInputVisible] = useState<boolean>(false);
    const [gridView, setGridView] = useState<boolean>(false);

    const fileTypeImages: {
        Document: JSX.Element;
        Folder: JSX.Element;
        Spreadsheet: JSX.Element;
        Presentation: JSX.Element;
        Form: JSX.Element;
        PDF: JSX.Element;
        Video: JSX.Element;
        Image: JSX.Element;
        Audio: JSX.Element;
        Archive: JSX.Element;
        Other: JSX.Element;
    } = {
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
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <SideMenu>
            {/* NavBar searchbar and account icon*/}
            <Navbar files={files} gridView={gridView} />
            {/* header*/}
            <div className="px-9 pt-6 text-sm ">
                <div className="pb-4 flex justify-between items-center">
                    {/* Title */}
                    <h1 className="text-[22px] font-medium text-primary-heading">All files</h1>

                    {/* Buttons */}
                    <div className="flex gap-5">
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
                                className="px-4 py-2 bg-buttonPrimary  rounded-lg  transition"
                            >
                                <span className="flex items-center justify-between gap-2  ">
                                    <UploadIcon />
                                    <span className="pr-10 font-medium text-white flex justify-center items-center">
                                        Upload
                                    </span>

                                </span>
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => setIsFolderInputVisible(true)}
                                className="px-4 py-2 bg-white rounded-lg transition border-border border"
                            >
                                <span className="flex flex-row gap-2 items-center justify-between">
                                    <NewFolderIcon />
                                    <span className="pr-10 font-medium text-primary-para flex items-center justify-center">
                                        New folder
                                    </span>
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
                {/* files empty */}
                {files.length === 0 ? (<>
                    <div className="flex items-center justify-center flex-col gap-y-3 min-h-screen pb-80">
                        <h2 className="text-primary-heading text-[22px] font-medium">Welcome to AirVault</h2>
                        <p className="text-primary-para">
                            Drag your files and folder here or use the "<span className="font-semibold">upload</span>" button
                        </p>
                    </div>
                </>) : (<>
                    {/* hover buttons and toggle view */}
                    <div className="text-center text-sm flex justify-between items-center text-primary-para">
                        <div className={`flex gap-3 items-center justify-between  ${selectedRow.length > 0 ? 'opacity-100' : 'opacity-0'} `}>
                            <button className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button>
                            <button className="bg-hover rounded-lg px-4 py-2">
                                <span className="flex items-center justify-between">
                                    <CopyIcon />
                                    <span className="pl-1.5">
                                        Copy link
                                    </span>

                                </span>
                            </button>
                            <button className="bg-hover rounded-lg px-4 py-2">
                                <span className="flex items-center justify-between">
                                    <DownloadIcon />
                                    <span className="pl-1.5">
                                        Download
                                    </span>

                                </span>
                            </button>
                            <button className="bg-hover rounded-lg px-4 py-2">
                                <span className="flex items-center justify-between">
                                    <MoveIcon />
                                    <span className="pl-1.5">
                                        Move
                                    </span>

                                </span>
                            </button>
                            <button className="bg-hover rounded-lg px-4 py-2">
                                <span className="flex items-center justify-between">
                                    <DeleteIcon />
                                    <span className="pl-1.5">
                                        Delete
                                    </span>

                                </span>
                            </button>
                            <button className="rotate-90">•••</button>
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

                    {/* table */}
                    <div className=" mt-6">
                        {!gridView ? (<table className="w-full border-collapse cursor-default">
                            <thead className=" text-primary-heading">
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
                                    <th className=" py-4 text-left w-1/6">
                                        <div className="flex flex-col items-center font-medium">Size</div>
                                    </th>
                                    <th className=" py-4 text-left w-1/6">
                                        <div className="flex flex-col items-start font-medium">Type</div>
                                    </th>
                                    <th className=" py-4 text-left w-1/6">
                                        <div className="flex flex-col items-start font-medium">Modified on</div>
                                    </th>
                                    <th className=" py-4 text-left w-1/4">
                                        <div className="flex flex-col items-start"></div>
                                    </th>
                                    <th className=" py-4 text-left w-1/12">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-primary-para">
                                {files.map((file, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleRowClick(index)}
                                        className={`border-t ${selectedRow.includes(index) ? 'bg-selected' : 'group hover:bg-hover'}`}
                                    >
                                        <td className="py-2 w-1/5">
                                            <div className="flex flex-col items-start">
                                                <span className="flex items-center justify-between">
                                                    <span>
                                                        {isCheckboxVisible && (
                                                            <CustomCheckbox
                                                                checked={selectedRow.includes(index)}
                                                                onChange={() => handleRowClick(index)}
                                                                index={index}
                                                            />
                                                        )}
                                                    </span>
                                                    <span className="pl-3 flex flex-row items-center gap-x-2">
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
                                            <div className="flex flex-col items-start">{formatDate(file.modified)}</div>
                                        </td>
                                        <td className="py-2 w-1/4">
                                            <div className="flex flex-col items-center">
                                                <div className="flex flex-row items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                ))}
                            </tbody>
                        </table>) : (
                            /* Grid */
                            <div className='pb-10 cursor-default'>
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
                                            <span className="flex flex-row items-center space-x-1">
                                                Name <UpIcon />
                                            </span>
                                        </span>

                                    </button>
                                </div>



                                <div className=' grid grid-cols-3 gap-x-3 gap-y-6 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 xl:grid-cols-4'>
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className={`h-[212px] w-[250px] rounded-lg bg-hover  ${selectedRow.includes(index) ? 'bg-selected' : 'group'}`}
                                            onClick={() => handleRowClick(index)}
                                        >
                                            <div className='bg-white relative rounded-md m-2.5 h-[140px] flex '>
                                                <img src="logo.svg" alt={file.name} className='object-contain h-full w-full' />
                                                {/* Checkboxes */}
                                                <div className="absolute top-0 left-5">
                                                    <span className="absolute top-1 left-2">
                                                        {isCheckboxVisible && (
                                                            <CustomCheckbox
                                                                checked={selectedRow.includes(index)}
                                                                onChange={() => handleRowClick(index)}
                                                                index={index}
                                                            />
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={`absolute top-1 right-0 flex flex-row items-center gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    <div><button className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button></div>
                                                    <div><CopyIcon /></div>
                                                    <div className="rotate-90 cursor-pointer">•••</div>
                                                </div>

                                            </div>
                                            {/* Details Container */}
                                            <div className='px-4 pt-px'>

                                                {/* File Info */}
                                                <div className='flex flex-row items-center space-x-1'>
                                                    {fileTypeImages[file.type as keyof typeof fileTypeImages] || <OtherTypeIcon />}
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
                                    ))}
                                </div>
                            </div>)}
                    </div>
                </>)}
            </div>

        </SideMenu >

    )
}

export default Home
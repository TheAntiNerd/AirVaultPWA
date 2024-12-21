import { useEffect, useRef, useState } from "react";
import {
    AudioIcon,
    BlueTickIcon,
    CheckboxIcon,
    CopycopyIcon,
    CopyIcon,
    CustomIcon,
    DeleteIcon,
    DetailsIcon,
    DocumentIcon,
    DownArrow,
    DownloadIcon,
    ExcelIcon,
    FileUpload,
    FolderUpload,
    FormIcon,
    GlobeIcon,
    GridIcon,
    ImageIcon,
    ListIcon,
    LockIcon,
    MoveIcon,
    NewFolderIcon,
    OtherTypeIcon,
    PdfIcon,
    PptIcon,
    RemoveIcon,
    RenameIcon,
    ShareFileIcon,
    StarredIcon,
    UpIcon,
    UploadIcon,
    UserpermsIcon,
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
    const [newFolderName, setNewFolderName] = useState<string>('New folder');
    const [selectedRow, setSelectedRows] = useState<number[]>([]);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [isFolderInputVisible, setIsFolderInputVisible] = useState<boolean>(false);
    const [gridView, setGridView] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeletePopup, setDeletePopup] = useState(false)
    const [showDropdownPopup, setDropdownPopup] = useState<number | null>(null)
    const [showDropdownPopup2, setDropdownPopup2] = useState<boolean>(false)
    const [showSharePopup, setSharePopup] = useState<boolean>(false)
    const [showPerm, setPerm] = useState<boolean>(false);
    const [showLink, setLinkType] = useState<boolean>(false);
    const [role, setRole] = useState<string>('Viewer')
    const [linkType, setLink] = useState<string>('Anyone with the link')

    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalUploadRef = useRef<HTMLDivElement | null>(null);
    const deletePopupRef = useRef<HTMLDivElement | null>(null);
    const dropdownPopupRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);
    const dropdownPopup2Ref = useRef<HTMLInputElement>(null);
    const sharePopupRef = useRef<HTMLInputElement>(null);
    const permRef = useRef<HTMLInputElement>(null);
    const LinkRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsFolderInputVisible(false);
            }
            if (modalUploadRef.current && !modalUploadRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
            if (deletePopupRef.current && !deletePopupRef.current.contains(event.target as Node)) {
                setDeletePopup(false);
            }
            if (dropdownPopupRef.current && !dropdownPopupRef.current.contains(event.target as Node)) {
                setDropdownPopup(null);
            }
            if (dropdownPopup2Ref.current && !dropdownPopup2Ref.current.contains(event.target as Node)) {
                setDropdownPopup2(false);
            }
            if (sharePopupRef.current && !sharePopupRef.current.contains(event.target as Node)) {
                setSharePopup(false);
            }
            if (permRef.current && !permRef.current.contains(event.target as Node)) {
                setPerm(false);
            }
            if (LinkRef.current && !LinkRef.current.contains(event.target as Node)) {
                setLinkType(false);
            }
        };

        if (
            isFolderInputVisible ||
            showDropdown ||
            showDeletePopup ||
            showDropdownPopup ||
            showDropdownPopup2 ||
            showSharePopup ||
            showPerm || showLink
        ) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isFolderInputVisible,
        showDropdown,
        showDeletePopup,
        showDropdownPopup,
        showDropdownPopup2,
        showSharePopup, showPerm, showLink
    ]);

    const permissions = ['Viewer', 'Editor', 'Commenter'];
    const link = ['Anyone with the link', 'Limited access']

    const handleDropdownToggle = (index: number) => {
        setDropdownPopup(showDropdownPopup === index ? null : index);
    };

    const maxLength = 63;
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

    const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        console.log(files);
    };

    const handleUploadFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        setShowDropdown(false);
    };

    const handleUploadFolder = () => {
        if (folderInputRef.current) {
            folderInputRef.current.click();
        }
        setShowDropdown(false);
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

    const handleNewFolder = () => {
        if (newFolderName.trim()) {
            const currentDate = new Date().toISOString().split('T')[0];
            const newFolder = {
                name: newFolderName || 'New folder',
                size: '-',
                type: 'Folder',
                modified: currentDate,
            };
            setFiles((prevFiles) => [...prevFiles, newFolder]);

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
                            <input
                                ref={folderInputRef}
                                type="file"
                                /* webkitdirectory="true" */
                                onChange={handleFolderChange}
                                className="hidden"
                            />

                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="px-4 py-2 bg-buttonPrimary hover:bg-[#509FFA] rounded-lg transition"
                            >
                                <span className="flex items-center justify-between gap-2">
                                    <UploadIcon />
                                    <span className="pr-12 font-medium text-white flex justify-center items-center">
                                        Upload
                                    </span>
                                </span>
                            </button>

                            {showDropdown && (
                                <div ref={modalUploadRef} className="absolute bg-white shadow-lg rounded-lg w-[155px] text-primary-para ">
                                    <button
                                        onClick={handleUploadFile}
                                        className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2"
                                    >
                                        <FileUpload />
                                        Upload file
                                    </button>
                                    <button
                                        onClick={handleUploadFolder}
                                        className="px-4 py-2  w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2"
                                    > <FolderUpload />
                                        Upload folder
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Folder */}
                        <div  >
                            <button
                                onClick={() => setIsFolderInputVisible(true)}
                                className="px-4 py-2 bg-white rounded-lg hover:bg-hover transition border-border border"
                            >
                                <span className="flex flex-row gap-2 items-center justify-between">
                                    <NewFolderIcon />
                                    <span className="pr-10 font-medium text-primary-para flex items-center justify-center">
                                        New folder
                                    </span>
                                </span>
                            </button>

                            {isFolderInputVisible && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div ref={modalRef} className="bg-white p-5 rounded-lg shadow-lg w-80 relative">
                                        <div className="px-1 text-primary-heading font-medium text-[22px]">
                                            <h2>New folder</h2>
                                        </div>
                                        <div className="text-primary-para mt-4 px-1">
                                            Name
                                        </div>
                                        <input
                                            type="text"
                                            value={newFolderName}
                                            onChange={(e) => setNewFolderName(e.target.value)}
                                            placeholder="New folder"
                                            className="w-full  px-4 py-2 text-primary-para border border-border rounded-lg focus:outline-none focus:border-borderView focus:border-2"
                                        />
                                        <span
                                            className="absolute right-6 top-[87px] mb-3 mr-2 text-xs text-primary-para"
                                            style={{
                                                transform: 'translateY(120%)',
                                                padding: '0 4px',
                                                backgroundColor: 'white',
                                            }}>
                                            {newFolderName.length}/{maxLength}
                                        </span>
                                        <div className="flex flex-row items-center space-x-3 mt-6 ">
                                            <button onClick={() => setIsFolderInputVisible(false)} className="flex flex-grow items-center justify-center text-primary-para">
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleNewFolder}
                                                className=" flex flex-grow px-1 py-1.5 bg-blue-500 text-white rounded-lg justify-center"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* files empty */}
                {
                    files.length === 0 ? (<>
                        <div className="flex items-center justify-center flex-col gap-y-3 min-h-screen pb-80">
                            <h2 className="text-primary-heading text-[22px] font-medium">Welcome to AirVault</h2>
                            <p className="text-primary-para">
                                Drag your files and folder here or use the "<span className="font-semibold">upload</span>" button
                            </p>
                        </div>
                    </>) : (<>
                        {/* hover buttons and toggle view */}
                        <div className="text-center  text-sm flex justify-between items-center text-primary-para">
                            <div className={`flex relative gap-3 items-center justify-between  ${selectedRow.length > 0 ? 'opacity-100' : 'opacity-0'} `}>
                                <button onClick={() => setSharePopup(!showSharePopup)}
                                    className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button>
                                <button className="bg-hover rounded-lg px-4 py-2">
                                    <span className="flex items-center justify-between">
                                        <CopyIcon />
                                        <span className="pl-1.5">
                                            Copy link
                                        </span>

                                    </span>
                                </button>
                                <button
                                    className="bg-hover rounded-lg px-4 py-2">
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
                                <button onClick={() => setDeletePopup(!showDeletePopup)}
                                    className="bg-hover rounded-lg px-4 py-2">
                                    <span className="flex items-center justify-between">
                                        <DeleteIcon />
                                        <span className="pl-1.5">
                                            Delete
                                        </span>

                                    </span>
                                </button>
                                <div>
                                    <button onClick={() => setDropdownPopup2(!showDropdownPopup2)}
                                        className="rotate-90">•••
                                    </button>
                                    {(showDropdownPopup2) && (
                                        <div ref={dropdownPopup2Ref} className="absolute right-0 mt-4 bg-white shadow-lg rounded-lg w-56 text-primary-para z-20 ">
                                            <button
                                                className="px-4 my-px py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                <UserpermsIcon />
                                                Manage permissions
                                            </button>
                                            <button
                                                className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                <MoveIcon />
                                                Move
                                            </button>
                                            <button
                                                className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                <RenameIcon />
                                                Rename
                                            </button>
                                            <button
                                                className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                <CopycopyIcon />
                                                Copy
                                            </button>
                                            <button
                                                className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                <DetailsIcon />
                                                Details
                                            </button>
                                            <button
                                                className="px-4 py-2 mb-px w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2"
                                            > <DeleteIcon />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

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
                                            className={`border-b border-border/40 relative ${selectedRow.includes(index) ? 'bg-selected' : 'group hover:bg-hover'}`}
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
                                                                {fileTypeImages[file.type] || <OtherTypeIcon />}
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
                                                    <div className={`flex flex-row items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity `}>
                                                        <button onClick={() => setSharePopup(!showSharePopup)}
                                                            className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button>
                                                        <CopyIcon />
                                                        <DownloadIcon />
                                                        < StarredIcon />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 w-1/2 ">
                                                <div onClick={() => handleDropdownToggle(index)}
                                                    className="flex  flex-col items-start cursor-pointer">
                                                    <span className="rotate-90">•••</span>
                                                </div>
                                                {(showDropdownPopup === index) && (
                                                    <div ref={dropdownPopupRef} className="absolute right-10 mt-2 bg-white shadow-lg rounded-lg w-56 text-primary-para z-20 ">
                                                        <button
                                                            className="px-4 my-px py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                            <UserpermsIcon />
                                                            Manage permissions
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                            <MoveIcon />
                                                            Move
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                            <RenameIcon />
                                                            Rename
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                            <CopycopyIcon />
                                                            Copy
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                                                            <DetailsIcon />
                                                            Details
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 mb-px w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2"
                                                        > <DeleteIcon />
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
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
                                                <span className="flex flex-row items-center space-x-1 text-primary-heading font-medium">
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
                    </>)
                }
            </div >
            {/* Delete popup */}
            {showDeletePopup && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div ref={deletePopupRef} className="bg-white p-5 rounded-lg shadow-lg w-80 relative">
                    <div className="px-1 text-primary-heading font-medium text-[22px]">
                        <h2>Delete?</h2>
                        <p className="text-primary-para text-sm pt-3.5">Items in the bin will be deleted forever after 30 days.</p>
                    </div>
                    <div className="flex flex-row items-center space-x-3 mt-6 ">
                        <button onClick={() => setDeletePopup(!showDeletePopup)} className="flex flex-grow items-center justify-center text-primary-para">
                            Cancel
                        </button>
                        <button
                            onClick={() => { }}
                            className=" flex flex-grow px-1 py-1.5 bg-blue-500 text-white rounded-lg justify-center"
                        >
                            Yes, delete it
                        </button>
                    </div>
                </div>
            </div>}

            {/* share popup */}
            {showSharePopup && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div ref={sharePopupRef} className="bg-white p-6 rounded-xl shadow-lg w-[428px] relative">
                    <div className=" text-primary-heading font-medium text-[22px] flex flex-row items-center gap-x-2 mb-4">
                        <ShareFileIcon /><h2 className=""> Share</h2>
                    </div>
                    {/* add people box */}
                    <div className="mb-5">
                        <div className="bg-white border border-border focus:outline-none text-primary-para p-3 rounded-lg">
                            <h3>Add people</h3>

                        </div>
                    </div>
                    {/* people with access */}
                    <h3 className="mb-3 text-primary-heading">People with access</h3>
                    <div className="mb-5">
                        {/*  <div className="border-t border-border/50" /> */}
                        <div className="h-36 overflow-auto  custom-scrollbar">
                            {[...Array(8)].map((_, i) => (
                                <div key={i}>
                                    <div className='flex justify-between items-center cursor-pointer py-2 '>
                                        <div className="flex flex-row items-center ">
                                            <div className=' bg-[#FAD24B] px-1.5 py-1 rounded-full flex items-center justify-center'>
                                                <span className="text-center">RP</span>
                                            </div>
                                            <span className='text-sm ml-3 leading-5'>
                                                <p className='font-medium text-primary-heading pb-px max-w-36 truncate'>Repo Oper{i + 1}</p>
                                                <p className='text-primary-searchFilter pt-px text-xs max-w-36 truncate'>reporepo@repo.com</p>
                                            </span>
                                        </div>
                                        <div className="mr-2.5">
                                            <span className="flex items-center justify-between gap-x-2 text-primary-heading">
                                                Viewer   <DownArrow />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*  <div className="border-t border-border/50" /> */}
                    </div>
                    {/* General access */}
                    <h3 className="mb-3 font-medium text-primary-heading">General access</h3>
                    <div className="flex justify-between items-center mb-5">
                        <div className="relative flex items-center justify-between space-x-3">
                            {linkType === 'Limited access' ? <LockIcon /> : <GlobeIcon />}
                            <span className="text-primary-heading font-medium text-center cursor-pointer">{linkType}</span>
                            <button onClick={() => setLinkType(!showLink)}>
                                <span className="flex items-center justify-center ">
                                    <DownArrow />
                                </span>

                            </button>
                            {/* Link dropdown */}
                            {showLink &&
                                <div ref={LinkRef} className="absolute w-56 cursor-pointer -bottom-20 -left-4 rounded-lg shadow-lg bg-white text-primary-para">
                                    {link.map((item, index) =>
                                        <div key={index}
                                            onClick={() => {
                                                setLink(item);
                                                setLinkType(!showLink)
                                            }}
                                            className="w-full hover:bg-hover hover:rounded-md ">
                                            <span className="px-4 py-2 flex flex-row items-center gap-x-2 group">
                                                <span className="group-hover:opacity-100 opacity-0"><BlueTickIcon /></span> {item}
                                            </span>
                                        </div>)}

                                </div>
                            }
                        </div>
                        <div onClick={() => {
                            setPerm(!showPerm),
                                setRole(role)
                        }}
                            className="relative cursor-pointer pr-3.5">
                            <span className="flex items-center justify-between gap-x-2 text-primary-heading">
                                {role}  <DownArrow />
                            </span>

                        </div>
                        {showPerm &&
                            <div ref={permRef} className="absolute bg-white shadow-lg w-36 right-0 mx-6 bottom-32 rounded-lg text-primary-para ">
                                {permissions.map((perm, index) => (
                                    <div key={index} onClick={() => {
                                        setRole(perm);
                                        setPerm(false)
                                    }}
                                        className="w-full hover:bg-hover hover:rounded-md">
                                        <button className="px-2 py-2 flex flex-row items-center gap-x-2 group">
                                            <span className="group-hover:opacity-100 opacity-0"><BlueTickIcon /></span>
                                            {perm}
                                        </button>
                                    </div>
                                ))}
                                <div className="border-t border-border/50" />
                                <button onClick={() => { }} className="px-2.5 py-2 flex items-center flex-row gap-x-2"><RemoveIcon /> Remove user</button>
                            </div>
                        }
                    </div>
                    {/* copy */}
                    <button className="w-28 flex flex-row items-center gap-x-2 text-primary-para px-2 py-1 border rounded-lg font-medium border-border bg-white">
                        <CopyIcon />
                        Copy link
                    </button>
                    <div className="flex flex-row items-center space-x-3 mt-4 ">
                        <button onClick={() => setSharePopup(!showSharePopup)} className="flex flex-grow items-center justify-center text-primary-para">
                            Cancel
                        </button>
                        <button
                            onClick={() => { }}
                            className=" flex flex-grow px-1 py-2.5 bg-blue-500 text-white rounded-lg justify-center"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>}


        </SideMenu >

    )
}

export default Home
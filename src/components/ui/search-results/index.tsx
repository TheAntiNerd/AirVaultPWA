
import { useEffect, useRef, useState } from 'react';
import { AudioIcon, BlueTickIcon, CheckboxIcon, CopyIcon, CustomIcon, DeleteIcon, DocumentIcon, DownArrow, DownloadIcon, ExcelIcon, FormIcon, GridIcon, ImageIcon, ListIcon, MenuCloseIcon, MoveIcon, OtherTypeIcon, PdfIcon, PptIcon, StarredIcon, UpIcon, VideoIcon, ZipIcon } from '../../../assets';
import SideMenu from '../../SideMenu'
import Navbar from '../navbar'
import { useLocation } from 'react-router';
import Dropdown from '../modals/dropdown/Dropdown';
import Delete from '../modals/popup/Delete';
import Share from '../modals/popup/Share';
import Dropdown2 from '../modals/dropdown/Dropdown2';

interface File {
    name: string;
    size: string;
    type: string;
    modified: string;
}
interface CustomCheckboxProps {
    checked: boolean;
    onChange: () => void;
    index: number;
}
const files = [
    { name: 'File 1', size: '2MB', type: 'PDF', modified: '2024-12-17' },
    { name: 'File 2', size: '5MB', type: 'Image', modified: '2024-12-16' },
    { name: 'File 3', size: '1MB', type: 'Excel', modified: '2024-12-15' },
    { name: 'File 4', size: '1MB', type: 'Excel', modified: '2024-12-15' },
];
const SearchResult = () => {
    const location = useLocation();
    const { selectedType, selectedModified, gridView } = location.state || {};
    const [selectedRow, setSelectedRows] = useState<number[]>([]);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState<boolean>(false);
    const [selectType, setSelectedType] = useState<string>(selectedType || '');
    const [selectModified, setSelectedModified] = useState<string>(selectedModified || '');
    const [filteredFiles, setFilteredFiles] = useState<File[]>(files);
    const [gridViews, setGridView] = useState<boolean>(gridView || false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenModified, setOpenModified] = useState<boolean>(false);
    const [showDeletePopup, setDeletePopup] = useState(false)
    const [showDropdownPopup, setDropdownPopup] = useState<number | null>(null)
    const [showDropdownPopup2, setDropdownPopup2] = useState<boolean>(false)
    const [showSharePopup, setSharePopup] = useState<boolean>(false)



    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const modifiedDropdownRef = useRef<HTMLDivElement>(null);
    const deletePopupRef = useRef<HTMLDivElement | null>(null);
    const dropdownPopupRef = useRef<HTMLDivElement | null>(null);
    const dropdownPopup2Ref = useRef<HTMLInputElement>(null);
    const sharePopupRef = useRef<HTMLInputElement>(null);

    const fileTypes = ['Folder', 'Document', 'Spreadsheet', 'Presentation', 'Form', 'PDF', 'Video', 'Image', 'Audio', 'Archive', 'Other',];
    const modifiedOptions = ['Today', 'Last Week', 'Last month', '3 months', '6 months', 'Last year', 'Before last year'];


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
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setIsOpen(false);
        filterFiles(type, selectModified);
    };

    const handleModifiedChange = (option: string) => {
        setSelectedModified(option);
        setOpenModified(false)
        filterFiles(selectType, option);
    };
    const handleDropdownToggle = (index: number) => {
        setDropdownPopup(showDropdownPopup === index ? null : index);
    };
    const filterFiles = (type: string, modified: string) => {
        let results = files;
        if (type) {
            results = results.filter(
                (file) => file.type.toLowerCase() === type.toLowerCase()
            );
        }

        if (modified) {
            const now = new Date();
            results = results.filter((file) => {
                const fileDate = new Date(file.modified);
                switch (modified) {
                    case 'Today':

                        return now.getTime() - fileDate.getTime() <= 1 * 24 * 60 * 60 * 1000;
                    case 'Last Week':

                        return now.getTime() - fileDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
                    case 'Last Month':

                        return now.getTime() - fileDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
                    case '3 Months':

                        return now.getTime() - fileDate.getTime() <= 90 * 24 * 60 * 60 * 1000;
                    case '6 Months':

                        return now.getTime() - fileDate.getTime() <= 180 * 24 * 60 * 60 * 1000;
                    case 'Last Year':

                        return now.getTime() - fileDate.getTime() <= 365 * 24 * 60 * 60 * 1000;
                    case 'Before Last Year':

                        return now.getTime() - fileDate.getTime() > 365 * 24 * 60 * 60 * 1000;
                    default:
                        return true;
                }
            });
        }

        setFilteredFiles(results);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Handle Types dropdown
            if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            // Handle Modified dropdown
            if (modifiedDropdownRef.current && !modifiedDropdownRef.current.contains(event.target as Node)) {
                setOpenModified(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isOpenModified])

    return (
        <SideMenu>
            <Navbar files={files} gridView={gridView} />
            <div className="px-9 pt-6 text-sm ">
                <div className="pb-4 flex justify-between items-center">
                    {/* Title */}
                    <h1 className="text-[22px] font-semibold text-primary-heading">Search Results</h1>
                </div>
                {files.length === 0 ? (
                    <>
                        <span className='flex items-center justify-center h-screen pb-64'>
                            <p className='text-primary-heading text-[22px] font-semibold'>No matching results
                                <span className='flex flex-col items-center text-primary-para text-sm mt-2'>
                                    Try another search</span></p>
                        </span>
                    </>) :
                    <>
                        {/* buttons */}
                        <div className='flex items-center justify-between'>
                            {selectedRow.length === 0 ?
                                (<div className='flex flex-row space-x-6'>
                                    <div className='flex flex-row space-x-5'>
                                        <div className="mt-2 relative " ref={typeDropdownRef}>
                                            {/* Custom Trigger */}
                                            <div
                                                className={`appearance-none border border-border rounded-md px-2 mx-1 py-1 bg-white flex items-center justify-between cursor-pointer
                                                                        ${selectType ? 'bg-[#D6ECFb] border-none' : ''}`}
                                                onClick={() => {
                                                    setIsOpen(!isOpen)
                                                    setOpenModified(false)
                                                }}
                                            >
                                                <div className={`flex items-center gap-2 text-primary-searchFilter`}>
                                                    {selectType ? fileTypeImages[selectType] : null}
                                                    <span>{selectType || 'Types'}</span>
                                                </div>
                                                <div className="flex items-center pointer-events-none mx-1.5">
                                                    <DownArrow />
                                                </div>
                                                {selectType && (
                                                    <button
                                                        className=""
                                                        onClick={() => setSelectedType('')}
                                                    >
                                                        <MenuCloseIcon />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Dropdown Menu */}
                                            {isOpen && (
                                                <div
                                                    className="absolute ml-1 w-[160px] bg-white border rounded-md shadow-md z-10 text-primary-searchFilter">
                                                    <div>
                                                        {fileTypes.map((type) => (
                                                            <div
                                                                key={type}
                                                                className="px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-hover hover:rounded-md"
                                                                onClick={() => handleTypeChange(type)}
                                                            >
                                                                {fileTypeImages[type]}
                                                                <span className='pl-1'>{type}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Modify button */}
                                        <div className="relative mt-2" ref={modifiedDropdownRef}>
                                            {/* Custom Dropdown Trigger */}
                                            <div
                                                className={`appearance-none border border-border rounded-lg px-2 py-1 cursor-pointer focus:outline-none flex items-center justify-between
                                                                         ${selectModified ? 'bg-[#D6ECFF] border-none' : ''}`}
                                                onClick={() => {
                                                    setOpenModified(!isOpenModified)
                                                    setIsOpen(false)
                                                }}
                                            >
                                                <span className='pr-2 text-primary-searchFilter'>{selectModified || 'Modified'}</span>
                                                <div className="flex items-center space-x-1">
                                                    <DownArrow />
                                                    {selectModified && (
                                                        <button
                                                            className=""
                                                            onClick={() => setSelectedModified('')}
                                                        >
                                                            <MenuCloseIcon />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Custom Dropdown Options */}
                                            {isOpenModified && (
                                                <div className="absolute  w-[160px] bg-white border rounded-lg shadow-md z-10 text-primary-searchFilter ">
                                                    {modifiedOptions.map((option) => (
                                                        <div
                                                            key={option}
                                                            className="px-2 py-1.5 flex items-center gap-2 cursor-pointer group hover:bg-hover hover:rounded-md"
                                                            onClick={() => handleModifiedChange(option)}
                                                        >
                                                            <span className='flex flex-row items-center'>
                                                                <span className='opacity-0 group-hover:opacity-100'><BlueTickIcon /></span>
                                                                <span className='pl-2'>
                                                                    {option}
                                                                </span>
                                                            </span>

                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div onClick={() => {
                                        setSelectedModified(''),
                                            setSelectedType('')
                                    }}
                                        className='flex justify-center items-center cursor-pointer'>
                                        <p className='text-center text-primary-heading pt-2 font-semibold'>Clear filters</p>
                                    </div>
                                </div>
                                ) : (
                                    <div className="text-center text-sm flex justify-between items-center text-primary-para">
                                        <div className={` relative flex gap-3 items-center justify-between  ${selectedRow.length > 0 ? 'opacity-100' : 'opacity-0'} `}>
                                            <button onClick={() => setSharePopup(!showSharePopup)} className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button>
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
                                            <button onClick={() => setDeletePopup(!showDeletePopup)} className="bg-hover rounded-lg px-4 py-2">
                                                <span className="flex items-center justify-between">
                                                    <DeleteIcon />
                                                    <span className="pl-1.5">
                                                        Delete
                                                    </span>

                                                </span>
                                            </button>
                                            <button onClick={() => setDropdownPopup2(!showDropdownPopup2)} className="rotate-90">•••</button>
                                            {(showDropdownPopup2) && (
                                                <Dropdown2 ref={dropdownPopup2Ref} showDropdownPopup2={showDropdownPopup2} setDropdownPopup2={setDropdownPopup2} />
                                            )}
                                        </div>
                                    </div>
                                )}

                            <div className="flex gap-3 items-center justify-center">
                                {selectedRow.length > 0 && <h2 className="font-semibold text-center text-primary-para">{selectedRow.length} selected</h2>}
                                {/* Work on this */}
                                {(selectType || selectModified) && <h2 className="font-semibold text-center text-primary-para">{filteredFiles.length} match</h2>}
                                <div onClick={() => setGridView(false)} className="flex items-center justify-center flex-col">
                                    <button className="mb-1">
                                        <ListIcon /> {/* Grid view */}
                                    </button>
                                    <div className={`pt-px ${!gridViews ? 'border-t-2 w-6 border-borderView ' : ""}`} />
                                </div>
                                <div onClick={() => setGridView(true)} className="flex items-center justify-center flex-col" >
                                    <button className="mb-1">
                                        <GridIcon /> {/* Grid view */}
                                    </button>
                                    <div className={`pt-px ${gridViews ? 'border-t-2 w-6 border-borderView ' : ""}`} />
                                </div>
                            </div>
                        </div>

                        {/* table */}
                        <div className=" mt-6">
                            {!gridViews ? (<table className="w-full border-collapse cursor-default">
                                {filteredFiles.length > 0 && <thead className=" text-primary-heading">
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

                                                    <span className="pl-3 font-semibold flex flex-row items-center space-x-1">

                                                        Name
                                                        {selectedRow.length > 0 && <UpIcon />}

                                                    </span>
                                                </span>
                                            </div>
                                        </th>
                                        <th className=" py-4 text-left w-1/6">
                                            <div className="flex flex-col items-center font-semibold">Size</div>
                                        </th>
                                        <th className=" py-4 text-left w-1/6">
                                            <div className="flex flex-col items-start font-semibold">Type</div>
                                        </th>
                                        <th className=" py-4 text-left w-1/6">
                                            <div className="flex flex-col items-start font-semibold">Modified on</div>
                                        </th>
                                        <th className=" py-4 text-left w-1/4">
                                            <div className="flex flex-col items-start"></div>
                                        </th>
                                        <th className=" py-4 text-left w-1/12">
                                        </th>
                                    </tr>
                                </thead>}

                                {filteredFiles.length === 0 ? (<>
                                    <span className='flex items-center justify-center pt-40'>
                                        <p className='text-primary-heading text-[22px] font-semibold'>No matching results
                                            <span className='flex flex-col items-center text-primary-para text-sm mt-2'>
                                                Try another search</span></p>
                                    </span></>) : (
                                    <>
                                        <tbody className="text-primary-para">
                                            {filteredFiles.map((file, index) => (
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
                                                                <button onClick={() => setSharePopup(!showSharePopup)} className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button>
                                                                <CopyIcon />
                                                                <DownloadIcon />
                                                                < StarredIcon />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 w-1/2">
                                                        <div onClick={() => handleDropdownToggle(index)} className="flex flex-col items-start cursor-pointer">
                                                            <span className="rotate-90">•••</span>
                                                        </div>
                                                        {(showDropdownPopup === index) && (
                                                            <Dropdown ref={dropdownPopupRef} showDropdownPopup={showDropdownPopup} setDropdownPopup={setDropdownPopup} />
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody></>)}

                            </table>) : (
                                /* Grid */
                                < div className='pb-10 cursor-default'>
                                    {filteredFiles.length === 0 &&
                                        <span className='flex items-center justify-center pt-40'>
                                            <p className='text-primary-heading text-[22px] font-semibold'>No matching results
                                                <span className='flex flex-col items-center text-primary-para text-sm mt-2'>
                                                    Try another search</span></p>
                                        </span>
                                    }
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
                                                <span className="flex flex-row items-center space-x-1 text-primary-heading font-semibold">
                                                    Name <UpIcon />
                                                </span>
                                            </span>

                                        </button>
                                    </div>



                                    <div className=' grid grid-cols-3 gap-x-3 gap-y-6 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 xl:grid-cols-4'>
                                        {filteredFiles.map((file, index) => (
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
                                                        <div><button onClick={() => setSharePopup(!showSharePopup)} className="bg-buttonPrimary rounded-lg px-5 py-2 text-white">Share</button></div>
                                                        <div><CopyIcon /></div>
                                                        <div className="rotate-90 cursor-pointer">•••</div>
                                                    </div>
                                                    <div onClick={() => handleDropdownToggle(index)} className="absolute left-64 ml-3 mt-8">{(showDropdownPopup === index) && (
                                                        <Dropdown ref={dropdownPopupRef} showDropdownPopup={showDropdownPopup} setDropdownPopup={setDropdownPopup} />
                                                    )}
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

                    </>
                }
            </div >
            {showDeletePopup &&
                <Delete showDeletePopup={showDeletePopup} setDeletePopup={setDeletePopup} ref={deletePopupRef} />
            }

            {/* share popup */}
            {showSharePopup && <Share ref={sharePopupRef} setSharePopup={setSharePopup} showSharePopup={showSharePopup} />}

        </SideMenu >

    )
}

export default SearchResult
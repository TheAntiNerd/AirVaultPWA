import React, { useEffect, useRef, useState } from 'react';
import { AccountIcon, AudioIcon, BackbuttonIcon, BlueTickIcon, CustomIcon, DeleteIcon, DocumentIcon, DownArrow, EditPencilIcon, ExcelIcon, FormIcon, ImageIcon, LogoutIcon, MenuCloseIcon, OtherTypeIcon, PdfIcon, PptIcon, RecentSearch2Icon, RecentSearchIcon, SearchIcon, SettingIcon, VideoIcon, ZipIcon } from '../../../assets';
import { useNavigate } from 'react-router';
import Profile from '../modals/popup/Profile';


interface File {
    name: string;
    size: string;
    type: string;
    modified: string;
}

interface NavbarProps {
    files: File[];
    gridView: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ files, gridView }) => {
    const [query, setQuery] = useState<string>('');
    const [filteredFiles, setFilteredFiles] = useState<File[]>(files);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedModified, setSelectedModified] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenModified, setOpenModified] = useState<boolean>(false);
    const [showLogDropdown, setLogDropdown] = useState<boolean>(false);
    const [showLogPopup, setLogPopup] = useState<boolean>(false);
    const [showProfilePopup, setProfilePopup] = useState<boolean>(false);
    const [storageUsed, setStorageUsed] = useState(0);
    const [storageTotal, setStorageTotal] = useState(100);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate()

    const typeDropdownRef = useRef<HTMLDivElement>(null);
    const modifiedDropdownRef = useRef<HTMLDivElement>(null);
    const LogDropdownRef = useRef<HTMLDivElement>(null);
    const LogPopupRef = useRef<HTMLDivElement>(null);
    const profilePopupRef = useRef<HTMLDivElement>(null);

    const fileTypes = ['Folder', 'Document', 'Spreadsheet', 'Presentation', 'Form', 'PDF', 'Video', 'Image', 'Audio', 'Archive', 'Other',];
    const modifiedOptions = ['Today', 'Last Week', 'Last month', '3 months', '6 months', 'Last year', 'Before last year'];


    const fileTypeImages: Record<string, JSX.Element> = {
        Document: <DocumentIcon />,
        Folder: <CustomIcon />,
        Spreadsheet: <ExcelIcon />,
        Form: <FormIcon />,
        PDF: <PdfIcon />,
        Video: <VideoIcon />,
        Image: <ImageIcon />,
        Audio: <AudioIcon />,
        Archive: <ZipIcon />,
        Presentation: <PptIcon />,
        Other: <OtherTypeIcon />
    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        filterFiles(value, selectedType, selectedModified);
    };

    useEffect(() => {
        const fetchStorageData = async () => {
            try {
                /*  const response = await fetch('/api/storage'); 
                 const data = await response.json(); */
                const dummyData = {
                    used: 30,
                    total: 100,
                };

                setStorageUsed(dummyData.used);
                setStorageTotal(dummyData.total);

                // Calculate progress percentage
                const percentage = (dummyData.used / dummyData.total) * 100;
                setProgress(percentage);
            } catch (error) {
                console.error('Failed to fetch storage data:', error);
            }
        };

        fetchStorageData();
    }, []);

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
        setIsOpen(false);
        filterFiles(query, type, selectedModified);
    };


    const handleModifiedChange = (option: string) => {
        setSelectedModified(option);
        setOpenModified(false)
        filterFiles(query, selectedType, option);
    };

    const handleAccount = () => {
        navigate('/account')
    }

    const filterFiles = (query: string, type: string, modified: string) => {
        let results = files;

        if (query) {
            results = results.filter((file) =>
                file.name.toLowerCase().includes(query)
            );
        }

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

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="font-medum text-primary-heading">
                    <strong>{part}  </strong>
                </span>
            ) : (
                part
            )
        );
    };

    const handleShowMore = () => {
        setShowAll(false);
        navigate('/search', {
            state: { selectedType, selectedModified, gridView }
        })
        console.log(selectedModified, selectedModified, gridView)
    }


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
            if (LogDropdownRef.current && !LogDropdownRef.current.contains(event.target as Node)) {
                setLogDropdown(false);
            }
            if (LogPopupRef.current && !LogPopupRef.current.contains(event.target as Node)) {
                setLogPopup(false);
            }

        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isOpenModified, showLogDropdown])

    return (
        <div className=" flex items-center justify-between md:px-9 md:pt-3 text-primary-para max-sm:py-4">
            <div className="max-sm:w-full ">
                <div className="">
                    <div className="relative flex items-center">
                        <span className="absolute left-2 text-[#9AA1B7]">
                            <SearchIcon />
                        </span>
                        <div className='w-[440px] max-sm:w-full' onClick={() => setShowFilter(true)}>
                            <input
                                type="text"
                                className={`border border-border rounded-md w-full pl-10 py-2 focus:outline-none 
                                ${(query || showFilter) ? 'rounded-b-none border-b-0 max-sm:border-b max-sm:rounded-b-md' : ''} `}
                                placeholder="Search files"
                                value={query}
                                onChange={handleSearch}
                            />
                        </div>
                        {(query || showFilter) && <button className="absolute right-2  text-[#9AA1B7]" onClick={() => {
                            setShowFilter(false);
                            setQuery('');
                        }}
                        >
                            <MenuCloseIcon />
                        </button>}
                    </div>
                    {(query || showFilter) && (
                        <div className='max-sm:hidden absolute  max-sm:w-[328px] sm:w-[440px] bg-white shadow-md border border-t-0 border-border rounded-b-md z-10'>
                            <div className='flex flex-row px-3 space-x-4'>
                                <div className="mt-2 relative " ref={typeDropdownRef}>
                                    {/* Custom Trigger */}
                                    <div
                                        className={` border border-border rounded-md px-2 mx-1 py-1 bg-white flex items-center justify-between cursor-pointer
                                            ${selectedType ? 'bg-[#d0e7fb] border-none' : ''}`}
                                        onClick={() => {
                                            setIsOpen(!isOpen)
                                            setOpenModified(false)
                                        }}
                                    >
                                        <div className={`flex items-center gap-2 text-primary-searchFilter`}>
                                            {selectedType ? fileTypeImages[selectedType] : null}
                                            <span>{selectedType || 'Types'}</span>
                                        </div>
                                        <div className="flex items-center pointer-events-none mx-1.5">
                                            <DownArrow />
                                        </div>
                                        {selectedType && (
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
                                            className="absolute ml-1 w-[160px] bg-white border rounded-md shadow-md z-10">
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

                                <div className="relative mt-2 " ref={modifiedDropdownRef}>
                                    {/* Custom Dropdown Trigger */}
                                    <div
                                        className={`appearance-none border border-border rounded-lg px-2 py-1 cursor-pointer focus:outline-none flex items-center justify-between
                                             ${selectedModified ? 'bg-[#d0e7fb] border-none' : ''}`}
                                        onClick={() => {
                                            setOpenModified(!isOpenModified)
                                            setIsOpen(false)
                                        }}
                                    >
                                        <span className='pr-2 text-primary-searchFilter'>{selectedModified || 'Modified'}</span>
                                        <div className="flex items-center space-x-1">
                                            <DownArrow />
                                            {selectedModified && (
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
                                        <div className="absolute  w-[160px]  bg-white border rounded-lg shadow-md z-10 ">
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
                            <div className="flex flex-col mt-4">
                                {query || selectedType || selectedModified ? (
                                    <ul className="bg-white shadow-md rounded-md px-2">
                                        {(showAll ? filteredFiles : filteredFiles.slice(0, 3)).map((file, index) => (
                                            <li
                                                key={index}
                                                className="px-2 pb-2 last:border-none"
                                            >
                                                <span className='flex flex-row items-center px-1'>{fileTypeImages[file.type]}
                                                    <p className="px-2 cursor-pointer">
                                                        {highlightMatch(file.name, query)}
                                                    </p>
                                                </span>
                                            </li>
                                        ))}
                                        {filteredFiles.length === 0 &&
                                            <p className='px-4 mb-6'>No items match your search.</p>}

                                        {!showAll && filteredFiles.length > 3 && (
                                            <button
                                                onClick={() => handleShowMore()}
                                                className="text-primary-heading font-medium mt-2 px-3 w-full hover:underline mb-5 text-left"
                                            >
                                                <strong>Show all results</strong>
                                            </button>
                                        )}
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* mobile search  */}
            {(query || showFilter) && (
                <div className="hidden max-sm:fixed max-sm:inset-0 max-sm:top-0 max-sm:left-0 max-sm:block bg-white z-40">
                    <div className="relative flex items-center w-full my-5 mx-2">
                        <span onClick={() => setShowFilter(false)} className="absolute left-2 text-[#9AA1B7] cursor-pointer">
                            <BackbuttonIcon />
                        </span>
                        <div className=" max-sm:w-full mx-auto" onClick={() => setShowFilter(true)}>
                            <input
                                type="text"
                                className={` rounded-md  pl-10 py-2 focus:outline-none truncate w-[300px]
                      ${(query || showFilter) ? '' : ''} `}
                                placeholder="Search files"
                                value={query}
                                onChange={handleSearch}
                            />
                        </div>
                        {(query) && (
                            <button
                                className="absolute right-8 text-[#9AA1B7]"
                                onClick={() => {

                                    setQuery('');
                                }}
                            >
                                <MenuCloseIcon />
                            </button>
                        )}
                    </div>
                    <div className='border-b border-border/80 ' />
                    {/* filter buttons */}
                    <div className='flex flex-row'>
                        <div className="mt-4 relative " ref={typeDropdownRef}>
                            {/* Custom Trigger */}
                            <div
                                className={` border border-border rounded-md px-2 mx-4 py-1 flex items-center justify-between cursor-pointer
                                            ${selectedType ? 'bg-selected border-none' : ''}`}
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    setOpenModified(false)
                                }}
                            >
                                <div className={`flex items-center gap-2 text-primary-searchFilter`}>
                                    {selectedType ? fileTypeImages[selectedType] : null}
                                    <span>{selectedType || 'Types'}</span>
                                </div>
                                <div className="flex items-center pointer-events-none mx-1.5">
                                    <DownArrow />
                                </div>
                                {selectedType && (
                                    <button
                                        className=""
                                        onClick={() => setSelectedType('')}
                                    >
                                        <MenuCloseIcon />
                                    </button>
                                )}
                            </div>
                            {isOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black opacity-50 z-10"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                    </div>
                                    <div
                                        className="fixed w-full bottom-0 bg-white border rounded-t-2xl shadow-md z-10">
                                        <div className='mt-6'>
                                            <h2 className='font-medium text-[22px] text-primary-heading mb-6 flex justify-between items-center mx-4'>Type <span onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'><MenuCloseIcon /></span></h2>
                                            {fileTypes.map((type) => (
                                                <div
                                                    key={type}
                                                    className={`px-2 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-hover hover:rounded-md ${selectedType === type ? 'bg-selected' : ''
                                                        }`}
                                                    onClick={() => handleTypeChange(type)}
                                                >
                                                    <span className='flex flex-row gap-x-2'>
                                                        {selectedType === type ? <BlueTickIcon /> : <span className='opacity-0'><BlueTickIcon /></span>}
                                                        <span className='flex flex-row items-center gap-x-2'>
                                                            {fileTypeImages[type]}
                                                            <span className='pl-1'>{type}</span>
                                                        </span>

                                                    </span>

                                                </div>
                                            ))}
                                            <div className='mt-4' />
                                        </div>
                                    </div>
                                </>

                            )}
                        </div>

                        <div className=" mt-4 relative" ref={modifiedDropdownRef}>
                            {/* Custom Dropdown Trigger */}
                            <div
                                className={`appearance-none border border-border rounded-lg px-2 py-1 cursor-pointer focus:outline-none flex items-center justify-between
                                             ${selectedModified ? 'bg-selected border-none' : ''}`}
                                onClick={() => {
                                    setOpenModified(!isOpenModified)
                                    setIsOpen(false)
                                }}
                            >
                                <span className='pr-2 text-primary-searchFilter'>{selectedModified || 'Modified'}</span>
                                <div className="flex items-center space-x-1">
                                    <DownArrow />
                                    {selectedModified && (
                                        <button
                                            className=""
                                            onClick={() => setSelectedModified('')}
                                        >
                                            <MenuCloseIcon />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {isOpenModified && (
                                <>
                                    <div
                                        className="fixed inset-0 bg-black opacity-50 z-10"
                                        onClick={() => setOpenModified(!isOpenModified)}
                                    >
                                    </div>

                                    <div className="fixed w-full inset-x-0 bottom-0 bg-white border rounded-t-2xl shadow-md z-20">
                                        <h2 className='font-medium text-[22px] text-primary-heading my-6 flex justify-between items-center mx-4'>Modified <span onClick={() => setOpenModified(!isOpenModified)} className='cursor-pointer'><MenuCloseIcon /></span></h2>
                                        {modifiedOptions.map((option) => (
                                            <div
                                                key={option}
                                                className={`px-2 py-1.5 flex items-center gap-2 cursor-pointer group hover:bg-hover hover:rounded-md ${selectedModified === option ? 'bg-selected' : ''
                                                    }`}
                                                onClick={() => handleModifiedChange(option)}
                                            >
                                                <span className='flex flex-row items-center'>
                                                    {selectedModified === option ? <BlueTickIcon /> : <span className='opacity-0'><BlueTickIcon /></span>}
                                                    <span className='pl-2'>
                                                        {option}
                                                    </span>
                                                </span>
                                            </div>
                                        ))}
                                        <div className='mb-6' />
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                    <div className="flex flex-col mt-4">
                        {query || selectedType || selectedModified ? (
                            <ul className="bg-white rounded-md px-2">
                                {filteredFiles.map((file, index) => (
                                    <li
                                        key={index}
                                        className="px-2 pb-2 last:border-none"
                                    >
                                        <span className='flex flex-row items-center px-1 gap-x-2'>{fileTypeImages[file.type]}
                                            <p className="px-2 py-1 cursor-pointer truncate w-[300px]">
                                                {highlightMatch(file.name, query)}
                                                <span className='flex flex-col text-xs'>{file.size}</span>
                                            </p>
                                        </span>
                                    </li>
                                ))}
                                {filteredFiles.length === 0 &&
                                    <p className='px-4 mb-6'>No items match your search.</p>}


                            </ul>
                        ) : <>
                            <div className='mx-4'>
                                <h2 className=' text-primary-heading font-medium text-[22px] mb-2'><strong>Recent searches</strong></h2>
                                <div className='flex justify-between items-center text-sm text-primary-para py-2'>
                                    <span className='flex flex-row items-center gap-x-2'> <RecentSearchIcon /> <span>Image2</span></span> <RecentSearch2Icon />
                                </div>
                                <div className='flex justify-between items-center text-sm text-primary-para py-2'>
                                    <span className='flex flex-row items-center gap-x-2'> <RecentSearchIcon /> <span>Image2</span></span> <RecentSearch2Icon />
                                </div>
                            </div>
                        </>}
                    </div>

                </div >

            )}



            {/* account btn */}
            <div className={`relative z-10 max-sm:z-20 ${(showFilter || query) ? 'max-sm:hidden' : 'max-sm:absolute max-sm:right-2'}`}>
                <button onClick={() => setLogDropdown(!showLogDropdown)} className="bg-[#FAD24B] w-[26px] h-[26px] rounded-full flex items-center justify-center">
                    <span className="text-center text-sm leading-none">RP</span>
                </button>
                {showLogDropdown && (
                    <div ref={LogDropdownRef} className="absolute max-sm:fixed max-sm:top-0 max-sm:left-0 and max-sm:right-0 max-sm:w-full max-sm:min-h-screen max-sm:mt-0 mt-2 -left-44 bg-white shadow-lg rounded-lg w-52 text-primary-para">
                        <div className='flex flex-col'>
                            <div onClick={() => setLogDropdown(!showLogDropdown)} className='hidden max-sm:flex px-4 mt-4'>
                                <BackbuttonIcon />
                            </div>
                            <div className='flex flex-row items-center mx-2 max-sm:mx-0 cursor-pointer py-2 max-sm:mt-7 max-sm:px-4'>
                                <button className="bg-[#FFB2D1] size-10 relative px-1.5 py-1 rounded-full flex items-center justify-center">
                                    <span onClick={() => setProfilePopup(!showProfilePopup)} className='absolute left-6 top-6 max-sm:top-22 bg-gray-50 rounded-full shadow-lg'><EditPencilIcon /></span>
                                    <span className="text-sm font-medium text-center"><strong>RP</strong></span>
                                </button>

                                <span className='text-sm ml-3 leading-3'>
                                    <p className='font-medium text-primary-heading pb-px max-w-36 truncate max-sm:mb-px'><strong>Repo Oper</strong></p>
                                    <p className='text-primary-searchFilter pt-px text-xs max-w-36 truncate max-sm:mt-1'>reporepo@repo.com</p>
                                </span>
                            </div>
                            <div className='w-full max-sm:hidden border-t' />
                            <button onClick={handleAccount}
                                className="px-4 py-2 max-sm:mt-5 max-sm:mb-1 w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2"
                            ><AccountIcon />
                                Accounts
                            </button>
                            <button
                                className="px-4  py-2 w-full max-sm:mb-1 text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2"
                            ><SettingIcon />
                                Settings
                            </button>
                            <button onClick={() => navigate('/deleted')}
                                className="px-4 hidden   py-2 w-full max-sm:mb-1 text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2"
                            ><DeleteIcon />
                                Deleted files
                            </button>
                            <button onClick={() => { setLogPopup(!showLogPopup) }}
                                className="px-4  py-2 max-sm:mb-5 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:text-[#DB3D3D]"
                            ><LogoutIcon />
                                Log out
                            </button>

                            <div className="mt-4 px-[18px] hidden max-sm:block">
                                <h4 className="text-primary-heading font-medium mb-3"><strong>Storage</strong></h4>
                                <div className="w-full bg-[#D3DBE0] rounded h-[7px]">
                                    <div
                                        className="bg-gradient-to-r from-[#46BFFB] to-[#298DFF] h-[7px] rounded"
                                        style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
                                    />
                                </div>


                                <p className="text-primary-para mt-2 text-sm">
                                    {storageTotal - storageUsed} GB left
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            {
                showLogPopup &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div ref={LogPopupRef} className="bg-white p-5 rounded-lg shadow-lg w-80 relative max-sm:w-full max-sm:mx-4">
                        <div className="px-1 text-primary-heading font-medium text-[22px]">
                            <h2><strong>Logout?</strong></h2>
                        </div>
                        <div className="flex flex-row items-center space-x-3 mt-6 ">
                            <button onClick={() => { setLogPopup(!showLogPopup) }} className="flex flex-grow items-center justify-center text-primary-para">
                                Cancel
                            </button>
                            <button
                                onClick={() => { }}
                                className=" flex flex-grow px-1 py-1.5 bg-blue-500 text-white rounded-lg justify-center"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            }
            {showProfilePopup && <Profile ref={profilePopupRef} showProfilePopup={showProfilePopup} setProfilePopup={setProfilePopup} />}
        </div >

    );
};

export default Navbar;

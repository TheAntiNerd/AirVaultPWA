
import { useState } from 'react';
import { DownArrow, GridIcon, MenuCloseIcon } from '../../../assets';
import SideMenu from '../../SideMenu'
import Navbar from '../navbar'
import { useLocation } from 'react-router';

interface File {
    name: string;
    size: string;
    type: string;
    modified: string;
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



    const fileTypes = ['PDF', 'Excel', 'Image', 'Folder '];
    const modifiedOptions = ['1 Day', '1 Week', '3 Months'];

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setSelectedType(type);
        filterFiles(type, selectModified);
    };

    const handleModifiedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const modified = e.target.value;
        setSelectedModified(modified);
        filterFiles(selectType, modified);
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
                    case '1 Day':
                        return now.getTime() - fileDate.getTime() <= 1 * 24 * 60 * 60 * 1000;
                    case '1 Week':
                        return now.getTime() - fileDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
                    case '3 Months':
                        return now.getTime() - fileDate.getTime() <= 90 * 24 * 60 * 60 * 1000;
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
    return (
        <SideMenu>
            <Navbar files={files} gridView={gridView} />
            <div className="px-9 pt-6 text-sm ">
                <div className="pb-4 flex justify-between items-center">
                    {/* Title */}
                    <h1 className="text-[22px] font-semibold">Search Results</h1>
                </div>

                {/* buttons */}
                <div className='flex items-center justify-between'>
                    {selectedRow.length === 0 ?
                        (<div className='flex flex-row space-x-6'>
                            <div className='flex flex-row space-x-5'>
                                <div className="mt-2 relative">
                                    <select
                                        className="appearance-none border border-[#C4C7E3] rounded-md px-2 py-1 pr-10 w-full text-[#4A4A4A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectType}
                                        onChange={handleTypeChange}
                                    >
                                        <option value="">Types</option>
                                        {fileTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute top-1 right-2 flex items-center pointer-events-none">
                                        <DownArrow />
                                    </div>
                                    {(selectType) && <button className="absolute right-2 text-[#9AA1B7]" onClick={() => {
                                        setSelectedType("");
                                    }}
                                    >
                                        <MenuCloseIcon />
                                    </button>}
                                </div>

                                {/* Modify button */}
                                <div className="relative mt-2">
                                    <select
                                        className="appearance-none border border-[#C4C7E3] rounded-md px-2 py-1 pr-10 w-full text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectModified}
                                        onChange={handleModifiedChange}
                                    >
                                        <option value="">Modified</option>
                                        {modifiedOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute top-1 right-2 flex items-center pointer-events-none">
                                        <DownArrow />
                                    </div>
                                    {(selectModified) && <button className="absolute right-0 text-[#9AA1B7]" onClick={() => {
                                        setSelectedModified("");
                                    }}
                                    >
                                        <MenuCloseIcon />
                                    </button>}
                                </div>
                            </div>
                            <div onClick={() => {
                                setSelectedModified(''),
                                    setSelectedType('')
                            }}
                                className='flex justify-center items-center cursor-pointer'>
                                <p className='text-center pt-2 font-medium'>Clear filters</p>
                            </div>
                        </div>) : (<div className="text-center text-sm flex justify-between items-center">
                            <div className={`flex gap-3  `}>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Share</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Copy link</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Download</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Move</button>
                                <button className="bg-gray-500 rounded-lg px-4 py-2">Delete</button>
                                <button className="rotate-90">• • •</button>
                            </div>

                        </div>
                        )}
                    <div className="flex gap-3 items-center justify-center">
                        {selectedRow.length > 0 && <h2 className="font-medium text-center">{selectedRow.length} selected</h2>}
                        {/* Work on this */}
                        {(selectType || selectModified) && <h2 className="font-medium text-center">{selectType.length} match</h2>}
                        <div onClick={() => setGridView(false)} className="flex items-center justify-center flex-col">
                            <button className="mb-px">
                                <GridIcon /> {/* Grid view */}
                            </button>
                            <div className={`pt-[2px] ${!gridViews ? 'border-t-2 w-6 border-black ' : ""}`} />
                        </div>
                        <div onClick={() => setGridView(true)} className="flex items-center justify-center flex-col" >
                            <button className="mb-px">
                                <GridIcon /> {/* Grid view */}
                            </button>
                            <div className={`pt-[2px] ${gridViews ? 'border-t-2 w-6 border-black ' : ""}`} />
                        </div>
                    </div>
                </div>

                {/* table */}
                <div className=" mt-6">
                    {!gridViews ? (

                        filteredFiles.length == 0 ?
                            (
                                <div className=" flex items-center justify-center pt-40">
                                    <div className="flex flex-col space-y-4 text-center">
                                        <h2 className="font-medium text-[22px]">No matching results</h2>
                                        <p>Try another search</p>
                                    </div>
                                </div>
                            ) :
                            (
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
                                        {filteredFiles.map((file, index) => (
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
                            )
                    ) : (
                        <div className='pb-10'>
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

                            <div className='grid grid-cols-3 gap-x-3 gap-y-6 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 xl:grid-cols-4'>
                                {filteredFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className={`h-[212px] w-[250px] rounded-lg bg-zinc-500 ${selectedRow.includes(index) ? '' : 'group'}`}
                                        onClick={() => handleRowClick(index)}
                                    >
                                        <div className='bg-white relative rounded-md m-2.5 h-[140px] flex'>
                                            <img src="logo.svg" alt={file.name} className='object-contain h-full w-full' />
                                            {/* Checkboxes */}
                                            <div className="absolute top-0 left-5">
                                                <span className="absolute top-1">
                                                    {isCheckboxVisible && (
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedRow.includes(index)}
                                                            onChange={() => handleRowClick(index)}
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
                                        {/* Details Container */}
                                        <div className='px-4 pt-px'>
                                            <div className='flex items-center justify-between space-x-2'>
                                                {/* File Info */}
                                                <div className='flex items-center justify-center space-x-2'>
                                                    <GridIcon />
                                                    <div>
                                                        <h3 className="font-semibold">{file.name}</h3>
                                                        <div className='text-xs flex flex-row pt-px space-x-2'>
                                                            <p>{file.type}</p>
                                                            <p>● {file.size}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Action Icon */}
                                                <div className='flex items-end justify-center cursor-pointer'>
                                                    <GridIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </SideMenu >

    )
}

export default SearchResult
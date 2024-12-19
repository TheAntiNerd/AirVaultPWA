import React, { useState } from 'react';
import { DownArrow, MenuCloseIcon, SearchIcon } from '../../../assets';
import { useNavigate } from 'react-router';

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
    const navigate = useNavigate()

    const fileTypes = ['PDF', 'Excel', 'Image', 'Folder '];
    const modifiedOptions = ['1 Day', '1 Week', '3 Months'];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        filterFiles(value, selectedType, selectedModified);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setSelectedType(type);
        filterFiles(query, type, selectedModified);
    };

    const handleModifiedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const modified = e.target.value;
        setSelectedModified(modified);
        filterFiles(query, selectedType, modified);
    };

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

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="font-bold text-blue-600">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const handleShowMore = () => {
        setShowAll(false);
        navigate('/search-result', {
            state: { selectedType, selectedModified, gridView }
        })

    }


    return (
        <div className=" flex items-center justify-between px-9 pt-3">
            <div className="">
                <div className="w-[440px]">
                    <div className="relative flex items-center">
                        <span className="absolute left-2 text-[#9AA1B7]">
                            <SearchIcon />
                        </span>
                        <div className='w-[440px]' onClick={() => setShowFilter(true)}>
                            <input
                                type="text"
                                className={`border border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none 
                                ${(query || showFilter) ? 'rounded-b-none border-b-0' : ''} `}
                                placeholder="Search files"
                                value={query}
                                onChange={handleSearch}
                            />
                        </div>
                        {(query || showFilter) && <button className="absolute right-2 text-[#9AA1B7]" onClick={() => {
                            setShowFilter(false);
                            setQuery('');
                        }}
                        >
                            <MenuCloseIcon />
                        </button>}

                    </div>
                    {(query || showFilter) && (
                        <div className='absolute w-[440px] bg-white shadow-md border border-t-0 border-[#C4C7E3] rounded-b-md z-10'>
                            <div className='flex flex-row px-3 space-x-4'>
                                <div className="mt-2 relative">
                                    <select
                                        className="appearance-none border border-[#C4C7E3] rounded-md px-2 py-1 pr-10 w-full text-[#4A4A4A] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectedType}
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
                                    {(selectedType) && <button className="absolute right-2 text-[#9AA1B7]" onClick={() => {
                                        setSelectedType("");
                                    }}
                                    >
                                        <MenuCloseIcon />
                                    </button>}
                                </div>

                                <div className="relative mt-2">
                                    <select
                                        className="appearance-none border border-[#C4C7E3] rounded-md px-2 py-1 pr-10 w-full text-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectedModified}
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
                                    {(selectedModified) && <button className="absolute right-0 text-[#9AA1B7]" onClick={() => {
                                        setSelectedModified("");
                                    }}
                                    >
                                        <MenuCloseIcon />
                                    </button>}
                                </div>
                            </div>



                            <div className="flex flex-col mt-4">
                                {query || selectedType || selectedModified ? (
                                    <ul className="bg-white shadow-md rounded-md">
                                        {(showAll ? filteredFiles : filteredFiles.slice(0, 3)).map((file, index) => (
                                            <li
                                                key={index}
                                                className="p-2 last:border-none"
                                            >
                                                <p className="px-2 font-semibold">
                                                    {highlightMatch(file.name, query)}
                                                </p>

                                            </li>
                                        ))}

                                        {filteredFiles.length === 0 &&
                                            <p className='px-3 mb-5'>No items match your search.</p>}

                                        {!showAll && filteredFiles.length > 3 && (
                                            <button
                                                onClick={() => handleShowMore()}
                                                className="text-black font-medium mt-2 px-3 w-full hover:underline mb-5 text-left"
                                            >
                                                Show all results
                                            </button>
                                        )}

                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button className="bg-red-400 px-1.5 py-1 rounded-[10px] flex items-center justify-center">
                    <span className="text-center">RP</span>
                </button>
            </div>

        </div>

    );
};

export default Navbar;

import React, { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { FileUpload, FolderUpload, NewFolderIcon, UploadIcon } from '../../../../assets';

interface ButtonProps {
    setFiles: React.Dispatch<SetStateAction<{ name: string; size: string; type: string; modified: string }[]>>;
    ref?: RefObject<HTMLInputElement>;
}

const Buttons = ({ setFiles }: ButtonProps) => {
    const [newFolderName, setNewFolderName] = useState<string>('New folder');
    const [isFolderInputVisible, setIsFolderInputVisible] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState(false);


    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalUploadRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsFolderInputVisible(false);
            }
            if (modalUploadRef.current && !modalUploadRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (
            isFolderInputVisible ||
            showDropdown
        ) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isFolderInputVisible, showDropdown,]);

    const maxLength = 63;
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

    return (
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
                    {...{ webkitdirectory: "true" }}
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
    )
}

export default Buttons
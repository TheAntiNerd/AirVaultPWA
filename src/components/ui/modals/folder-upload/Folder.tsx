import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { NewFolderIcon } from '../../../../assets';

interface ButtonProps {
    setFiles: React.Dispatch<SetStateAction<{ name: string; size: string; type: string; modified: string }[]>>;
    showPopup?: boolean
}

const Folder = ({ setFiles, showPopup = false }: ButtonProps) => {
    const [newFolderName, setNewFolderName] = useState<string>('New folder');
    const [isFolderInputVisible, setIsFolderInputVisible] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showPopup) {
            setIsFolderInputVisible(true);
        }
    }, [showPopup]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsFolderInputVisible(false);
            }
        };

        if (isFolderInputVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        isFolderInputVisible]);

    const maxLength = 63;

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
        <>
            <div>
                {!showPopup && <button
                    onClick={() => setIsFolderInputVisible(true)}
                    className="px-4 py-2 bg-white rounded-lg hover:bg-hover transition border-border border"
                >
                    <span className="flex flex-row gap-2 items-center justify-between">
                        <NewFolderIcon />
                        <span className="pr-10 font-semibold text-primary-para flex items-center justify-center">
                            New folder
                        </span>
                    </span>
                </button>
                }


                <>
                    {(isFolderInputVisible) && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div ref={modalRef} className="bg-white p-5 rounded-lg shadow-lg w-80 relative max-sm:w-full max-sm:mx-4">
                                <div className="px-1 text-primary-heading font-semibold text-[22px]">
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
                                    <button onClick={() => { setIsFolderInputVisible(false) }} className="flex flex-grow items-center justify-center text-primary-para">
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
                    )}</>

            </div></>

    )
}

export default Folder
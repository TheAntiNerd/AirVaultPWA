import React, { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { CameraIcon, FileUpload, FolderUpload, NewFolderIcon, ScanIcon, UploadIcon } from '../../../../assets';
import Folder from './Folder';

interface ButtonProps {
    setFiles: React.Dispatch<SetStateAction<{ name: string; size: string; type: string; modified: string }[]>>;
    ref?: RefObject<HTMLInputElement>;
    showUpload: Boolean;
}

const Buttons = ({ setFiles, showUpload }: ButtonProps) => {
    const [showFolder, setShowFolder] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(false);

    const modalUploadRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const folderInputRef = useRef<HTMLInputElement>(null);
    const mobileRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (modalUploadRef.current && !modalUploadRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
            if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
                setMobileDropdown(false);
            }
        };

        if (

            showDropdown || mobileDropdown
        ) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        showDropdown, mobileDropdown]);


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

    return (
        <>
            <div className="flex gap-5">
                {/* upload btn */}
                {showUpload && <div>
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
                        className="px-4 py-2 bg-buttonPrimary hover:bg-[#509FFA] rounded-lg transition max-sm:hidden"
                    >
                        <span className="flex items-center justify-between gap-2">
                            <UploadIcon />
                            <span className="pr-12 font-semibold text-white flex justify-center items-center">
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
                </div>}
                {/* add folder */}
                <div className='max-sm:hidden'>
                    <Folder setFiles={setFiles} />
                </div>

            </div>

            {/* mobile  */}
            <div onClick={() => setMobileDropdown(!mobileDropdown)} className='hidden max-sm:flex fixed bottom-24 right-4 z-30 cursor-pointer'>
                <div className='bg-buttonPrimary rounded-full size-12 mb-2 flex items-center justify-center'>
                    <span className='text-white text-[28px]'>+</span>
                </div>
            </div>
            {mobileDropdown &&
                <div className='hidden max-sm:flex fixed inset-x-0 inset-y-0 items-center justify-center bg-black/50 z-40 text-primary-para'>
                    <div ref={mobileRef} className='w-full fixed bottom-0 bg-white rounded-t-xl flex flex-col'>
                        <h2 className='font-semibold text-[22px] text-primary-heading mt-6 pb-3 px-4 cursor-default'>
                            Add to AirVault
                        </h2>
                        <div onClick={handleUploadFile} className='py-4 hover:bg-[#D6ECFF]  cursor-pointer'>
                            <span className='px-4 flex flex-row gap-x-4 items-center '><FileUpload /> Upload file</span>
                        </div>
                        <div onClick={handleUploadFolder} className=' py-4 hover:bg-[#D6ECFF] cursor-pointer'>
                            <span className='px-4 flex flex-row items-center gap-x-4'><FolderUpload /> Upload folder</span>
                        </div>
                        <div className=' py-4 hover:bg-[#D6ECFF] cursor-pointer'>
                            <span className='px-4 flex flex-row items-center gap-x-4'><CameraIcon /> Scan file</span>
                        </div>
                        <div className=' py-4 hover:bg-[#D6ECFF] cursor-pointer'>
                            <span className='px-4 flex flex-row items-center gap-x-4'><ScanIcon /> Take a photo</span>
                        </div>
                        <div className='border border-border/50' />
                        <div onClick={() => {
                            setShowFolder(!showFolder)

                        }} className=' py-4 mb-10 hover:bg-[#D6ECFF] cursor-pointer'>
                            <span className='px-4 flex flex-row items-center gap-x-4'><NewFolderIcon /> Create new folder</span>
                        </div>
                    </div>
                </div >
            }
            {showFolder &&
                <Folder setFiles={setFiles} showPopup={true} />}
        </>

    )
}

export default Buttons
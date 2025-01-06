import { ForwardedRef, useEffect, useRef, useState } from 'react';
import { AudioIcon, BackbuttonIcon, CustomIcon, DocumentIcon, DownArrow, ExcelIcon, FormIcon, ImageIcon, MoveIcon, OtherTypeIcon, PdfIcon, PptIcon, VideoIcon, ZipIcon } from '../../../../assets';
import Folder from '../folder-upload/Folder';



interface MoveProps {
    ref: ForwardedRef<HTMLDivElement>
    showMovePopup: boolean;
    setMovePopup: (state: boolean) => void
    selectedFiles: { name: string; size: string; type: string; modified: string }[]
}
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
const Move = ({ showMovePopup, setMovePopup, selectedFiles }: MoveProps) => {
    const [files, setFiles] = useState([
        { name: 'File 4', size: '2 MB', type: 'PDF', modified: '2024-12-20' },
        { name: 'File 2', size: '5 MB', type: 'Image', modified: '2024-12-16' },
        { name: 'File 3', size: '1 MB', type: 'Audio', modified: '2024-12-15' },
        { name: 'File 4', size: '1 MB', type: 'Video', modified: '2024-12-15' },
        { name: 'File 5', size: '1 MB', type: 'Document', modified: '2024-12-15' },
    ]);
    const [path, setPath] = useState(["myfiles"]);


    const movePopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (movePopupRef.current && !movePopupRef.current.contains(event.target as Node)) {
                setMovePopup(false);
            }

        };
        if (showMovePopup) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showMovePopup]);

    const goBack = () => {
        if (path.length > 1) {
            // Remove the last folder in the path
            setPath(path.slice(0, -1));
        }
    };

    return (
        <div className="fixed inset-0 flex sm:items-center justify-center bg-black bg-opacity-50 z-50 ">
            <div ref={movePopupRef} className={`bg-white sm:p-6 max-sm:pb-6 max-sm:pt-4  sm:rounded-xl shadow-lg w-[428px] max-sm:w-full relative `}>
                <span className='sm:-ml-2 flex sm:flex-row items-center sm:space-x-2 max-sm:justify-between max-sm:px-2 mb-4'>
                    <span onClick={() => setMovePopup(!showMovePopup)}
                        className='max-sm:order-1 sm:order-1 cursor-pointer sm:hidden bg-transparent max-sm:px-2 py-2 rounded-full active:bg-pressed/40 active:scale-95 transition-all duration-900'>
                        <BackbuttonIcon />
                    </span>
                    <h1 className='max-sm:order-2 sm:order-2 font-semibold text-[22px] text-primary-heading flex flex-row items-center gap-x-2 truncate'>
                        Move {selectedFiles.length} item
                    </h1>
                    <span className='max-sm:order-3 max-sm:ml-auto'>
                        <MoveIcon />
                    </span>
                </span>

                {/* folder paths */}
                <div className="mb-5 text-primary-searchFilter text-xs flex flex-row items-center gap-x-2 max-sm:px-5">
                    {path.map((folder, index) => {
                        if (index === 0 || index === path.length - 1 || index === path.length - 2) {
                            // Show the first folder, the second-to-last folder, and the last folder
                            return (
                                <span key={index} className="flex items-center">
                                    <button
                                        className={`text-blue-500 hover:underline ${index === path.length - 1 ? "text-primary-para font-bold" : ""
                                            }`}
                                        onClick={() => {
                                            // Logic to handle folder navigation
                                            setPath(path.slice(0, index + 1));
                                        }}
                                    >
                                        {folder}
                                    </button>
                                    {index < path.length - 1 && <span className="mx-1 text-gray-400 -rotate-90"><DownArrow /></span>}
                                </span>
                            );
                        }
                        if (index === 1) {
                            // Show ellipsis after the first folder
                            return (
                                <span key={index} className="flex items-center">
                                    <span className="text-gray-400">...</span>
                                    <span className="mx-1 text-gray-400 -rotate-90"><DownArrow /></span>
                                </span>
                            );
                        }
                        return null; // Hide other intermediate folders
                    })}
                </div>

                {/* current folder name  */}
                <div className="mb-3 flex flex-row items-center  max-sm:px-2">
                    <button
                        onClick={goBack}
                        className={`${path.length > 1 ? "cursor-pointer bg-transparent max-sm:px-2 py-2 rounded-full max-sm:active:bg-pressed/40 active:scale-95 transition-all duration-900 " : "cursor-not-allowed opacity-50 max-sm:px-2 py-2"
                            }`}
                        disabled={path.length <= 1} // Disable back button if at root
                    >
                        <BackbuttonIcon />
                    </button>
                    <span className="text-primary-para font-medium sm:ml-2">
                        {path[path.length - 1]} {/* Display the current active folder */}
                    </span>
                </div>
                {/* files in folder */}
                <div className="h-60 max-sm:px-4 overflow-y-auto custom-scrollbar max-sm:h-68">

                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center gap-x-2 hover:bg-[#D6ECFF] py-2 max-sm:py-3 group"
                        >
                            <div className="flex flex-row items-center gap-x-3">
                                <span className="px-1">{fileTypeImages[file.type] || <OtherTypeIcon />}</span>
                                <p
                                    className={`px-1 truncate w-[200px] text-primary-para text-sm ${file.type === 'Folder' ? 'text-primary-para cursor-pointer' : 'text-primary-para/50'
                                        }`}
                                    onClick={() => {
                                        if (file.type === 'Folder') {
                                            setPath([...path, file.name]); // Navigate into the folder
                                        }
                                    }}
                                >
                                    {file.name}
                                </p>
                            </div>
                            <div className="flex flex-row items-center opacity-0 group-hover:opacity-100">
                                {file.type === 'Folder' && (
                                    <button
                                        className="flex items-center"
                                        onClick={() => {
                                            setPath([...path, file.name]); // Navigate into the folder
                                        }}
                                    >
                                        <button className='bg-buttonPrimary px-3 rounded-lg h-6'>
                                            <span className='text-white'>Move</span>
                                        </button>
                                        <span className="-rotate-90 ml-3 mr-1">
                                            <DownArrow />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
                <div className='sm:hidden border-b-2 border-border/80 mt-1' />
                {/* folders */}
                <div className='mt-2'>
                    <div className='max-sm:hidden border-b-2 border-border/80 mb-2 ' />
                    <div className='max-sm:px-4 max-sm:pt-4'>
                        <Folder setFiles={setFiles} />
                    </div>

                </div>

                {/* buttons */}
                <div className="flex flex-row items-center space-x-3 mt-4">
                    <button
                        onClick={() => setMovePopup(false)}
                        className=" max-sm:hidden flex flex-grow items-center justify-center text-primary-para"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { }}
                        className="flex flex-grow max-sm:fixed max-sm:bottom-10 max-sm:w-[calc(100%-2rem)] px-1 py-2.5 bg-blue-500 text-white rounded-lg justify-center"
                    >
                        Move
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Move;


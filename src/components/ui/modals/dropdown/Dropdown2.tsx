import { useRef, useState } from 'react';
import { CopycopyIcon, CopyIcon, DeleteIcon, DetailsIcon, DownloadIcon, MoveIcon, RenameIcon, Share2Icon, StarredIcon, UserpermsIcon } from '../../../../assets';
import Delete from '../popup/Delete';
import Move from '../popup/Move';
import Share from '../popup/Share';
import Details from '../popup/Details';

interface Dropdown2Props {
    showDropdownPopup2: boolean;
    setDropdownPopup2: (state: boolean) => void;
    selectedFiles: { name: string; size: string; type: string; modified: string }[];
}

const Dropdown2 = ({ showDropdownPopup2, setDropdownPopup2, selectedFiles }: Dropdown2Props) => {
    const [showDeletePopup, setDeletePopup] = useState<boolean>(false);
    const [showSharePopup, setSharePopup] = useState<boolean>(false);
    const [showMovePopup, setMovePopup] = useState<boolean>(false);
    const [showDetailsPopup, setDetailsPopup] = useState<boolean>(false);

    const deletePopupRef = useRef<HTMLDivElement>(null);
    const sharePopupRef = useRef<HTMLDivElement>(null);
    const movePopupRef = useRef<HTMLDivElement>(null);
    const detailsPopupRef = useRef<HTMLDivElement>(null);



    const handlePermissions = () => {
        setSharePopup(!showSharePopup);
        if (showSharePopup) {
            setDropdownPopup2(false);
        }
    };

    return (
        <>
            {showDropdownPopup2 && (
                <div
                    className="fixed inset-0 max-sm:bg-black max-sm:opacity-50 z-30 max-sm:block"
                    onClick={() => setDropdownPopup2(false)}
                ></div>
            )}
            <div>
                <div className="absolute right-4 mt-6 max-sm:right-0 bg-white shadow-lg rounded-lg w-56 max-sm:w-full max-sm:fixed max-sm:bottom-0 text-primary-para z-40">
                    <h2 className="hidden max-sm:flex px-4 my-px py-2 w-full text-left text-[22px] text-primary-heading font-medium rounded-t-lg hover:bg-hover items-center flex-row gap-2 mt-6 mb-3">
                        <strong>{selectedFiles.length} item selected</strong>
                    </h2>
                    <button onClick={() => setSharePopup(!showSharePopup)}
                        className=" hidden px-4 my-px py-2 max-sm:py-3 max-sm:gap-4 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2"
                    >
                        <Share2Icon />
                        Share
                    </button>
                    <button
                        className="hidden px-4 my-px py-2 max-sm:py-3 max-sm:gap-4 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2"
                    >
                        <CopyIcon />
                        Copy link
                    </button>
                    <button
                        className="hidden px-4 my-px py-2 max-sm:py-3 max-sm:gap-4 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2"
                    >
                        <DownloadIcon />
                        Download
                    </button>
                    <button
                        onClick={handlePermissions}
                        className="hidden px-4 my-px py-2 max-sm:py-3 max-sm:gap-4 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2"
                    >
                        <StarredIcon />
                        Add to starred files
                    </button>
                    <button
                        onClick={handlePermissions}
                        className="max-sm:hidden px-4 max-sm:py-3 max-sm:gap-4 my-px py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2"
                    >
                        <UserpermsIcon />
                        Manage permissions
                    </button>
                    <button
                        onClick={() => setMovePopup(!showMovePopup)}
                        className="px-4 py-2 max-sm:py-3 max-sm:gap-4 w-full text-left hover:bg-hover flex items-center flex-row gap-2"
                    >
                        <MoveIcon />
                        Move
                    </button>
                    <button
                        className="max-sm:hidden px-4 py-2 max-sm:py-3 max-sm:gap-4 w-full text-left hover:bg-hover flex items-center flex-row gap-2"
                    >
                        <RenameIcon />
                        Rename
                    </button>
                    <button
                        className="px-4 py-2 max-sm:py-3 max-sm:gap-4 w-full text-left hover:bg-hover flex items-center flex-row gap-2"
                    >
                        <CopycopyIcon />
                        <span className='max-sm:hidden'>copy</span>
                        <span className='hidden max-sm:flex'>Duplicate</span>
                    </button>
                    <button onClick={() => setDetailsPopup(!showDetailsPopup)}
                        className="px-4 py-2 max-sm:py-3 max-sm:gap-4 w-full text-left hover:bg-hover flex items-center flex-row gap-2"
                    >
                        <DetailsIcon />
                        Details
                    </button>
                    <button
                        onClick={() => setDeletePopup(!showDeletePopup)}
                        className="max-sm:mb-10 px-4 py-2 max-sm:py-3 max-sm:gap-4 mb-px w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2"
                    >
                        <DeleteIcon />
                        Delete
                    </button>
                </div>
                {showDeletePopup && (
                    <Delete
                        showDeletePopup={showDeletePopup}
                        setDeletePopup={setDeletePopup}
                        ref={deletePopupRef}
                    />
                )}
                {showSharePopup && (
                    <Share
                        ref={sharePopupRef}
                        setSharePopup={setSharePopup}
                        showSharePopup={showSharePopup}
                    />
                )}
                {showMovePopup && (
                    <Move
                        ref={movePopupRef}
                        setMovePopup={setMovePopup}
                        showMovePopup={showMovePopup}
                        selectedFiles={selectedFiles}
                    />
                )}
                {showDetailsPopup && (
                    <Details
                        ref={detailsPopupRef}
                        setDetailsPopup={setDetailsPopup}
                        showDetailsPopup={showDetailsPopup}
                    />
                )}
            </div>
        </>

    );
};

export default Dropdown2;

import { useRef, useState } from 'react';
import {
    CopycopyIcon,
    CopyIcon,
    DeleteIcon,
    DetailsIcon,
    DownloadIcon,
    MoveIcon,
    RenameIcon,
    Share2Icon,
    StarredIcon,
    UserpermsIcon,
} from '../../../../assets';
import Delete from '../popup/Delete';
import Details from '../popup/Details';
import Move from '../popup/Move';
import Share from '../popup/Share';

interface DropdownProps {

    showDropdownPopup: number | null;
    setDropdownPopup: (state: number | null) => void;
    selectedFiles: { name: string; size: string; type: string; modified: string }[];
}

const Dropdown = ({ showDropdownPopup, setDropdownPopup, selectedFiles }: DropdownProps) => {
    const [showDeletePopup, setDeletePopup] = useState<boolean>(false);
    const [showSharePopup, setSharePopup] = useState<boolean>(false);
    const [showMovePopup, setMovePopup] = useState<boolean>(false);
    const [showDetailsPopup, setDetailsPopup] = useState<boolean>(false);


    const deletePopupRef = useRef<HTMLDivElement>(null);
    const sharePopupRef = useRef<HTMLDivElement>(null);
    const movePopupRef = useRef<HTMLDivElement>(null);
    const detailsPopupRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Backdrop for small screens */}
            {showDropdownPopup !== null && (
                <div
                    className="fixed inset-0 max-sm:bg-black max-sm:opacity-50 z-10 max-sm:block "
                    onClick={() => setDropdownPopup(null)}
                ></div>
            )}

            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute max-sm:w-full max-sm:fixed max-sm:right-0 max-sm:bottom-0 right-10 mt-2 bg-white shadow-lg rounded-lg w-56 text-primary-para z-20 max-sm:z-30 max-sm:border max-sm:rounded-t-2xl"
            >
                <h2 className="hidden max-sm:flex px-4 my-px py-2 w-full text-left text-[22px] text-primary-heading font-medium rounded-t-lg hover:bg-hover items-center flex-row gap-2 mt-6 mb-3">
                    <strong>{selectedFiles.length} item selected</strong>
                </h2>
                <button onClick={() => setSharePopup(!showSharePopup)}
                    className="hidden max-sm:flex px-4 my-px py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover items-center flex-row gap-2 max-sm:gap-4"
                >
                    <Share2Icon />
                    Share
                </button>
                <button

                    className="px-4 my-px py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex hidden items-center flex-row gap-2 max-sm:gap-4"
                >
                    <CopyIcon />
                    Copy link
                </button>
                <button

                    className="hidden px-4 my-px py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2 max-sm:gap-4"
                >
                    <DownloadIcon />
                    Download
                </button>
                <button

                    className="hidden px-4 my-px py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover max-sm:flex items-center flex-row gap-2 max-sm:gap-4"
                >
                    <StarredIcon />
                    Add to starred files
                </button>
                <button
                    onClick={() => setSharePopup(!showSharePopup)}
                    className="px-4 my-px py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:gap-4"
                >
                    <UserpermsIcon />
                    Manage permissions
                </button>
                <button
                    onClick={() => setMovePopup(!showMovePopup)}
                    className="px-4 py-2 max-sm:py-3  w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:gap-4"
                >
                    <MoveIcon />
                    Move
                </button>
                <button className="px-4 py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:gap-4">
                    <RenameIcon />
                    Rename
                </button>
                <button className="px-4 py-2 max-sm:py-3 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:gap-4">
                    <CopycopyIcon />
                    <span className="max-sm:hidden">Copy</span>
                    <span className="hidden max-sm:flex">Duplicate</span>
                </button>
                <button
                    onClick={() => setDetailsPopup(!showDetailsPopup)}
                    className="px-4 max-sm:py-3 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:gap-4"
                >
                    <DetailsIcon />
                    Details
                </button>
                <button
                    onClick={() => setDeletePopup(!showDeletePopup)}
                    className="px-4 py-2 max-sm:py-3 mb-px w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2 max-sm:gap-4 max-sm:mb-10"
                >
                    <DeleteIcon />
                    Delete
                </button>
            </div>

            {showDeletePopup && (
                <Delete showDeletePopup={showDeletePopup} setDeletePopup={setDeletePopup} ref={deletePopupRef} />
            )}
            {showSharePopup && (
                <Share ref={sharePopupRef} setSharePopup={setSharePopup} showSharePopup={showSharePopup} />
            )}
            {showMovePopup && (
                <Move ref={movePopupRef} setMovePopup={setMovePopup} showMovePopup={showMovePopup} selectedFiles={selectedFiles} />
            )}
            {showDetailsPopup && (
                <Details ref={detailsPopupRef} setDetailsPopup={setDetailsPopup} showDetailsPopup={showDetailsPopup} />
            )}
        </>
    );
};

export default Dropdown;

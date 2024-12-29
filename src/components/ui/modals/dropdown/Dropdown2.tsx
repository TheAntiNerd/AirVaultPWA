import { ForwardedRef, useEffect, useRef, useState } from 'react'
import { CopycopyIcon, DeleteIcon, DetailsIcon, MoveIcon, RenameIcon, UserpermsIcon } from '../../../../assets'
import Delete from '../popup/Delete'
import Share from '../popup/Share'

interface Dropdown2Props {
    ref: ForwardedRef<HTMLDivElement>
    showDropdownPopup2: boolean
    setDropdownPopup2: (state: boolean) => void
}
const Dropdown2 = ({ showDropdownPopup2, setDropdownPopup2 }: Dropdown2Props) => {
    const [showDeletePopup, setDeletePopup] = useState<boolean>(false);
    const [showSharePopup, setSharePopup] = useState<boolean>(false);

    const sharePopupRef = useRef<HTMLDivElement>(null)
    const deletePopupRef = useRef<HTMLDivElement>(null)
    const dropdownPopup2Ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (dropdownPopup2Ref.current && !dropdownPopup2Ref.current.contains(event.target as Node)) {
                setDropdownPopup2(false);
            }
        };
        if (showDropdownPopup2) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdownPopup2]);

    const handlePermissions = () => {
        setSharePopup(!showSharePopup)
        if (showSharePopup) {
            setDropdownPopup2(!showDropdownPopup2);
        }
    }
    return (
        <div>
            <div ref={dropdownPopup2Ref} className="absolute right-0 mt-4 bg-white shadow-lg rounded-lg w-56 text-primary-para z-20 ">
                <button onClick={handlePermissions}
                    className="px-4 my-px py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                    <UserpermsIcon />
                    Manage permissions
                </button>
                <button
                    className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                    <MoveIcon />
                    Move
                </button>
                <button
                    className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                    <RenameIcon />
                    Rename
                </button>
                <button
                    className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                    <CopycopyIcon />
                    Copy
                </button>
                <button
                    className="px-4 py-2 w-full text-left rounded-t-lg hover:bg-hover flex items-center flex-row gap-2">
                    <DetailsIcon />
                    Details
                </button>
                <button onClick={() => setDeletePopup(!showDeletePopup)}
                    className="px-4 py-2 mb-px w-full text-left rounded-b-lg hover:bg-hover flex items-center flex-row gap-2"
                > <DeleteIcon />
                    Delete
                </button>
            </div>
            {showDeletePopup && <Delete showDeletePopup={showDeletePopup} setDeletePopup={setDeletePopup} ref={deletePopupRef} />}
            {showSharePopup && <Share ref={sharePopupRef} setSharePopup={setSharePopup} showSharePopup={showSharePopup} />}
        </div>
    )
}

export default Dropdown2
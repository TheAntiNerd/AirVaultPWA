import { ForwardedRef, useEffect, useRef, useState } from 'react'
import { CopycopyIcon, DeleteIcon, DetailsIcon, MoveIcon, RenameIcon, UserpermsIcon } from '../../../../assets'
import Delete from '../popup/Delete'

interface DropdownProps {
    ref: ForwardedRef<HTMLDivElement>
    showDropdownPopup: number | null
    setDropdownPopup: (state: number | null) => void
}
const Dropdown = ({ showDropdownPopup, setDropdownPopup }: DropdownProps) => {
    const [showDeletePopup, setDeletePopup] = useState<boolean>(false);

    const dropdownPopupRef = useRef<HTMLDivElement>(null)
    const deletePopupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (dropdownPopupRef.current && !dropdownPopupRef.current.contains(event.target as Node)) {
                setDropdownPopup(null);
            }
        };
        if (showDropdownPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdownPopup]);
    return (<><div ref={dropdownPopupRef} className="absolute right-10 mt-2 bg-white shadow-lg rounded-lg w-56 text-primary-para z-20 ">
        <button
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
    </>

    )
}

export default Dropdown
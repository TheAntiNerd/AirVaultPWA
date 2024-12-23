import { ForwardedRef, useEffect, useRef } from 'react'

interface DeleteProps {
    showDeletePopup: boolean
    setDeletePopup: (state: boolean) => void;
    ref: ForwardedRef<HTMLDivElement>
}

const Delete = ({ showDeletePopup, setDeletePopup }: DeleteProps) => {
    const deletePopupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (deletePopupRef.current && !deletePopupRef.current.contains(event.target as Node)) {
                setDeletePopup(false);
            }
        };
        if (
            showDeletePopup
        ) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDeletePopup]);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={deletePopupRef} className="bg-white p-5 rounded-lg shadow-lg w-80 relative">
                <div className="px-1 text-primary-heading font-medium text-[22px]">
                    <h2>Delete?</h2>
                    <p className="text-primary-para text-sm pt-3.5">Items in the bin will be deleted forever after 30 days.</p>
                </div>
                <div className="flex flex-row items-center space-x-3 mt-6 ">
                    <button onClick={() => setDeletePopup(!showDeletePopup)} className="flex flex-grow items-center justify-center text-primary-para">
                        Cancel
                    </button>
                    <button
                        onClick={() => { }}
                        className=" flex flex-grow px-1 py-1.5 bg-blue-500 text-white rounded-lg justify-center"
                    >
                        Yes, delete it
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Delete
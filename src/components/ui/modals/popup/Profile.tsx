import { ForwardedRef, useEffect, useRef } from 'react';
import { CameraIcon, DeleteIcon, GalleryIcon } from '../../../../assets';

interface ProfileProps {
    showProfilePopup: boolean
    setProfilePopup: (state: boolean) => void;
    ref: ForwardedRef<HTMLDivElement>
}

const Profile = ({ showProfilePopup, setProfilePopup }: ProfileProps) => {

    const profilePopupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check each ref and hide the associated dropdown/modal if click is outside
            if (profilePopupRef.current && !profilePopupRef.current.contains(event.target as Node)) {
                setProfilePopup(false);
            }
        };
        if (
            showProfilePopup
        ) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfilePopup]);
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-sm">
            <div ref={profilePopupRef} className="bg-white p-6 rounded-xl shadow-lg relative w-[428px] ">

                <h2 className='text-primary-heading font-semibold text-[22px] mb-6'>Update account photo</h2>

                {/* avatar */}
                <div className='flex items-center justify-center'>
                    <button className="bg-[#FFB2D1] size-20 rounded-full flex items-center justify-center mb-4">

                    </button>
                </div>

                {/* options */}
                <div className='flex flex-col cursor-pointer '>
                    <div className='py-3 px-5 flex flex-row items-center gap-x-4 hover:bg-hover'>
                        <GalleryIcon />  <span>Upload from gallery</span>
                    </div>
                    <div className='py-3 px-5 flex flex-row items-center gap-x-4 hover:bg-hover'>
                        <CameraIcon /> Use camera
                    </div>
                    <div className='py-3 px-5 flex flex-row items-center gap-x-4 hover:bg-hover'>
                        <DeleteIcon /> Remove
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Profile
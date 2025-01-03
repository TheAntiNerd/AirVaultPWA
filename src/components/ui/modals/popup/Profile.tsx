import { ForwardedRef, useEffect, useRef } from 'react';
import { CameraIcon, DeleteIcon, GalleryIcon } from '../../../../assets';

interface ProfileProps {
    showProfilePopup: boolean;
    setProfilePopup: (state: boolean) => void;
    ref: ForwardedRef<HTMLDivElement>;
}

const Profile = ({ showProfilePopup, setProfilePopup }: ProfileProps) => {
    const profilePopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (
                profilePopupRef.current &&
                !profilePopupRef.current.contains(event.target as Node)
            ) {
                setProfilePopup(false);
            }
        };

        if (showProfilePopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfilePopup]);

    return (
        <div className="fixed inset-0 max-sm:top-0 bg-black bg-opacity-50 z-50 flex max-sm:block sm:items-center sm:justify-center">
            {/* Popup Content */}
            <div
                ref={profilePopupRef}
                className="bg-white p-6 rounded-xl shadow-lg w-[428px] max-sm:w-full max-sm:rounded-t-xl sm:relative max-sm:absolute max-sm:bottom-0"
            >
                <h2 className="text-primary-heading font-medium text-[22px] mb-6">
                    <strong>Update account photo</strong>
                </h2>

                {/* Avatar */}
                <div className="max-sm:hidden flex items-center justify-center">
                    <button className="bg-[#FFB2D1] size-20 rounded-full flex items-center justify-center mb-4"></button>
                </div>

                {/* Options */}
                <div className="flex flex-col cursor-pointer">
                    <div className="py-3 px-5 max-sm:px-0 flex flex-row items-center gap-x-4 hover:bg-hover">
                        <GalleryIcon /> <span>Upload from gallery</span>
                    </div>
                    <div className="py-3 px-5 max-sm:px-0 flex flex-row items-center gap-x-4 hover:bg-hover">
                        <CameraIcon /> Use camera
                    </div>
                    <div className="py-3 px-5 max-sm:px-0 max-sm:mb-10 flex flex-row items-center gap-x-4 hover:bg-hover">
                        <DeleteIcon /> Remove
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

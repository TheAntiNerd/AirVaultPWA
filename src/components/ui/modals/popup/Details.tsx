import { ForwardedRef, useEffect, useRef } from 'react';
import {
    ImageIcon, LocationIcon, MenuCloseIcon,
    UserpermsIcon
} from '../../../../assets';

interface DetailsProps {
    ref: ForwardedRef<HTMLDivElement>
    showDetailsPopup: boolean;
    setDetailsPopup: (state: boolean) => void;
}

const Details = ({ showDetailsPopup, setDetailsPopup }: DetailsProps) => {
    const detailsPopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (detailsPopupRef.current && !detailsPopupRef.current.contains(event.target as Node)) {
                setDetailsPopup(false);
            }
        };
        if (showDetailsPopup) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showDetailsPopup, setDetailsPopup]);

    return (
        <>
            <div
                className={`fixed top-0 right-0 w-[316px] min-h-screen bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}
                ref={detailsPopupRef}
            >
                {/* header */}
                <div className='flex justify-between items-center py-6 px-4 text-primary-heading font-medium text-[22px]'>
                    <h2 className='flex flex-row items-center gap-x-3'><ImageIcon /> Image2</h2>
                    <button onClick={() => setDetailsPopup(!showDetailsPopup)} className='pr-2'>
                        <MenuCloseIcon />
                    </button>
                </div>

                {/* <div className='border-b border-border/80 mb-4' /> */}

                <div className='h-[590px] overflow-auto custom-scrollbar '>
                    {/* preview box */}
                    <div className='mt-4 mx-auto w-[280px] h-[168px] border border-border/80 rounded-lg'>
                        <div className='flex items-center justify-center pt-16'>
                            Preview Image
                        </div>
                    </div>
                    {/* access */}
                    <div className='mt-4 mx-4'>
                        <h2 className='text-primary-heading text-sm font-medium mb-4'><strong>People with permissions</strong></h2>
                        <div>
                            BB Cr gg
                        </div>
                        <p className='mt-3 text-primary-searchFilter text-xs'>
                            Owned by Vishal
                        </p>
                    </div>

                    {/* Manage access */}
                    <button className='mx-4 my-4 border border-border/80 rounded-md flex flex-row items-center py-1.5 px-3 gap-x-2'>

                        <UserpermsIcon /> <p className='font-medium text-primary-para'>
                            Manage permissions
                        </p>
                    </button>
                    {/* Details */}
                    <div className='flex mx-4 flex-col space-y-6 text-sm overflow-auto pb-4'>
                        <div className='flex flex-col'>
                            <strong className='text-primary-heading py-px'>Name</strong> <p className='text-primary-para'>Image2</p>
                        </div>
                        <div className='flex flex-col'>
                            <strong className='text-primary-heading py-px'>Location</strong> <p className='text-primary-para flex flex-row items-center gap-x-1'>Airvault <LocationIcon /></p>
                        </div>
                        <div className='flex flex-col'>
                            <strong className='text-primary-heading py-px'>Type</strong> <p className='text-primary-para'>jpg</p>
                        </div>
                        <div className='flex flex-col'>
                            <strong className='text-primary-heading py-px'>Size</strong> <p className='text-primary-para'>23.31</p>
                        </div>
                        <div className='flex flex-col'>
                            <strong className='text-primary-heading py-px'>Created on</strong> <p className='text-primary-para'>23 dec 2024</p>
                        </div>
                        <div className='flex flex-col'>
                            <strong className='text-primary-heading py-px'>General access</strong> <p className='text-primary-para'>Anyone with the link can edit</p>
                        </div>



                    </div>
                </div>
            </div >
        </>

    );
};

export default Details;

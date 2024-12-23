import { ForwardedRef, useEffect, useRef, useState } from 'react';
import { BlueTickIcon, CopyIcon, DownArrow, GlobeIcon, LockIcon, ShareFileIcon } from '../../../assets';
import Roles from '../dropdown/Roles';
import ShareAccess from './ShareAccess';
import AddPeople from './AddPeople';


interface ShareProps {
    ref: ForwardedRef<HTMLDivElement>
    showSharePopup: boolean;
    setSharePopup: (state: boolean) => void
}

const linkTypes = ['Anyone with the link', 'Limited access'];

const Share = ({ showSharePopup, setSharePopup }: ShareProps) => {
    const [linkType, setLink] = useState<string>('Anyone with the link');
    const [showLink, setLinkType] = useState<boolean>(false);

    const sharePopupRef = useRef<HTMLDivElement>(null);
    const LinkRef = useRef<HTMLInputElement>(null);
    const removePopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            console.log('Event target:', event.target);
            console.log('Ref current:', removePopupRef.current);
            if (sharePopupRef.current && !sharePopupRef.current.contains(event.target as Node)) {
                setSharePopup(false);
            }
            if (LinkRef.current && !LinkRef.current.contains(event.target as Node)) {
                setLinkType(false);
            }
        };
        if (showSharePopup || showLink) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showSharePopup, showLink,]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={sharePopupRef} className="bg-white p-6 rounded-xl shadow-lg w-[428px] relative">
                {/* Header */}
                <div className="text-primary-heading font-medium text-[22px] flex flex-row items-center gap-x-2 mb-4">
                    <ShareFileIcon /><h2>Share</h2>
                </div>

                {/* Add people box */}
                <div className="mb-5">
                    <div className="">
                        <AddPeople />
                    </div>
                </div>

                {/* People with access */}
                <h3 className="mb-3 text-primary-heading">People with access</h3>
                <div className="mb-5">
                    <ShareAccess />
                </div>

                {/* Confirmation Modal */}


                {/* general access */}
                <h3 className="mb-3 font-medium text-primary-heading">General access</h3>
                <div className="flex justify-between items-center mb-5">
                    <div className="relative flex items-center justify-between space-x-3">
                        {linkType === 'Limited access' ? <LockIcon /> : <GlobeIcon />}
                        <span className="text-primary-heading font-medium text-center cursor-pointer">{linkType}</span>
                        <button onClick={() => setLinkType(!showLink)}>
                            <DownArrow />
                        </button>

                        {showLink && (
                            <div ref={LinkRef} className="absolute w-56 cursor-pointer -bottom-20 -left-4 rounded-lg shadow-lg bg-white text-primary-para">
                                {linkTypes.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setLink(item);
                                            setLinkType(false);
                                        }}
                                        className="w-full hover:bg-hover hover:rounded-md"
                                    >
                                        <span className="px-4 py-2 flex flex-row items-center gap-x-2 group">
                                            <span className="group-hover:opacity-100 opacity-0"><BlueTickIcon /></span>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <Roles />
                    </div>
                </div>

                <button className="w-28 flex flex-row items-center gap-x-2 text-primary-para px-2 py-1 border rounded-lg font-medium border-border bg-white">
                    <CopyIcon />
                    Copy link
                </button>

                <div className="flex flex-row items-center space-x-3 mt-4">
                    <button
                        onClick={() => setSharePopup(false)}
                        className="flex flex-grow items-center justify-center text-primary-para"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setSharePopup(false)}
                        className="flex flex-grow px-1 py-2.5 bg-blue-500 text-white rounded-lg justify-center"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Share;
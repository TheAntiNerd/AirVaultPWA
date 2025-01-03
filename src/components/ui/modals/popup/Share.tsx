import { ForwardedRef, useEffect, useRef, useState } from 'react';
import { BackbuttonIcon, BlueTickIcon, CopyIcon, DownArrow, DownIcon, GlobeIcon, ImageIcon, LockIcon, Share2Icon, ShareFileIcon, } from '../../../../assets';
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
    const [addUsers, setUser] = useState<string>('can edit');
    const [showLink, setLinkType] = useState<boolean>(false);
    const [showAdd, setAddUser] = useState<boolean>(false);
    const [isPressed, setIsPressed] = useState(false);
    const [hasInput, setHasInput] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const sharePopupRef = useRef<HTMLDivElement>(null);
    const LinkRef = useRef<HTMLInputElement>(null);
    const addRef = useRef<HTMLInputElement>(null);
    const removePopupRef = useRef<HTMLDivElement>(null);

    const addUser = ['can edit', 'can view', 'can comment', 'can remove']

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
            if (addRef.current && !addRef.current.contains(event.target as Node)) {
                setAddUser(false);
            }
        };
        if (showSharePopup || showLink || showAdd) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showSharePopup, showLink, showAdd]);

    useEffect(() => {
        const checkScreenSize = () => setIsSmallScreen(window.innerWidth <= 640);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handlePress = () => {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
        }, 2000); // 2 seconds
    }
    return (
        <div className="fixed inset-0 flex sm:items-center sm:justify-center bg-black bg-opacity-50 z-50 overflow-visible">
            <div ref={sharePopupRef} className={`bg-white sm:p-6 max-sm:py-6  sm:rounded-xl shadow-lg w-[428px] max-sm:w-full relative ${hasInput ? '' : ''}`}>
                {/* Header */}
                <div className="text-primary-heading max-sm:px-4  font-medium text-[22px] flex flex-row max-sm:justify-between items-center gap-x-2 mb-4">
                    {hasInput && !isSmallScreen ?
                        <>
                            <button onClick={() => setHasInput(false)}>
                                <BackbuttonIcon />
                            </button>
                        </>
                        :
                        <>
                            <span className='max-sm:hidden'><ShareFileIcon /></span>
                            <div className='flex flex-row items-center gap-x-2'>
                                <span onClick={() => setSharePopup(!showSharePopup)} className='cursor-pointer sm:hidden '><BackbuttonIcon /></span>
                                <span> <h2><strong>Share</strong></h2></span>
                            </div>

                            <span className='hidden max-sm:flex'><Share2Icon /></span>

                        </>}

                </div>

                <div className='sm:hidden border-b-2 max-sm:px-4 mb-3 py-3 border-border/80 mt-5 flex flex-row items-center gap-x-2'>
                    <ImageIcon /> <span className='font-medium text-sm text-primary-heading'><strong>Image 2</strong></span>
                </div>
                {/* Add people box */}
                <div className="mb-5">
                    <div className="max-sm:px-4">
                        <AddPeople setHasInput={setHasInput} />
                    </div>
                    <div className='sm:hidden border border-border/80 mt-2' />
                </div>
                {!isSmallScreen && hasInput ? (
                    <>
                        <div className="flex justify-between items-center mb-5">
                            <div className=" flex items-center justify-between space-x-2">
                                <span className="text-primary-heading font-medium text-center cursor-pointer"><strong>People added</strong>
                                    <span
                                        className='text-buttonPrimary ml-px font-medium'>
                                        <strong>{addUsers}</strong></span>
                                </span>
                                <button onClick={() => setAddUser(!showAdd)}>

                                    <DownIcon />
                                </button>

                                {showAdd && (
                                    <div ref={addRef} className="absolute w-56 cursor-pointer -bottom-20 -left-2 rounded-lg shadow-lg bg-white text-primary-para">
                                        {addUser.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setUser(item);
                                                    setAddUser(false);
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
                            <button
                                onClick={() => { }}
                                className="flex px-10 py-2.5 bg-blue-500 text-white rounded-lg justify-center ml-6"
                            >
                                Share
                            </button>
                        </div></>)
                    :

                    <>
                        { /* access list */}
                        <div className='max-sm:hidden'>
                            <h3 className="mb-3 text-primary-heading">People with access</h3>
                            <div className="mb-5">
                                <ShareAccess />
                            </div>
                        </div>


                        {/* General access  */}
                        <>
                            <h3 className="mb-3 font-medium text-primary-heading max-sm:hidden"><strong>General access</strong></h3>
                            <div className="flex justify-between items-center mb-5">
                                <div className="max-sm:hidden relative flex items-center justify-between space-x-3">
                                    {linkType === 'Limited access' ? <LockIcon /> : <GlobeIcon />}
                                    <span className="text-primary-heading font-medium text-center cursor-pointer"><strong>{linkType}</strong></span>
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
                                <div className='max-sm:p-4 '>
                                    <Roles />
                                </div>
                            </div>
                        </>
                    </>
                }

                <button
                    onClick={handlePress}
                    className={`max-sm:hidden w-28 flex flex-row items-center gap-x-2 text-primary-para px-2 py-1 border rounded-lg font-medium border-border bg-white transition duration-300 ${isPressed ? 'bg-[#D6ECF5] text-primary-heading border-none' : 'hover:bg-hover transition-all'
                        }`}
                >
                    <CopyIcon />
                    <strong>{isPressed ? 'Copied!' : 'Copy link'}</strong>
                </button>

                {!hasInput && <div className="flex flex-row items-center sm:space-x-3 mt-4 ">
                    <button
                        onClick={() => setSharePopup(false)}
                        className=" max-sm:hidden flex flex-grow items-center justify-center text-primary-para"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { }}
                        className="flex max-sm:fixed max-sm:bottom-10 max-sm:w-[calc(100%-2rem)] max-sm:right-0 max-sm:left-0 max-sm:mx-4  flex-grow px-1 py-2.5 bg-blue-500 text-white rounded-lg justify-center"
                    >
                        <span className='max-sm:hidden'>Done</span>
                        <span className='hidden max-sm:flex '>Share</span>
                    </button>
                </div>
                }

            </div>
            <button
                onClick={() => { }}
                className="hidden max-sm:flex max-sm:fixed max-sm:bottom-10 max-sm:w-[calc(100%-2rem)] max-sm:right-0 max-sm:left-0 max-sm:mx-4  flex-grow px-1 py-2.5 bg-blue-500 text-white rounded-lg justify-center"
            >
                <span className='max-sm:hidden'>Done</span>
                <span className='hidden max-sm:flex '>Share</span>
            </button>
        </div >
    );
};

export default Share;


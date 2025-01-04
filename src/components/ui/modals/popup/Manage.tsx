import { ForwardedRef, useState } from 'react';
import { BackbuttonIcon, BlueTickIcon, GlobeIcon, LockIcon, UserpermsIcon } from '../../../../assets';
import ShareAccess from './ShareAccess';


interface ShareProps {
    ref: ForwardedRef<HTMLDivElement>
    showManagePopup: boolean;
    setManagePopup: (state: boolean) => void
}

const linkTypes = ['Anyone with the link', 'Limited access'];
const roles = ['Viewer', 'Editor', 'Commenter'];

const Manage = ({ showManagePopup, setManagePopup }: ShareProps) => {
    const [linkType, setLink] = useState<string>('Anyone with the link');
    const [showLink, setLinkType] = useState<boolean>(false);
    const [showAccess, setAccess] = useState<boolean>(false);
    const [linkRole, setLinkRole] = useState<string>('Viewer')
    const [showRole, setShowRole] = useState<boolean>(false);


    return (
        <div className="fixed inset-0 flex sm:items-center sm:justify-center bg-black bg-opacity-50 z-50 overflow-visible">
            <div className={`bg-white sm:p-6 max-sm:py-6  sm:rounded-xl shadow-lg w-[428px] max-sm:w-full relative`}>
                {/* Header */}
                <div className="text-primary-heading max-sm:px-4  font-medium text-[22px] flex flex-row max-sm:justify-between items-center gap-x-2 mb-4">
                    <>
                        <div className='flex flex-row items-center gap-x-2'>
                            <span onClick={() => setManagePopup(!showManagePopup)} className='cursor-pointer sm:hidden '><BackbuttonIcon /></span>
                            <span> <h2><strong>Manage permissions</strong></h2></span>
                        </div>

                        <span className='hidden max-sm:flex'><UserpermsIcon /></span>

                    </>
                </div>
                <>
                    { /* access list */}
                    <div className=''>
                        <h3 className="mb-3 text-primary-heading font-medium mx-4 mt-10"><strong>People with access</strong></h3>
                        <div className="mb-4">
                            <ShareAccess />
                            <div className='border-b-2 pt-2 border-border/80' />
                        </div>
                    </div>
                    {/* General access  */}
                    <>
                        <h3 className="mb-3 font-medium text-primary-heading mx-4"><strong>General access</strong></h3>
                        <div className="flex justify-between items-center mb-5 mx-4">
                            <div className=" relative flex flex-col py-2">
                                <div className='flex flex-row items-center gap-x-3'>
                                    {linkType === 'Limited access' ? <LockIcon /> : <GlobeIcon />}
                                    <span className="text-primary-heading font-medium text-center cursor-pointer"><strong>{linkType}</strong></span>
                                </div>
                                <button onClick={() => setAccess(!showAccess)} className='-ml-12'>
                                    <span className='text-sm text-buttonPrimary '>Change</span>
                                </button>

                                {showAccess && (
                                    <div className="w-full inset-x-0 inset-y-0 fixed cursor-pointer rounded-lg shadow-lg bg-white text-primary-para">
                                        <div className='font-medium flex flex-row items-center gap-x-3 text-[22px] text-primary-heading mt-4 mb-6 mx-4'>
                                            <button onClick={() => setAccess(!showAccess)} className=''> <BackbuttonIcon /></button>
                                            <h2><strong>General access</strong></h2>
                                        </div>
                                        <div className='border-b-2 border-border/80 mb-3' />
                                        <div className='mx-4 py-3'>
                                            <h2 className='text-primary-heading font-medium py-2'><strong>Access level</strong></h2>
                                            <span onClick={() => setLinkType(!showLink)} className='text-buttonPrimary py-2'>{linkType}</span>
                                        </div>
                                        <div className='mx-4 py-3'>
                                            <h2 className='text-primary-heading font-medium py-2'><strong>Access Role</strong></h2>
                                            <span onClick={() => setShowRole(!showRole)} className='text-buttonPrimary py-2'>{linkRole}</span>
                                        </div>
                                        <div className='border-b-2 border-border/80 mt-3' />
                                        <>
                                            {/* show link */}
                                            {showLink && (
                                                <>
                                                    {showLink && (
                                                        <div
                                                            onClick={() => setLinkType(false)}
                                                            className="fixed inset-0 max-sm:bg-black max-sm:opacity-50 z-10 max-sm:block"
                                                        ></div>
                                                    )}
                                                    <div className="absolute max-sm:fixed max-sm:w-full bottom-0 sm:mb-1 right-0 bg-white shadow-lg w-36 sm:rounded-lg max-sm:rounded-t-xl text-primary-para z-30 overflow-visible">
                                                        <div className="mt-6 sm:hidden" />
                                                        {linkTypes.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => {
                                                                    setLink(item);
                                                                    setLinkType(false);
                                                                }}
                                                                className={`w-full hover:bg-hover hover:rounded-md ${linkType === item ? 'bg-selected' : ''
                                                                    }`}
                                                            >
                                                                <button className="px-2 py-2 max-sm:py-3 flex flex-row items-center gap-x-2 group">
                                                                    <span className="max-sm:hidden group-hover:opacity-100 opacity-0">
                                                                        <BlueTickIcon />
                                                                    </span>
                                                                    <span className="sm:hidden">
                                                                        {linkType === item ? (
                                                                            <span>
                                                                                <BlueTickIcon />
                                                                            </span>
                                                                        ) : (
                                                                            <span className="opacity-0">
                                                                                <BlueTickIcon />
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                    {item}
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <div className="sm:border-t sm:border-border/80 max-sm:mb-10" />
                                                    </div>
                                                </>
                                            )}
                                            {/* show roles */}
                                            {showRole &&
                                                <>
                                                    {showRole && <div onClick={() => setShowRole(!showRole)}
                                                        className="fixed inset-0 max-sm:bg-black max-sm:opacity-50 z-10 max-sm:block ">

                                                    </div>}
                                                    <div className="absolute max-sm:fixed max-sm:w-full bottom-0 sm:mb-1  right-0 bg-white shadow-lg w-36 sm:rounded-lg max-sm:rounded-t-xl text-primary-para z-30 overflow-visible">
                                                        <div className="mt-6" />
                                                        {roles.map((roleOption, roleIndex) => (
                                                            <div
                                                                key={roleIndex}
                                                                onClick={() => {
                                                                    setLinkRole(roleOption),
                                                                        setShowRole(false)
                                                                }}
                                                                className={`w-full hover:bg-hover hover:rounded-md ${linkRole === roleOption ? 'bg-selected' : ''
                                                                    }`}
                                                            >
                                                                <button className="px-2 py-2 max-sm:py-3 flex flex-row items-center gap-x-2 group">
                                                                    <span className="max-sm:hidden group-hover:opacity-100 opacity-0">
                                                                        <BlueTickIcon />
                                                                    </span>
                                                                    <span className="sm:hidden">
                                                                        {linkRole === roleOption ? (
                                                                            <span>
                                                                                <BlueTickIcon />
                                                                            </span>
                                                                        ) : (
                                                                            <span className="opacity-0">
                                                                                <BlueTickIcon />
                                                                            </span>
                                                                        )}</span>
                                                                    {roleOption}
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <div className="sm:border-t sm:border-border/80 max-sm:mb-10" />
                                                    </div>
                                                </>
                                            }
                                        </>

                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                </>
            </div>
        </div >
    );
};

export default Manage;

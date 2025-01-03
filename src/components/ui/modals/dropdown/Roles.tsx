import { useState } from "react";
import { BlueTickIcon, DownArrow } from "../../../../assets";


const roles = ['Viewer', 'Editor', 'Commenter'];
const Roles = () => {
    const [linkRole, setLinkRole] = useState<string>('Viewer')
    const [showRole, setShowRole] = useState<boolean>(false);

    return (
        <div >
            <div className=" text-primary-para text-sm relative cursor-default">
                <div className="flex items-center justify-between sm:gap-x-2 ">
                    <span className="max-sm:text-buttonPrimary">{linkRole}</span>
                    <button onClick={() => setShowRole(!showRole)} className="mr-4 max-sm: max-sm:fixed max-sm:right-0"> <DownArrow />  </button>
                </div>

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
                        </div></>

                }
            </div>
        </div >
    )
}

export default Roles
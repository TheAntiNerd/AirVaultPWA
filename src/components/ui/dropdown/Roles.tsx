import { useEffect, useRef, useState } from "react";
import { BlueTickIcon, DownArrow, RemoveIcon } from "../../../assets";


const roles = ['Viewer', 'Editor', 'Commenter'];
const Roles = () => {
    const [linkRole, setLinkRole] = useState<string>('Viewer')
    const [showRole, setShowRole] = useState<boolean>(false);
    const roleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
                setShowRole(false);
            }
        }
        if (showRole) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showRole])

    return (
        <div >
            <div className="flex items-center justify-center gap-3 text-primary-para text-sm relative cursor-default mr-2.5">
                {linkRole}
                <button onClick={() => setShowRole(!showRole)}> <DownArrow />  </button>
                {showRole &&

                    <div ref={roleRef} className="absolute bottom-0 mb-1 right-0 bg-white shadow-lg w-36 rounded-lg text-primary-para z-30 overflow-visible">
                        {roles.map((roleOption, roleIndex) => (
                            <div
                                key={roleIndex}
                                onClick={() => {
                                    setLinkRole(roleOption),
                                        setShowRole(false)
                                }}
                                className="w-full hover:bg-hover hover:rounded-md"
                            >
                                <button className="px-2 py-2 flex flex-row items-center gap-x-2 group">
                                    <span className="group-hover:opacity-100 opacity-0">
                                        <BlueTickIcon />
                                    </span>
                                    {roleOption}
                                </button>
                            </div>
                        ))}
                        <div className="border-t border-border/50" />
                        <button

                            className="px-2.5 py-2 flex items-center flex-row gap-x-2 w-full hover:bg-hover"
                        >
                            <RemoveIcon /> Remove user
                        </button>
                    </div>

                }
            </div>
        </div >
    )
}

export default Roles
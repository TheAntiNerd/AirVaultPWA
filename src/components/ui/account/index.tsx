import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { BackbuttonIcon, BlueTickIcon, DownArrow, EditPencilIcon } from "../../../assets";

const Dropdown: React.FC<{
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
}> = ({ options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Selected Item */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`py-1 px-4 border-2 ${isOpen ? 'border-buttonPrimary' : 'border-border/80'} focus:outline-none rounded-lg text-primary-heading font-medium cursor-pointer flex flex-row items-center gap-x-5`}
            >
                <strong>{selected}</strong>
                <span className="mr-1.5">
                    <DownArrow />
                </span>
            </div>

            {isOpen && (
                <>
                    <div
                        className="max-sm:fixed max-sm:inset-0 max-sm:bg-black max-sm:opacity-50 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    <ul
                        ref={dropdownRef}
                        className="absolute max-sm:fixed max-sm:bottom-0 max-sm:w-full left-0 mt-1 w-full bg-white border-border/80 rounded-lg shadow-lg z-20 text-primary-para"
                    >
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => {
                                    setSelected(option);
                                    setIsOpen(false);
                                }}
                                className={`group px-1  max-sm:my-4  cursor-pointer flex flex-row items-center gap-x-1 text-nowrap ${option === selected ? 'bg-selected' : 'hover:bg-hover'
                                    }`}
                            >
                                <div className="flex items-center flex-row gap-x-2 py-1">
                                    <span className={`opacity-0 group-hover:opacity-100 ${option === selected ? 'opacity-100' : ''}`}>
                                        <BlueTickIcon />
                                    </span>
                                    {option}
                                </div>

                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};


const Account: React.FC = () => {
    const navigate = useNavigate();
    const [editNamePopup, setEditNamePopup] = useState(false);
    const [newName, setNewName] = useState<string>('shiv')
    const [newLastName, setNewLastName] = useState<string>('chandel')

    const editNamePopupRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (editNamePopupRef.current && !editNamePopupRef.current.contains(event.target as Node)) {
                setEditNamePopup(false);
            }
        }
        if (editNamePopup) {
            document.addEventListener('mousedown', handleOutsideClick)
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)

        }
    }, [editNamePopup])


    const maxLength = 63;

    const handleBack = () => {
        navigate("/dashboard");
    };

    // States for dropdowns
    const [language, setLanguage] = useState("English (US)");
    const [dateFormat, setDateFormat] = useState("dd-mm-yyyy");
    const [access, setAccess] = useState("anyone with the link");
    const [permission, setPermission] = useState("can edit");

    return (
        <div className="p-6 space-y-6 relative w-full max-sm:w-full min-h-screen max-w-[1200px]">
            {/* Back button and title */}
            <div className="flex flex-row items-center gap-x-4 ">
                <span onClick={handleBack} className="cursor-pointer pb-1">
                    <BackbuttonIcon />
                </span>
                <h1 className="text-2xl font-medium text-primary-heading">Accounts</h1>
            </div>

            {/* Form container */}
            <div className="w-[500px] max-sm:w-full mx-auto">
                {/* General Info Section */}
                <div>
                    <h2 className="text-lg font-medium text-primary-heading">General info</h2>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center max-sm:flex-col max-sm:items-start justify-between max-sm:gap-y-1">
                            <label className="w-1/4 max-sm:w-full text-sm text-primary-para">Name</label>
                            <div className="flex flex-col">
                                <span className="text-primary-heading font-medium flex flex-row items-center gap-x-2">
                                    <strong>{newName} {newLastName}</strong>
                                    <span onClick={() => setEditNamePopup(!editNamePopup)} className="cursor-pointer">
                                        <EditPencilIcon />
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center max-sm:flex-col max-sm:items-start justify-between gap-2">
                            <label className="w-2/4 max-sm:w-full text-sm text-primary-para">Email</label>
                            <span className="text-primary-heading font-medium">
                                <strong>ddpr@myairvault.com</strong>
                            </span>
                        </div>
                        <div className="flex items-center max-sm:flex-col max-sm:items-start justify-between gap-2">
                            <label className="w-2/4 max-sm:w-full text-sm text-primary-para">Language</label>
                            <Dropdown
                                options={["English (US)", "English (UK)"]}
                                selected={language}
                                setSelected={(value) => setLanguage(value)}
                            />
                        </div>
                        <div className="flex items-center max-sm:flex-col max-sm:items-start justify-between gap-2">
                            <label className="w-2/4 max-sm:w-full text-sm text-primary-para">Date format</label>
                            <Dropdown
                                options={["dd-mm-yyyy", "mm-dd-yyyy", "yyyy-mm-dd"]}
                                selected={dateFormat}
                                setSelected={(value) => setDateFormat(value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Default Sharing Settings */}
                <div className="mt-12">
                    <h2 className="text-lg font-medium text-primary-heading">
                        Default sharing settings
                    </h2>
                    <div className="mt-4 space-y-4">
                        <div className="flex justify-between max-sm:flex-col max-sm:items-start items-center gap-2">
                            <label className="w-2/4 max-sm:w-full text-sm text-primary-para">Who has access</label>
                            <Dropdown
                                options={["anyone with the link", "limited access"]}
                                selected={access}
                                setSelected={setAccess}
                            />
                        </div>
                        <div className="flex items-center max-sm:flex-col max-sm:items-start justify-between gap-2 max-sm:pb-10">
                            <label className="w-2/4 max-sm:w-full text-sm text-primary-para">What people can do</label>
                            <Dropdown
                                options={["can edit", "can view"]}
                                selected={permission}
                                setSelected={setPermission}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {editNamePopup && (
                <div>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                        <div ref={editNamePopupRef} className="bg-white p-6 rounded-lg shadow-lg w-[382px] relative max-sm:mx-4">
                            <div className="px-1 text-primary-heading font-medium text-[22px]">
                                <h2>Change your name</h2>
                            </div>
                            <div className="relative">
                                <div className="text-primary-para mt-4 px-1">First name</div>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)} // Correct event handling
                                    placeholder="First name"
                                    className="w-full px-4 py-2 text-primary-para border border-border rounded-lg focus:outline-none focus:border-borderView focus:border-2"
                                />
                                <span
                                    className="absolute right-6 top-[87px] mb-3 -mr-1 text-xs text-primary-para"
                                    style={{
                                        transform: 'translateY(-180%)',
                                        padding: '0 4px',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    {newName.length}/{maxLength}
                                </span>
                                <div className="text-primary-para mt-4 px-1">Last name</div>
                                <input
                                    type="text"
                                    value={newLastName}
                                    onChange={(e) => setNewLastName(e.target.value)} // Correct event handling
                                    placeholder="Last name"
                                    className="w-full px-4 py-2 text-primary-para border border-border rounded-lg focus:outline-none focus:border-borderView focus:border-2"
                                />
                                <span
                                    className="absolute right-6 top-[87px] mb-3 -mr-1 text-xs text-primary-para"
                                    style={{
                                        transform: 'translateY(330%)',
                                        padding: '0 4px',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    {newLastName.length}/{maxLength}
                                </span>
                            </div>
                            <div className="flex flex-row items-center space-x-3 mt-6">
                                <button
                                    onClick={() => setEditNamePopup(!editNamePopup)}
                                    className="flex flex-grow items-center justify-center text-primary-para"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Updated Name:', newName);
                                        console.log('Updated Last Name:', newLastName);
                                        setEditNamePopup(false); // Close popup after updating
                                    }}
                                    className="flex flex-grow px-1 py-1.5 bg-blue-500 text-white rounded-lg justify-center"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>

    );
};

export default Account;



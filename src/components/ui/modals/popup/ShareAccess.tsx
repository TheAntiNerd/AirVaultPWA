import { useEffect, useRef, useState } from 'react'
import { BlueTickIcon, DownArrow, RemoveIcon } from '../../../../assets'

const roles = ['Viewer', 'Editor', 'Commenter'];
interface UsersProps {
    name: string;
    email: string;
    role: string;
}

const ShareAccess = () => {
    const roleDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
    const removePopupRef = useRef<HTMLDivElement>(null);
    const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [userToRemove, setUserToRemove] = useState<number | null>(null);
    const [users, setUsers] = useState<UsersProps[]>([
        {
            name: "Legion 4",
            email: "legion4@legion.com",
            role: 'Viewer',
        },
        {
            name: "Legion 5",
            email: "legion5@legion.com",
            role: 'Viewer',
        },
        {
            name: "Legion 6",
            email: "legion6@legion.com",
            role: 'Viewer',
        },
        {
            name: "Legion 7",
            email: "legion7@legion.com",
            role: 'Viewer',
        },
        {
            name: "Legion 8",
            email: "legion8@legion.com",
            role: 'Viewer',
        },
        {
            name: "Legion 9",
            email: "legion9@legion.com",
            role: 'Viewer',
        },
    ]);
    const handleRemoveClick = (userIndex: number) => {
        setUserToRemove(userIndex);
        setShowConfirmModal(true);
        setSelectedUserIndex(null);
    };
    const handleRoleChange = (newRole: string, userIndex: number) => {
        setUsers(prevUsers => {
            const updatedUsers = [...prevUsers];
            updatedUsers[userIndex] = {
                ...updatedUsers[userIndex],
                role: newRole
            };
            return updatedUsers;
        });
        setSelectedUserIndex(null);
    };

    const handleRemoveUser = (userIndex: number) => {
        setUsers(prevUsers => prevUsers.filter((_, index) => index !== userIndex));
        setUserToRemove(null);
        setShowConfirmModal(false);
        setSelectedUserIndex(null);
    };


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            console.log('Event target:', event.target);
            console.log('Ref current:', removePopupRef.current);

            if (
                removePopupRef.current &&
                !removePopupRef.current.contains(event.target as Node) &&
                showConfirmModal
            ) {
                setShowConfirmModal(false);
            }
            if (selectedUserIndex !== null && roleDropdownRefs.current[selectedUserIndex] &&
                !roleDropdownRefs.current[selectedUserIndex]?.contains(event.target as Node)) {
                setSelectedUserIndex(null);
            }

        };

        if (showConfirmModal || selectedUserIndex !== null) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showConfirmModal, selectedUserIndex]);
    return (
        <>
            <div className={`h-[168px] overflow-auto relative ${users.length > 3 ? 'custom-scrollbar' : ''} `}>
                {users.map((user, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center cursor-pointer py-2 hover:bg-hover hover:rounded-sm">
                            <div className="flex flex-row items-center">
                                <div className="bg-[#FAD24B] w-10 h-10 rounded-full flex items-center justify-center">
                                    <span className="text-center text-sm font-semibold">
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm ml-3 leading-5">
                                    <p className="font-semibold text-primary-heading pb-px max-w-36 truncate">{user.name}</p>
                                    <p className="text-primary-searchFilter pt-px text-xs max-w-36 truncate">{user.email}</p>
                                </span>
                            </div>
                            <div className="mr-2.5" ref={el => roleDropdownRefs.current[index] = el}>
                                <button
                                    onClick={() => setSelectedUserIndex(selectedUserIndex === index ? null : index)}
                                    className="flex items-center justify-between gap-x-2 text-primary-heading"
                                >
                                    {user.role}
                                    <DownArrow />
                                </button>
                                <div className='relative'>
                                    {selectedUserIndex === index && (
                                        <div className="absolute top-0 mb-1 right-3 bg-white shadow-lg w-36 rounded-lg text-primary-para z-30 overflow-visible">
                                            {roles.map((roleOption, roleIndex) => (
                                                <div
                                                    key={roleIndex}
                                                    onClick={() => handleRoleChange(roleOption, index)}
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
                                                onClick={() => handleRemoveClick(index)}
                                                className="px-2.5 py-2 flex items-center flex-row gap-x-2 w-full hover:bg-hover"
                                            >
                                                <RemoveIcon /> Remove user
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div> {(showConfirmModal && userToRemove !== null) && (
                <div ref={removePopupRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-pretty">
                    <div className="bg-white rounded-2xl p-6 w-[380px]">
                        <h3 className="text-[22px] font-semibold text-primary-heading mb-3">Remove {users[userToRemove].name}?</h3>
                        <p className="text-primary-para mb-6">
                            If you remove {users[userToRemove].name}, they won&apos;t be able to see future changes to this item.
                        </p>
                        <div className="flex items-center flex-row justify-between flex-grow space-x-3">
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setUserToRemove(null);
                                }}
                                className="px-4 py-2 text-primary-para  flex-grow rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleRemoveUser(userToRemove)}
                                className="px-4 py-2 bg-buttonPrimary text-white rounded-lg flex-grow"
                            >
                                Yes, remove'em
                            </button>
                        </div>
                    </div>
                </div>
            )}</>

    )
}

export default ShareAccess
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
                !removePopupRef.current.contains(event.target as Node)
            ) {
                setShowConfirmModal(false);
            }
            if (selectedUserIndex !== null && roleDropdownRefs.current[selectedUserIndex] &&
                !roleDropdownRefs.current[selectedUserIndex]?.contains(event.target as Node)) {
                setSelectedUserIndex(null);
            }

        };

        if (selectedUserIndex !== null) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [selectedUserIndex]);
    return (
        <>
            <div className={`h-[168px] max-sm:h-[300px] max-sm:mx-4 overflow-auto relative ${users.length > 3 ? 'custom-scrollbar' : ''} `}>
                {users.map((user, index) => (
                    <div key={index}>
                        <div className="flex justify-between max-sm:flex-col sm:items-center cursor-pointer py-2 hover:bg-hover hover:rounded-sm">
                            <div className="flex flex-row items-center">
                                <div className="bg-[#FAD24B] h-9 w-9 rounded-2xl flex items-center justify-center">
                                    <span className="text-center text-sm font-semibold">
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm ml-3 leading-5">
                                    <p className="font-semibold text-primary-heading pb-px max-w-36 truncate max-sm:mt-px">{user.name}</p>
                                    <p className="text-primary-searchFilter pt-px text-xs max-w-36 truncate">{user.email}</p>
                                </span>
                            </div>
                            <div className="mr-2.5 " ref={el => roleDropdownRefs.current[index] = el}>
                                <button
                                    onClick={() => setSelectedUserIndex(selectedUserIndex === index ? null : index)}
                                    className="flex items-center justify-between gap-x-2 text-primary-heading max-sm:mx-12 max-sm:px-1 max-sm:pt-[6px]"
                                >
                                    <span className='max-sm:text-buttonPrimary'>{user.role}</span>
                                    <span className='max-sm:hidden'> <DownArrow /></span>
                                </button>
                                <div className='relative'>

                                    {selectedUserIndex === index && (
                                        <> {selectedUserIndex !== null && (
                                            <div
                                                className="fixed inset-0 max-sm:bg-black max-sm:opacity-50 z-10 max-sm:block "
                                                onClick={() => setSelectedUserIndex(null)}
                                            >
                                            </div>
                                        )}
                                            <div className="absolute max-sm:fixed max-sm:bottom-0 max-sm:w-full max-sm:inset-x-0 sm:top-0 sm:mb-1 sm:right-3 bg-white shadow-lg w-36 rounded-lg text-primary-para z-30 overflow-visible">
                                                <div className='mt-6 sm:hidden' />
                                                {roles.map((roleOption, roleIndex) => (
                                                    <div
                                                        key={roleIndex}
                                                        onClick={() => handleRoleChange(roleOption, index)}
                                                        className={`w-full hover:bg-hover hover:rounded-md ${user.role === roleOption ? 'bg-selected' : ''
                                                            }`}
                                                    >
                                                        <button className="px-2 max-sm:px-4 py-2 max-sm:py-3 flex flex-row items-center gap-x-2 max-sm:gap-x-4 group">
                                                            <span
                                                                className={`${user.role === roleOption
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0 sm:group-hover:opacity-0'
                                                                    } sm:opacity-100`}
                                                            >
                                                                <BlueTickIcon />
                                                            </span>
                                                            {roleOption}
                                                        </button>
                                                    </div>
                                                ))}



                                                <div className="border-t border-border/50" />
                                                <button
                                                    onClick={() => handleRemoveClick(index)}
                                                    className="px-2.5 max-sm:px-4 py-2 max-sm:py-3 max-sm:mb-10 flex items-center flex-row gap-x-2 w-full hover:bg-hover"
                                                >
                                                    <RemoveIcon /> <span className='max-sm:ml-2'>Remove user</span>
                                                </button>
                                            </div>
                                        </>


                                    )}
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
            {(showConfirmModal && userToRemove !== null) && (
                <>
                    {showConfirmModal !== null && (
                        <div
                            className="fixed inset-0 max-sm:bg-black max-sm:opacity-50 z-10 max-sm:block "
                            onClick={() => setShowConfirmModal(!showConfirmModal)}
                        ></div>
                    )}
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-pretty">
                        <div className="bg-white rounded-2xl p-6 w-[380px] max-sm:w-full max-sm:mx-4">
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
                </>

            )}
        </>

    )
}

export default ShareAccess
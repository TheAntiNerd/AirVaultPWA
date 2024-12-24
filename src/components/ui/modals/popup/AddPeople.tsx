import { useEffect, useRef, useState } from "react";

interface AddPeopleProps {
    setHasInput: (state: boolean) => void;
}
const Users = [
    { name: "legion1", email: "legion1@gmail.com" },
    { name: "legion2", email: "legion2@gmail.com" },
    { name: "legion3", email: "legion3@gmail.com" },
    { name: "legion4", email: "legion4@gmail.com" },
    { name: "legion5", email: "legion5@gmail.com" },
    { name: "legion6", email: "legion6@gmail.com" },
    { name: "legion7", email: "legion7@gmail.com" },
];


const AddPeople = ({ setHasInput }: AddPeopleProps) => {
    const [showSuggestion, setSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const suggestionRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close the suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
                setSuggestions(false);
            }
        };

        if (showSuggestion) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSuggestion]);

    // Add a user to the selected list
    const handleAddUser = (user: string) => {
        if (user.trim() && !selectedUsers.includes(user)) {
            setSelectedUsers([...selectedUsers, user]);
        }
        setInputValue("");
        setSuggestions(false);
        setHasInput(true)
    };

    // Remove a user from the selected list
    const handleDeleteUser = (user: string) => {
        setSelectedUsers(selectedUsers.filter((u) => u !== user));
    };

    // Handle Enter key for input
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.trim()) {
            handleAddUser(inputValue);
        }
    };

    // Filter suggestions based on input
    const filteredUsers = Users.filter((user) =>
        user.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Close suggestions if no matches
    useEffect(() => {
        if (inputValue.trim() && filteredUsers.length === 0) {
            setSuggestions(false);
        }
    }, [inputValue, filteredUsers]);

    return (
        <div className="text-primary-para relative">
            <div className="flex flex-wrap items-center gap-2 p-2 border-2 rounded-lg border-border focus-within:border-buttonPrimary">
                {selectedUsers.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-200 text-sm font-medium px-3 py-1 rounded-full"
                    >
                        {user}
                        <button
                            onClick={() => handleDeleteUser(user)}
                            className="ml-2"
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onClick={() => setSuggestions(true)}
                    className="bg-white flex-grow focus:outline-none"
                    placeholder="Add people"
                />
            </div>
            {showSuggestion && filteredUsers.length > 0 && (
                <div
                    ref={suggestionRef}
                    className="absolute bg-white w-full mt-2 z-10 overflow-auto h-40 custom-scrollbar rounded-md shadow-lg"
                >
                    {filteredUsers.map((user, index) => (
                        <div
                            key={index}
                            onClick={() => handleAddUser(user.name)}
                            className="flex flex-col p-2 hover:bg-hover cursor-pointer"
                        >
                            <div className="flex flex-row items-center">
                                <div className="bg-[#FAD24B] w-10 h-10 rounded-full flex items-center justify-center">
                                    <span className="text-center text-sm font-medium">
                                        {user.name.slice(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm ml-3 leading-5">
                                    <p className="font-medium text-primary-heading pb-px max-w-36 truncate">
                                        {user.name}
                                    </p>
                                    <p className="text-primary-searchFilter pt-px text-xs max-w-36 truncate">
                                        {user.email}
                                    </p>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddPeople;

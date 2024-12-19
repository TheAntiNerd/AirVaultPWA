import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { CustomIcon, DeleteIcon, FileIcon, HomeIcon, LogoIcon, MenuCloseIcon, MenuOpenIcon, PlusArrow, SharedIcon, StarredIcon } from '../assets';

const menuItems = [
    { name: 'Home', path: '/dashboard', icon: <HomeIcon /> },
    { name: 'My files', path: '/myfiles', icon: <FileIcon /> },
    { name: 'Shared with me', path: '/shared', icon: <SharedIcon /> },
    { name: 'Deleted files', path: '/deleted', icon: <DeleteIcon /> },
];

export default function SideMenu({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [quickAccess, setQuickAccess] = useState([
        { name: 'Starred', path: '/starred', icon: <StarredIcon /> },
    ]);
    const [isAddingField, setIsAddingField] = useState(false);
    const [newFieldName, setNewFieldName] = useState('');
    const [storageUsed, setStorageUsed] = useState(0);
    const [storageTotal, setStorageTotal] = useState(100);
    const [progress, setProgress] = useState(0);


    const closeSidebarOnClick = () => {
        if (isSidebarOpen) setIsSidebarOpen(false);
    };

    const handleAddQuickAccessItem = () => {
        if (newFieldName.trim()) {
            setQuickAccess([
                ...quickAccess,
                {
                    name: newFieldName,
                    path: `/${newFieldName.toLowerCase().replace(/\s+/g, '-')}`,
                    icon: <CustomIcon />,
                },
            ]);
            setNewFieldName('');
            setIsAddingField(false);
        }
    };

    useEffect(() => {
        const fetchStorageData = async () => {
            try {
                /*  const response = await fetch('/api/storage'); 
                 const data = await response.json(); */
                const dummyData = {
                    used: 30,
                    total: 100,
                };

                setStorageUsed(dummyData.used);
                setStorageTotal(dummyData.total);

                // Calculate progress percentage
                const percentage = (dummyData.used / dummyData.total) * 100;
                setProgress(percentage);
            } catch (error) {
                console.error('Failed to fetch storage data:', error);
            }
        };

        fetchStorageData();
    }, []);


    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white text-sans text-sm ">
            {/* Top Bar */}
            {location.pathname.startsWith('/saved-ip') ? null : (
                <div className="bg-white shadow p-3 flex justify-between items-center lg:hidden sticky top-0 z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-gray-800 focus:outline-none">
                        <MenuOpenIcon />
                    </button>
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-100 scale-100'
                    } lg:translate-x-0 transition-transform duration-500 ease-in-out lg:w-64 fixed lg:static inset-0 bg-[#F7F9FC] text-gray-800 p-4  flex flex-col justify-between z-40 `}>
                <div>
                    {/* Logo */}
                    <div className="flex gap-2 mb-6">
                        <Link to="/" className="px-3 font-semibold">
                            <span className="flex max-lg:hidden  items-start justify-center">
                                <LogoIcon />
                            </span>
                        </Link>
                    </div>

                    {/* Close Button Mobile*/}
                    <div className="mb-8 lg:hidden flex items-start justify-between">
                        <span className="flex items-start order-0 justify-center px-2">
                            <LogoIcon />
                        </span>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-gray-800 focus:outline-none flex">
                            <MenuCloseIcon />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav>
                        {/* Default Menu */}
                        {menuItems.map(item => (
                            <div key={item.name}>
                                <Link
                                    to={item.path}
                                    onClick={closeSidebarOnClick}
                                    className={`flex items-center p-1.5 my-1 rounded transition-colors ${location.pathname === item.path
                                        ? 'bg-[#DBEAFE] text-primary-heading rounded-lg'
                                        : 'hover:bg-[#EBF2FA] rounded-lg'
                                        }`}>
                                    <span className='pl-2 flex items-center justify-between'>
                                        {item.icon}
                                        <span className="ml-3 text-primary-para">{item.name}</span>
                                    </span>
                                </Link>
                            </div>
                        ))}

                        {/* Quick Access Section */}
                        <div className="mt-4">
                            <button
                                className=" mb-2 cursor-pointer"
                                onClick={() => setIsAddingField(!isAddingField)}>
                                <span className='flex items-center justify-between'>
                                    <h4 className='px-4 font-medium text-primary-heading'>Quick access </h4>
                                    <span className='ml-2  '>
                                        <PlusArrow />
                                    </span>
                                </span>

                            </button>

                            {/* Input Field */}
                            {isAddingField && (
                                <div className="flex mb-1">
                                    <input
                                        type="text"
                                        value={newFieldName}
                                        onChange={(e) => setNewFieldName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleAddQuickAccessItem();
                                        }}
                                        className="py-2 border px-3 rounded text-gray-700 w-[240px] max-sm:w-full focus:border-blue-500 focus:outline-none"
                                        placeholder="Enter field name"
                                    />
                                    <button
                                        onClick={handleAddQuickAccessItem}
                                        className=" hidden max-sm:block ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                        Add
                                    </button>
                                </div>
                            )}

                            {/* List of Quick Access */}
                            {quickAccess.map((item, index) => (
                                <div key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={closeSidebarOnClick}
                                        className={`flex items-center p-1.5 my-1 rounded transition-colors ${location.pathname === item.path
                                            ? 'bg-[#DBEAFE] text-primary-heading rounded-lg'
                                            : 'hover:bg-[#EBF2FA] rounded-lg'
                                            }`}>
                                        <span className='pl-3 flex items-center justify-between'>
                                            {item.icon}
                                            <span className="ml-3 text-primary-para">{item.name}</span>
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* storage bar */}
                        <div className="mt-4 px-[18px]">
                            <h4 className="text-primary-heading font-medium mb-3">Storage</h4>
                            <div className="w-full bg-[#D3DBE0] rounded h-[7px]">
                                <div
                                    className="bg-gradient-to-r from-[#46BFFB] to-[#298DFF] h-[7px] rounded"
                                    style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
                                />
                            </div>


                            <p className="text-primary-para mt-2 text-sm">
                                {storageTotal - storageUsed} GB left
                            </p>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                <div className="w-full max-w-[1240px] mx-auto px-4 mb-8">
                    {children}
                </div>
            </main>


        </div>
    );
}

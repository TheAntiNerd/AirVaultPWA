import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { GridIcon, LogoIcon, MenuCloseIcon, MenuOpenIcon } from '../assets';

const menuItems = [
    { name: 'Home', path: '/dashboard', icon: <GridIcon /> },
    { name: 'My files', path: '/myfiles', icon: <GridIcon /> },
    { name: 'Shared with me', path: '/shared', icon: <GridIcon /> },
    { name: 'Deleted files', path: '/deleted', icon: <GridIcon /> },
];

export default function SideMenu({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [quickAccess, setQuickAccess] = useState([
        { name: 'Starred', path: '/starred', icon: <GridIcon /> },
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
                    icon: <GridIcon />,
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
        <div className="flex flex-col lg:flex-row w-full h-screen bg-white text-sans text-sm">
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
                    } lg:translate-x-0 transition-transform duration-500 ease-in-out lg:w-64 fixed lg:static inset-0 bg-white text-gray-800 p-4 border-r flex flex-col justify-between z-40`}>
                <div>
                    {/* Logo */}
                    <div className="max-sm:hidden gap-2">
                        <Link to="/" className="px-3 font-semibold">
                            <span className="flex items-center justify-center">
                                <LogoIcon />
                                <span className='ml-3 text-base'>Airvault</span>
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
                                    className={`flex items-center p-2 my-1 rounded transition-colors ${location.pathname === item.path
                                        ? 'bg-[#DBEAFE] text-gray-800'
                                        : 'hover:bg-gray-200'
                                        }`}>
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            </div>
                        ))}

                        {/* Quick Access Section */}
                        <div className="mt-8">
                            <button
                                className="text-gray-600 font-semibold mb-2 cursor-pointer"
                                onClick={() => setIsAddingField(!isAddingField)}>
                                <h4 className=''>Quick Access +</h4>
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
                                        className="flex items-center p-2 my-1 rounded hover:bg-gray-200 transition-colors">
                                        {item.icon}
                                        <span className="ml-3">{item.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* storage bar */}
                        <div className="mt-8">
                            <h4 className="text-gray-600 font-semibold mb-2">Storage Usage</h4>
                            <div className="w-full bg-gray-200 rounded h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded"
                                    style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
                                />
                            </div>
                            <p className="text-gray-600 mt-2 text-sm">
                                {storageUsed} GB used of {storageTotal} GB
                            </p>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-zinc-300">
                <div className="w-full max-w-[1200px] mx-auto px-4">
                    {children}
                </div>
            </main>


        </div>
    );
}

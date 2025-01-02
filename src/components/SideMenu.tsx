import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { CustomIcon, DeleteIcon, FileIcon, HomeIcon, LogoIcon, PlusArrow, SelectedFileIcon, SelectedHomeIcon, SelectedSharedIcon, SelectedStarredIcon, SharedIcon, StarredIcon } from '../assets';

const menuItems = [
    { name: 'Home', path: '/dashboard', icon: <HomeIcon /> },
    { name: 'My files', path: '/myfiles', icon: <FileIcon /> },
    { name: 'Shared with me', path: '/shared', icon: <SharedIcon /> },
    { name: 'Deleted files', path: '/deleted', icon: <DeleteIcon /> },
];
const mobileMenuItems = [
    { name: 'Home', path: '/dashboard', icon: <HomeIcon />, selectedicon: <SelectedHomeIcon /> },
    { name: 'My files', path: '/myfiles', icon: <FileIcon />, selectedicon: <SelectedFileIcon /> },
    { name: 'Shared', path: '/shared', icon: <SharedIcon />, selectedicon: <SelectedSharedIcon /> },
    { name: 'Starred', path: '/starred', icon: <StarredIcon />, selectedicon: <SelectedStarredIcon /> },
];

export default function SideMenu({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const [quickAccess, setQuickAccess] = useState([
        { name: 'Starred', path: '/starred', icon: <StarredIcon /> },
    ]);
    const [isAddingField, setIsAddingField] = useState(false);
    const [newFieldName, setNewFieldName] = useState('');
    const [storageUsed, setStorageUsed] = useState(0);
    const [storageTotal, setStorageTotal] = useState(100);
    const [progress, setProgress] = useState(0);

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
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white text-sans text-sm relative ">
            {/* Sidebar */}
            <aside
                className={`w-64 inset-0  bg-[#F7F9FC] p-4 max-sm:hidden flex flex-col justify-between z-40 `}>
                <div>
                    {/* Logo */}
                    <div className="flex gap-2 mb-6">
                        <Link to="/" className="px-3 font-semibold">
                            <span className="flex max-lg:hidden  items-start justify-center">
                                <LogoIcon />
                            </span>
                        </Link>
                    </div>
                    {/* Navigation Menu */}
                    <nav>
                        {/* Default Menu */}
                        {menuItems.map(item => (
                            <div key={item.name}>
                                <Link
                                    to={item.path}
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
                                    <h4 className='px-4 font-semibold text-primary-heading'>Quick access </h4>
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
                            <h4 className="text-primary-heading font-semibold mb-3">Storage</h4>
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

            {/* mobile navbar */}
            <div className='hidden fixed inset-x-0 bottom-0 max-sm:flex items-center justify-center z-30'>
                <div className="bg-[#F7F9FC] w-full h-24 px-8 flex flex-row items-center justify-between text-primary-heading/70">
                    {mobileMenuItems.map(item => (
                        <div key={item.name}>
                            <Link
                                to={item.path}>
                                <span className=' flex flex-col items-center justify-between'>
                                    {location.pathname == item.path ? <>
                                        {item.selectedicon}</> : <> {item.icon}</>}
                                    <span className="my-1"> {location.pathname == item.path ? <>
                                        <span className='font-semibold text-primary-heading'>{item.name}</span></> : <> {item.name}</>}</span>
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1">
                <div className="w-full max-w-[1240px] mx-auto px-4 ">
                    {children}
                </div>
            </main>


        </div>
    );
}

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
	GridIcon,
	UserIcon,
	DatabaseIcon,
	ShareIcon,
	ShieldIcon,
	ArrowUpCircleIcon,
	LogoutIcon,
	MenuOpenIcon,
	MenuCloseIcon,
	DownArrow,
	LogoIcon,
	IpIcon,
} from '../assets/svg';

const menuItems = [
	{ name: 'Dashboard', path: '/dashboard', icon: <GridIcon /> },
	{
		name: 'Accounts',
		icon: <UserIcon />,
		submenu: [
			{ name: 'Users', path: '/users' },
			{ name: 'Groups', path: '/groups' },
		],
	},
	{ name: 'Directory', path: '/directories', icon: <DatabaseIcon /> },
	{ name: 'Network Shares', path: '/network-shares', icon: <ShareIcon /> },
	{ name: 'Protection', path: '/protection', icon: <ShieldIcon /> },
	{
		name: 'Version Update',
		path: '/updates',
		icon: <ArrowUpCircleIcon />,
	},
];

const logoutItem = { name: 'Logout', path: '/login', icon: <LogoutIcon /> };

export default function SideMenu({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const navigate = useNavigate();

	const [accountsOpen, setAccountsOpen] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowLogoutModal(true);
	};

	const handleConfirmLogout = () => {
		setShowLogoutModal(false);
		navigate('/login');
	};

	const handleCloseModal = () => {
		setShowLogoutModal(false);
	};

	const closeSidebarOnClick = () => {
		if (isSidebarOpen) setIsSidebarOpen(false);
	};

	return (
		<div className="flex flex-col lg:flex-row w-full h-screen bg-white text-sans">
			{/* Top Bar */}
			{location.pathname.startsWith('/saved-ip') ? null : (
				<div className="bg-white shadow p-3 flex justify-between items-center lg:hidden sticky top-0 z-10">
					<button
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
						className="text-gray-800 focus:outline-none">
						<MenuOpenIcon />
					</button>

					<Link to="/saved-ip" className="flex items-end justify-between">
						{location.pathname.startsWith('/dashboard') && (
							<span>
								<IpIcon />
							</span>
						)}
					</Link>
				</div>
			)}

			{/* Sidebar */}
			<aside
				className={`${
					isSidebarOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-100 scale-100'
				} lg:translate-x-0 transition-transform duration-500 ease-in-out lg:w-64 fixed lg:static inset-0 bg-white text-gray-800 p-4 border-r flex flex-col justify-between z-40`}>
				<div>
					<div className="hidden lg:flex items-center justify-between gap-2 mb-8">
						<Link to="/" className="flex px-3 font-semibold">
							<span className="flex items-start">
								<LogoIcon />
							</span>
						</Link>

						<span className="flex items-end">
							<Link to="/saved-ip">
								{(location.pathname.startsWith('/dashboard') ||
									location.pathname.startsWith('/saved-ip')) && (
									<span className="flex items-center px-3 py-1 rounded-full bg-[#DFF0D7] text-[#445B45]">
										<IpIcon /> <span className="text-xs font-medium ml-1">connected</span>
									</span>
								)}
							</Link>
						</span>
					</div>

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
					<nav>
						{menuItems.map(item => (
							<div key={item.name}>
								{item.submenu ? (
									<div
										onClick={() => setAccountsOpen(!accountsOpen)}
										className={`cursor-pointer w-full flex items-center p-2 my-1 rounded transition-colors ${
											location.pathname.startsWith('/users') || location.pathname === '/groups'
												? 'bg-[#DBEAFE] text-gray-800'
												: 'hover:bg-gray-200'
										}`}>
										{item.icon}
										<span className="ml-3">{item.name}</span>
										<span
											className={`ml-auto transition-transform duration-300 ease-in-out ${
												accountsOpen ? 'rotate-180' : ''
											}`}>
											{' '}
											<DownArrow />
										</span>
									</div>
								) : (
									<Link
										to={item.path}
										onClick={closeSidebarOnClick}
										className={`flex items-center p-2 my-1 rounded transition-colors ${
											location.pathname === item.path
												? 'bg-[#DBEAFE] text-gray-800'
												: 'hover:bg-gray-200'
										}`}>
										{item.icon}
										<span className="ml-3">{item.name}</span>
									</Link>
								)}
								{item.submenu && accountsOpen && (
									<div className="ml-8">
										{item.submenu.map(subItem => (
											<Link
												key={subItem.name}
												to={subItem.path}
												onClick={closeSidebarOnClick}
												className={`block p-2 my-1 rounded ${
													location.pathname === subItem.path
														? 'bg-[#DBEAFE] text-gray-800'
														: 'hover:bg-gray-200'
												}`}>
												{subItem.name}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</nav>
				</div>
				<nav>
					<button
						onClick={handleLogoutClick}
						className={`flex items-center p-2 mb-10 rounded transition-colors ${
							location.pathname === logoutItem.path ? 'bg-[#DBEAFE] text-gray-800' : 'hover:bg-gray-200'
						}`}>
						{logoutItem.icon}
						<span className="ml-3">{logoutItem.name}</span>
					</button>
				</nav>
			</aside>

			{/* Confirm Logout Modal */}
			{showLogoutModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 max-sm:px-3">
					<div className="bg-white p-10 shadow-lg text-center w-[414px] h-[209px] max-sm:w-full rounded-lg flex flex-col items-center justify-between">
						<h2 className="text-2xl font-medium mb-6 text-gray-800">Logout?</h2>
						<div className="flex justify-between w-full space-x-3">
							<button
								onClick={handleCloseModal}
								className="w-[161px] h-[48px] py-3 text-base bg-white border-[#E1E3F5] border rounded-md hover:bg-gray-400 text-[#737790] transition-colors">
								Cancel
							</button>
							<button
								onClick={handleConfirmLogout}
								className="w-[161px] h-[48px] py-3 text-base bg-[#298DFF] text-white rounded-md  transition-colors">
								Yes
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Main Content */}
			<main className="flex-1 p-2 max-sm:p-0">{children}</main>
		</div>
	);
}

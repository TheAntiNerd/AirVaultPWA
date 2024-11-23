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

	return (
		<div className="flex flex-col lg:flex-row w-full min-h-screen bg-white text-sans">
			{/* Top Bar */}
			<div className="bg-white shadow p-4 flex justify-between items-center lg:hidden">
				<Link to="/" className="flex items-center gap-2 font-semibold">
					<span
						className={`${
							location.pathname.startsWith('/users/new') || location.pathname.startsWith('/groups/new')
								? 'max-sm:hidden'
								: ''
						}`}>
						<LogoIcon />
					</span>
				</Link>
				<button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-800 focus:outline-none">
					<MenuOpenIcon />
				</button>
			</div>

			{/* Sidebar */}
			<aside
				className={`${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0 transition-transform lg:w-64 fixed lg:static inset-0 bg-white text-gray-800 p-4 border-r flex flex-col justify-between z-40`}>
				<div>
					{/* Logo for large screens */}
					<div className="hidden lg:flex items-center gap-2 mb-8">
						<Link to="/" className="flex items-center gap-2 font-semibold">
							<span className="">
								<LogoIcon />
							</span>
						</Link>
					</div>

					<div className="mb-8 lg:hidden flex justify-end">
						<button onClick={() => setIsSidebarOpen(false)} className="text-gray-800 focus:outline-none">
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
											className={`ml-auto transition-transform ${
												accountsOpen ? 'rotate-180' : ''
											}`}>
											{' '}
											<DownArrow />
										</span>
									</div>
								) : (
									<Link
										to={item.path}
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
						className={`flex items-center p-2 my-1 rounded transition-colors ${
							location.pathname === logoutItem.path ? 'bg-[#DBEAFE] text-gray-800' : 'hover:bg-gray-200'
						}`}>
						{logoutItem.icon}
						<span className="ml-3">{logoutItem.name}</span>
					</button>
				</nav>
			</aside>

			{/* Confirm Logout Modal */}
			{showLogoutModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 max-sm:p-3">
					<div className="bg-white p-10 shadow-lg text-center w-[414px] h-[209px] rounded-lg flex flex-col items-center justify-between">
						<h2 className="text-3xl font-medium mb-6 text-gray-800">Logout?</h2>
						<div className="flex justify-between w-full space-x-3">
							<button
								onClick={handleCloseModal}
								className="w-[161px] h-[48px] py-3 text-base bg-white border-[#E1E3F5] border-2 rounded-md hover:bg-gray-400 text-[#737790] transition-colors">
								Cancel
							</button>
							<button
								onClick={handleConfirmLogout}
								className="w-[161px] h-[48px] py-3 text-base bg-[#298DFF] text-white rounded-md hover:bg-blue-600 transition-colors">
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

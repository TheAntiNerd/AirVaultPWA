import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
	{ name: 'Dashboard', path: '/ui/userDashboard', icon: '/ui/grid.svg' },
	{
		name: 'Accounts',
		path: '/ui/accounts',
		icon: '/ui/user.svg',
		submenu: [
			{ name: 'Users', path: '/ui/users' },
			{ name: 'Groups', path: '/ui/groups' },
		],
	},
	{ name: 'Directory', path: '/ui/directory', icon: '/ui/database.svg' },
	{ name: 'Network Shares', path: '/ui/networkShares', icon: '/ui/share.svg' },
	{ name: 'Protection', path: '/ui/protection', icon: '/ui/shield.svg' },
	{
		name: 'Version Update',
		path: '/ui/versionUpdate',
		icon: '/ui/arrow-up-circle.svg',
	},
];

const logoutItem = { name: 'Logout', path: '/auth/login', icon: '/ui/log-out.svg' };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const [accountsOpen, setAccountsOpen] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowLogoutModal(true);
	};

	const handleConfirmLogout = () => {
		setShowLogoutModal(false);
		navigate('/login'); // Redirect to logout path
	};

	const handleCloseModal = () => {
		setShowLogoutModal(false);
	};

	return (
		<div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-100">
			{/* Top Bar */}
			<div className="lg:hidden bg-white shadow p-4 flex justify-between items-center">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2 font-semibold">
					<img src="/logo.svg" alt="Logo" width={32} height={32} />
					<span className="text-lg font-bold text-gray-800"></span>
				</Link>
				{/* Hamburger Icon */}
				<button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-800 focus:outline-none">
					<img src="/ui/menuopen.svg" alt="open menu" width={24} height={24} />
				</button>
			</div>

			{/* Sidebar */}
			<aside
				className={`${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} lg:translate-x-0 transition-transform lg:w-64 fixed lg:static inset-0 bg-white text-gray-800 p-4 border-r flex flex-col justify-between z-40`}>
				<div>
					<div className="mb-8 lg:hidden flex justify-end">
						{/* Close Button */}
						<button onClick={() => setIsSidebarOpen(false)} className="text-gray-800 focus:outline-none">
							<img src="/ui/menuclose.svg" alt="Close Icon" width={24} height={24} />
						</button>
					</div>
					<nav>
						{menuItems.map(item => (
							<div key={item.name}>
								<Link
									to={item.path}
									onClick={e => {
										if (item.submenu) {
											e.preventDefault();
											setAccountsOpen(!accountsOpen);
										}
									}}
									className={`flex items-center p-2 my-1 rounded transition-colors ${
										location.pathname === item.path
											? 'bg-[#DBEAFE] text-gray-800'
											: 'hover:bg-gray-200'
									}`}>
									<img
										src={item.icon}
										alt={`${item.name} Icon`}
										width={24}
										height={24}
										className="mr-3"
									/>
									<span>{item.name}</span>
									{item.submenu && (
										<img
											src="/ui/downarrow.svg"
											alt="Toggle Icon"
											width={16}
											height={16}
											className={`ml-auto transition-transform ${
												accountsOpen ? 'rotate-180' : ''
											}`}
										/>
									)}
								</Link>
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
						<img src={logoutItem.icon} alt="Logout Icon" width={20} height={20} className="mr-3" />
						<span>{logoutItem.name}</span>
					</button>
				</nav>
			</aside>

			{/* Confirm Logout Modal */}
			{showLogoutModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
			<main className="flex-1 p-4 lg:p-20">{children}</main>
		</div>
	);
}

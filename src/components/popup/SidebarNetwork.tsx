import { useEffect, useRef, useState } from 'react';
import {
	DownArrow,
	NetworkIcon,
	RemovePoolsIcons,
	SearchIcon,
	ToggleDarkIcon,
	ToggleGreenIcon,
} from '../../assets/svg';
import DirectoryGroupPopup from './DirectoryGroupPopup';

const SidebarNetwork = () => {
	const users = [
		{ id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
		{ id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
		{ id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin' },
		{ id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor' },
		{ id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Viewer' },
		{ id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'Admin' },
		{ id: 7, name: 'George Clooney', email: 'george@example.com', role: 'Viewer' },
	];

	const groups = [
		{ id: 1, name: 'Marketing Team', role: 'Admin' },
		{ id: 2, name: 'Sales Team', role: 'Viewer' },
		{ id: 3, name: 'Engineering Team', role: 'Admin' },
		{ id: 4, name: 'HR Team', role: 'Editor' },
		{ id: 5, name: 'Finance Team', role: 'Viewer' },
		{ id: 6, name: 'Customer Support', role: 'Admin' },
		{ id: 7, name: 'Product Team', role: 'Viewer' },
	];

	// 3 users and groups at start
	const firstThreeUsers = users.slice(0, 3);
	const remainingUsers = users.slice(3);
	const firstThreeGroups = groups.slice(0, 3);
	const remainingGroups = groups.slice(3);

	const [isToggled, setIsToggled] = useState(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<string>('');

	const [showButton, setShowButton] = useState(false);
	const [showAllUsers, setShowAllUsers] = useState(false);
	const [openGroupDropdownIndex, setOpenGroupDropdownIndex] = useState<number | null>(null);
	const [openUserDropdownIndex, setOpenUserDropdownIndex] = useState<number | null>(null);
	const [popupType, setPopupTypes] = useState<string | null>(null);
	const [clickedItem, setClickedItem] = useState<{
		name: string;
		email?: string;
		role: string;
	} | null>(null);

	const userDropdownRef = useRef<(HTMLDivElement | null)[]>([]);
	const groupDropdownRef = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			// Check user dropdowns
			const isOutsideUserDropdown = userDropdownRef.current.every(
				ref => !ref || !ref.contains(event.target as Node)
			);
			if (isOutsideUserDropdown) {
				setOpenUserDropdownIndex(null);
			}

			// Check group dropdowns
			const isOutsideGroupDropdown = groupDropdownRef.current.every(
				ref => !ref || !ref.contains(event.target as Node)
			);
			if (isOutsideGroupDropdown) {
				setOpenGroupDropdownIndex(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleRoleSelect = (type: 'user' | 'group') => {
		if (type === 'user') {
			// close user dropdown
			setOpenUserDropdownIndex(null);
		} else {
			// close group dropdown
			setOpenGroupDropdownIndex(null);
		}
	};

	const validateInput = (value: string): void => {
		const regex = /^[a-z].*$/; // Must start with a lowercase letter
		if (!regex.test(value)) {
			setError('Input must start with a lowercase letter.');
		} else {
			setError('');
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = e.target.value;
		setInputValue(value);
		validateInput(value);
	};
	const toggleDropdown = (index: number, type: 'group' | 'user') => {
		if (type === 'group') {
			// Close group dropdown if open, otherwise open it
			setOpenGroupDropdownIndex(openGroupDropdownIndex === index ? null : index);
			// Always close user dropdown when opening group dropdown
			setOpenUserDropdownIndex(null);
		} else if (type === 'user') {
			// Close user dropdown if open, otherwise open it
			setOpenUserDropdownIndex(openUserDropdownIndex === index ? null : index);
			// Always close group dropdown when opening user dropdown
			setOpenGroupDropdownIndex(null);
		}
	};

	const handleToggle = () => {
		setIsToggled(!isToggled);
		setShowButton(!showButton);
	};
	const handlePopupClose = () => {
		setClickedItem(null);
		setPopupTypes(null);
	};

	const handlePopup = (index: number, type: 'user' | 'group') => {
		setPopupTypes('directoryEdit');
		if (type === 'user') {
			// Pass the entire user object
			setClickedItem(users[index]);
		} else {
			// Pass the entire group object
			setClickedItem(groups[index]);
		}
	};

	return (
		<div className="text-sans overflow-hidden">
			<div>
				<div className="flex mt-6 text-[#44475B] font-medium text-lg items-center">
					<span className="mr-2">
						<NetworkIcon />
					</span>
					<h1>Network shares</h1>
					<button onClick={handleToggle} className="ml-auto flex items-center justify-center">
						{isToggled ? <ToggleGreenIcon /> : <ToggleDarkIcon />}
					</button>
				</div>

				{/* Share button section */}
				{showButton && (
					<>
						<div className="max-sm:block w-full mb-4 mt-3">
							<label htmlFor="text" className="text-[#44475B] font-medium text-sm">
								Share name*
							</label>
							<div className="max-w-md mx-auto mt-1">
								<input
									type="text"
									tabIndex={-1}
									className={`border rounded-md w-full pl-2 py-2 text-[#9AA1B7] focus:outline-none ${
										error ? 'border-red-500' : 'border-[#C4C7E3] focus:border-blue-500'
									}`}
									placeholder="Enter username"
									value={inputValue}
									onChange={handleChange}
								/>

								{error && <p className="text-red-500 mt-2">{error}</p>}
							</div>
						</div>
						<div className="mt-3 w-full flex">
							<button
								tabIndex={-1}
								className="flex-grow px-4 py-2 border rounded-md font-medium text-[#298DFF] border-[#E1E3F5] bg-white">
								Start share
							</button>
						</div>
					</>
				)}

				{/* Global search bar */}
				<div className="max-sm:block w-full mb-4 mt-6">
					<div className="relative flex items-center">
						<span className="absolute left-2 text-[#9AA1B7]">
							<SearchIcon />
						</span>
						<input
							type="input"
							tabIndex={-1}
							className="border focus:border-blue-500  border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
							placeholder="Search"
						/>
					</div>
				</div>

				{/* Shared Members Section */}
				<div className="mt-6">
					<div className="text-sm font-medium text-[#737790]">
						<p>Shared members</p>
					</div>

					{[...firstThreeUsers, ...(showAllUsers ? remainingUsers : [])].map((user, index) => (
						<div key={user.id} className="mt-3">
							<div className="flex items-center justify-between">
								<div className="flex flex-col">
									<p className="text-[#44475B] font-medium mt-1">{user.name}</p>
									<p
										className="text-[#8C8FA3] text-sm mt-1"
										onClick={() => handlePopup(index, 'user')}>
										{user.email}
									</p>
								</div>

								<div
									ref={el => {
										userDropdownRef.current[index] = el;
									}}
									className="relative flex items-center space-x-3">
									<span className="max-sm:hidden">
										<button
											tabIndex={-1}
											className="mt-2 text-[#737790] border border-[#C4C7E3] rounded-lg px-2 py-2 cursor-pointer flex items-center justify-between"
											onClick={() => toggleDropdown(index, 'user')}>
											<span className="text-[#44475B]">{user.role}</span>
											<span className="text-[#737790] ml-2">
												<DownArrow />
											</span>
										</button>

										{openUserDropdownIndex === index && (
											<ul className="absolute bg-white border border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10 max-h-40 overflow-y-auto">
												{['Default', 'Moderator', 'Admin'].map(option => (
													<li
														key={option}
														onClick={() => handleRoleSelect('user')}
														className="px-4 py-2 hover:bg-[#F1F4FF] cursor-pointer text-[#44475B]">
														{option}
													</li>
												))}
											</ul>
										)}
									</span>
									<div className="max-sm:hidden flex items-center justify-center cursor-pointer">
										<RemovePoolsIcons />
									</div>
								</div>
							</div>
							<p
								onClick={() => handlePopup(index, 'user')}
								className="text-[#298DFF] font-medium text-sm cursor-pointer mt-1 hidden max-sm:block">
								{user.role}
							</p>
						</div>
					))}

					{users.length > 3 && (
						<div className={`flex items-center justify-center mt-4 ${showAllUsers ? 'order-last' : ''}`}>
							<button
								tabIndex={-1}
								onClick={() => setShowAllUsers(!showAllUsers)}
								className="py-2 px-4 bg-white text-[#44475B] rounded font-medium text-sm transition w-full sm:w-auto">
								{showAllUsers ? 'Show Less' : `Show ${users.length - 3} More`}
							</button>
						</div>
					)}
				</div>

				{/* Shared Groups Section */}
				<div className="mt-6">
					<div className="text-sm font-medium text-[#737790]">
						<p>Shared Groups</p>
					</div>

					{[...firstThreeGroups, ...(showAllUsers ? remainingGroups : [])].map((group, index) => (
						<div key={group.id} className="mt-3">
							<div className="flex items-center justify-between z-10 ">
								<div className="flex flex-col">
									<p className="text-[#44475B] font-medium mt-1">{group.name}</p>
								</div>

								<div
									ref={el => {
										groupDropdownRef.current[index] = el;
									}}
									className="relative flex items-center space-x-3">
									<span className="max-sm:hidden">
										<button
											tabIndex={-1}
											className="mt-2 text-[#737790] border border-[#C4C7E3] rounded-lg px-2 py-2 cursor-pointer flex items-center justify-between"
											onClick={() => toggleDropdown(index, 'group')}>
											<span
												className="text-[#44475B]"
												onClick={() => handlePopup(index, 'group')}>
												{group.role}
											</span>
											<span className="text-[#737790] ml-2">
												<DownArrow />
											</span>
										</button>

										{openGroupDropdownIndex === index && (
											<ul className="absolute bg-white border border-[#C4C7E3] rounded-lg shadow-lg mt-1 z-10 max-h-40 overflow-y-auto">
												{['Default', 'Moderator', 'Admin'].map(option => (
													<li
														key={option}
														onClick={() => handleRoleSelect('group')}
														className="px-4 py-2 hover:bg-[#F1F4FF] cursor-pointer text-[#44475B]">
														{option}
													</li>
												))}
											</ul>
										)}
									</span>
									<div className="max-sm:hidden flex items-center justify-center ">
										<button tabIndex={-1} className="cursor-pointer ">
											<RemovePoolsIcons />
										</button>
									</div>
								</div>
							</div>
							<p
								onClick={() => handlePopup(index, 'group')}
								className="text-[#298DFF] font-medium text-sm cursor-pointer mt-1 hidden max-sm:block">
								{group.role}
							</p>
						</div>
					))}

					{groups.length > 3 && (
						<div className={`flex items-center justify-center mt-4 ${showAllUsers ? 'order-last' : ''}`}>
							<button
								tabIndex={-1}
								onClick={() => setShowAllUsers(!showAllUsers)}
								className="py-2 px-4 bg-white text-[#44475B] rounded font-medium text-sm transition w-full sm:w-auto">
								{showAllUsers ? 'Show Less' : `Show ${groups.length - 3} More`}
							</button>
						</div>
					)}
				</div>
			</div>

			{popupType === 'directoryEdit' && clickedItem && (
				<DirectoryGroupPopup
					onClose={handlePopupClose}
					users={[
						{
							username: clickedItem.name,
							email: clickedItem.email || '',
							role: clickedItem.role,
						},
					]}
					groupIndex={0}
				/>
			)}
		</div>
	);
};

export default SidebarNetwork;

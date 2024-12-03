import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../SideMenu';
import { EditIcon, SearchIcon, DownArrow, DeleteIcon, BackArrowIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import Dropdown from '../popup/DropDown';
import EditIPPopup from '../popup/EditIPPopup';
import { default as Logo } from '../../assets/logo.svg';

const SavedIP = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState([
		{
			name: 'AirVault1',
			members: '10.10.10.17',
			connected: 'yes',
		},
		{
			name: 'AirVault1',
			members: '10.10.10.17',
			connected: 'no',
		},
		{
			name: 'AirVault1',
			members: '10.10.10.17',
			connected: 'no',
		},
		{
			name: 'AirVault1',
			members: '10.10.10.17',
			connected: 'no',
		},
	]);

	const [popupType, setPopupType] = useState<string | null>(null);
	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
	const [isAddingIP, setIsAddingIP] = useState(false);
	const [ipName, setIPName] = useState('');
	const [ipAddress, setIPAddress] = useState('');

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleAddUserClick = () => {
		setIsAddingIP(true);
	};
	const handleDropdownToggle = (index: number) => {
		setOpenDropdownIndex(openDropdownIndex === index ? null : index);
	};
	const handleDoneClick = () => {
		if (ipName.trim() && ipAddress.trim()) {
			const newUser = {
				name: ipName,
				members: ipAddress,
				connected: 'no',
			};

			setUsers([...users, newUser]);
			setIPName('');
			setIPAddress('');
			setIsAddingIP(false);

			navigate('/dashboard');
		} else {
			alert('Please enter both IP name and address');
		}
	};

	const handleNavigate = () => {
		navigate('/dashboard');
	};

	const handleDropdownSelect = (option: string) => {
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'Edit' ? 'edit' : 'addGroup');
	};

	const renderConnectionPill = (connected: string) => {
		return connected === 'yes' ? (
			<span className="ml-2 text-xs px-2 py-1 rounded-full  text-[#65C13B] max-sm:-ml-2 font-medium">
				{' '}
				• Connected
			</span>
		) : null;
	};

	if (isAddingIP) {
		return (
			<SideMenu>
				<div className="flex justify-center items-start min-h-screen">
					<div className="w-[1200px] max-sm:w-full h-screen pt-6 px-3 max-sm:px-3 bg-white text-sans ">
						<span className="flex items-center justify-center mb-3">
							<Logo />
						</span>
						<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3 mb-10 text-center">
							Join a network
						</h1>

						<div className="space-y-4 max-w-md mx-auto">
							<div className="mb-6">
								<label htmlFor="ipAddress" className="block  font-medium text-[#44475B]  mb-2">
									Enter the AirVault address
								</label>
								<input
									id="ipAddress"
									type="text"
									className="w-full px-3 py-3 border border-[#C4C7E3] rounded-md focus:outline-none  focus:border-blue-500"
									placeholder="Enter IP address"
									value={ipAddress}
									onChange={e => setIPAddress(e.target.value)}
								/>
							</div>

							<div className="mb-6">
								<label htmlFor="ipName" className="block font-medium text-[#44475B] mb-2">
									Name the network
								</label>
								<input
									id="ipName"
									type="text"
									className="w-full px-3 py-3 border border-[#C4C7E3] rounded-md focus:outline-none focus:border-blue-500"
									placeholder="Enter IP name"
									value={ipName}
									onChange={e => setIPName(e.target.value)}
								/>
							</div>
							<div className="pt-6 flex items-center justify-center">
								<button
									className="px-6 bg-[#298DFF] text-white py-3 rounded-md  transition-colors "
									onClick={handleDoneClick}>
									Join network
								</button>
							</div>
						</div>
					</div>
				</div>
			</SideMenu>
		);
	}

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-6 px-3 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-5">
						<span
							className="cursor-pointer hidden max-sm:flex absolute top-3 left-3 max-sm:mt-1 "
							onClick={() => handleNavigate()}>
							<BackArrowIcon />
						</span>
						<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3 mt-5">Saved IPs</h1>

						{users.length > 0 && (
							<button
								className={`max-sm:hidden bg-[#298DFF] text-white px-5  py-2 rounded-md`}
								onClick={handleAddUserClick}>
								Add new IP
							</button>
						)}
					</div>

					{/* Search bar in mobile */}
					<div className="hidden max-sm:block  max-sm:w-full mb-4 max-sm:px-3">
						<div className="relative flex items-center">
							{/* Search Icon */}
							<span className="absolute left-2 text-[#9AA1B7]">
								<SearchIcon />
							</span>

							{/* Search Input */}
							<input
								type="input"
								className="border focus:border-blue-500 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
								placeholder="Search"
							/>
						</div>
					</div>

					{/* Table and Empty State */}
					<div className="overflow-hidden">
						<div className="overflow-hidden rounded-md border border-[#E1E3F5] max-sm:border-none">
							<div className="overflow-hidden">
								<div className="overflow-hidden rounded-md border border-[#E1E3F5] max-sm:border-none">
									<table className="w-full border-collapse max-sm:overflow-hidden">
										{/* Table Header */}
										<thead className="bg-gray-50">
											<tr>
												<th className="px-6 max-sm:px-3 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
													Name
												</th>
												<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
													<div className="flex flex-col items-end">IP address</div>
												</th>
												<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden"></th>
											</tr>
										</thead>

										<tbody>
											{users.map((user, index) => (
												<tr
													key={index}
													className="border-t max-sm:border-t-0 max-sm:border-b border-[#E1E3F5] max-sm:mb-4 max-sm:rounded-lg"
													onClick={() => handleDropdownToggle(index)} // Handle row click to toggle dropdown
												>
													{/* Desktop Layout */}
													<td className="px-6 py-6 text-[#44475B] max-sm:hidden">
														<div className="flex flex-col items-start">
															<div className="flex items-center">
																<span className="font-regular">{user.name}</span>
																{renderConnectionPill(user.connected)}
															</div>
														</div>
													</td>

													<td className="px-6 py-6 text-gray-600 max-sm:hidden">
														<div className="flex flex-col items-end">{user.members}</div>
													</td>

													<td className="px-4 py-6 text-center max-sm:hidden">
														<Dropdown
															button={
																<button className="text-gray-500 hover:text-gray-700">
																	⋮
																</button>
															}
															onToggle={isOpen => isOpen}>
															<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-2xl rounded-lg w-40 h-24">
																<li
																	className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																	onClick={() => handleDropdownSelect('Remove User')}>
																	<span className="mr-3">
																		<DeleteIcon />
																	</span>
																	Remove
																</li>
																<li
																	className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																	onClick={() => handleDropdownSelect('Edit')}>
																	<span className="mr-3">
																		<EditIcon />
																	</span>
																	Edit
																</li>
															</ul>
														</Dropdown>
													</td>

													{/* Mobile Layout */}
													<div className="hidden max-sm:flex flex-col max-sm:px-3 py-3">
														{/* User Info */}
														<div className="flex items-center justify-between border-t-0">
															<div className="flex flex-col">
																<div className="flex items-center">
																	<span className="text-[#44475B]">{user.name}</span>
																</div>
																<span className="text-xs text-[#737790]">
																	{user.members}
																</span>
																{renderConnectionPill(user.connected)}
															</div>
															<button
																className={`flex items-center justify-center transform transition-transform duration-300 ease-in-out ${
																	openDropdownIndex === index ? 'rotate-180' : ''
																} text-gray-500 hover:text-gray-700`}>
																<DownArrow />
															</button>
														</div>

														{/* Dropdown Expanded View */}
														{openDropdownIndex === index && (
															<div className="px-3 py-2 text-sm text-[#44475B] font-light">
																<div className="flex items-center justify-center mt-6 w-full mx-auto">
																	<button
																		className="flex flex-col items-center justify-center text-[#44475B] gap-2 mx-4"
																		onClick={() =>
																			handleDropdownSelect('Remove User')
																		}>
																		<DeleteIcon />
																		<span className="text-xs">Remove</span>
																	</button>

																	<button
																		className="flex flex-col items-center justify-center text-[#44475B] gap-2 mx-4"
																		onClick={() => handleDropdownSelect('Edit')}>
																		<EditIcon />
																		<span className="text-xs">Edit</span>
																	</button>
																</div>
															</div>
														)}
													</div>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="max-sm:px-3 max-sm:mb-5">
							{users.length > 0 && (
								<button
									className={`hidden max-sm:block max-sm:w-full max-sm:mt-10 py-2 bg-[#298DFF] text-white rounded-md`}
									onClick={handleAddUserClick}>
									Add new IP
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Popups */}
				{popupType === 'removeUser' && <RemoveUserPopup onClose={handlePopupClose} text={'Remove IP?'} />}
				{popupType === 'edit' && <EditIPPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default SavedIP;

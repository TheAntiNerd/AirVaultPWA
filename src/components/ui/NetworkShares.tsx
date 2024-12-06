import { useState } from 'react';
import SideMenu from '../SideMenu';
import {
	EditIcon,
	SearchIcon,
	DownArrow,
	DeleteIcon,
	SwitchIcon,
	ToggleGreenIcon,
	ToggleDarkIcon,
} from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import Dropdown from '../popup/DropDown';
import AddSMBPopup from '../popup/AddSMBPopup';

const NetworkShares = () => {
	const [users, setUsers] = useState([
		{
			name: 'Admin',
			route: '//;10.10.10.17/team',
			path: '/vault',
			status: 'on',
		},
		{
			name: 'Moderators',
			route: `//;10.10.10.17/team`,
			path: '../mt/brahmtal/sgdgg/',
			status: 'off',
		},
		{
			name: 'Freelancers',
			route: '//10.10.10.17/maxteam_editors',
			path: 'let/go/to/brahmtal',
			status: 'off',
		},
		{
			name: 'Editors',
			route: '//0.10.10.17maxteam',
			path: 'ja/na/kale/apn/kam/kr',
			status: 'on',
		},
		{
			name: 'Editors',
			route: '//0.10.10.17maxteam',
			path: 'ja/na/kale/apn/kam/kr',
			status: 'on',
		},
		{
			name: 'Editors',
			route: '//0.10.10.17maxteam',
			path: 'ja/na/kale/apn/kam/kr',
			status: 'on',
		},
		{
			name: 'Editors',
			route: '//0.10.10.17maxteam',
			path: 'ja/na/kale/apn/kam/kr',
			status: 'on',
		},
		{
			name: 'Editors',
			route: '//0.10.10.17maxteam',
			path: 'ja/na/kale/apn/kam/kr',
			status: 'on',
		},
		{
			name: 'Editors',
			route: '//0.10.10.17maxteam',
			path: 'ja/na/kale/apn/kam/kr',
			status: 'on',
		},



	]);

	const [popupType, setPopupType] = useState<string | null>(null);
	const [isHistoryOff, setIsHistoryOff] = useState(true);
	const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleAddUserClick = () => {
		setPopupType('newSmb');
	};
	//handle toggle
	const handleToggle = (index: number, e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent the click from propagating to the row
		const updatedUsers = [...users];
		updatedUsers[index] = {
			...updatedUsers[index],
			status: updatedUsers[index].status === 'on' ? 'off' : 'on',
		};
		setUsers(updatedUsers);
	};

	const handleOnToggle = (type: string) => {
		if (type === 'turnOff') {
			setIsHistoryOff(false);
			setPopupType('turnOff');
		} else if (type === 'turnOn') {
			setIsHistoryOff(true);
			setPopupType('turnOn');
		}
	};
	/* mobile dropdown */
	const toggleMobileDropdown = (index: number, e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent event propagation

		// If the clicked row is the same as the active one, close it; otherwise, open the clicked one
		if (activeDropdownIndex === index) {
			setActiveDropdownIndex(null); // Close the dropdown if it's already open
		} else {
			setActiveDropdownIndex(index); // Open the clicked dropdown and close the others
		}
	};

	const handleDropdownSelect = (option: string) => {
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'Edit group' ? 'editGroup' : 'addGroup');
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-6 max-sm:pt-2 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center space-x-4 max-sm:flex-col ">
							<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3 max-sm:pt-10">SMB</h1>
							<div
								className={` py-1 px-3 rounded-full text-white text-xs max-sm:hidden ${isHistoryOff ? 'bg-green-500' : 'bg-gray-400'
									}`}>
								{isHistoryOff ? 'Active' : 'Disabled'}
							</div>
						</div>

						<div className="flex items-center space-x-6">
							{users.length > 0 && (
								<button
									className={`max-sm:hidden bg-[#298DFF] text-white px-5  py-2 rounded-md shadow-xl`}
									onClick={handleAddUserClick}>
									+ New SMB
								</button>
							)}
							<Dropdown
								button={<button className="text-gray-500 hover:text-gray-700 max-sm:hidden">⋮</button>}
								onToggle={isOpen => isOpen}>
								<ul className="py-2 text-sm text-left text-[#44475B] absolute right-0 top-3 bg-white shadow-xl rounded-lg w-44 h-12">
									{isHistoryOff ? (
										<button
											className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm text-nowrap"
											onClick={() => handleOnToggle('turnOff')}>
											<span className="mr-3">
												<SwitchIcon />
											</span>
											Turn off service
										</button>
									) : (
										<button
											className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm text-nowrap"
											onClick={() => handleOnToggle('turnOn')}>
											<span className="mr-3">
												<SwitchIcon />
											</span>
											Turn On service
										</button>
									)}
								</ul>
							</Dropdown>
						</div>
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
					<div className=" overflow-visible max-sm:pb-32 pb-10">
						<div className=" rounded-md border border-[#E1E3F5] max-sm:border-b max-sm:rounded-none">
							<table className="w-full border-collapse max-sm:overflow-hidden">
								{/* Table Header */}
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600">
											<div className="flex flex-col items-start">Name</div>
										</th>

										<th className="px-20 py-6 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											<div className="flex flex-col items-start ">Path</div>
										</th>

										<th className="px-6 max-sm:px-3 py-6  text-left text-sm font-semibold text-gray-600 ">
											<div className="flex flex-col items-start max-sm:items-end max-sm:mr-20">
												Status
											</div>
										</th>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600 max-sm:hidden ">
											<div className="flex flex-col items-start"></div>
										</th>
									</tr>
								</thead>

								<tbody>
									{users.map((user, index) => (
										<>
											<tr
												key={index}
												className="border-t"
												onClick={e => toggleMobileDropdown(index, e)}>
												{/* Desktop Layout */}
												<td className="px-6 max-sm:px-3 py-4 text-[#44475B] ">
													<div className="flex flex-col items-start">
														<span className="font-regular">{user.name}</span>
														<span className=" text-xs text-[#737790] rounded-full text-left max-w-[150px] truncate">
															{user.route}
														</span>
													</div>
												</td>

												<td className="px-20 max-sm:px-3 py-4 text-gray-600 max-sm:hidden">
													<div className="flex flex-col items-start">{user.path}</div>
												</td>

												<td className="px-6 max-sm:px-3 py-4">
													<div className="flex flex-col items-start">
														<span className="text-gray-600 flex items-center">
															<button
																onClick={e => handleToggle(index, e)}
																className="max-sm:ml-5 flex items-center justify-center">
																{user.status === 'on' ? (
																	<ToggleGreenIcon />
																) : (
																	<ToggleDarkIcon />
																)}
															</button>
															<button
																onClick={e => toggleMobileDropdown(index, e)}
																className="hidden max-sm:flex items-center justify-center ml-8 transform transition-transform duration-200 ease-in-out"
																style={{
																	transform:
																		activeDropdownIndex === index
																			? 'rotate(180deg)'
																			: 'rotate(0deg)',
																}}>
																<DownArrow />
															</button>
														</span>
													</div>
												</td>

												<td className="px-6 py-6 max-sm:hidden">
													<div className="flex items-start justify-center">
														<span className="flex items-center space-x-6 text-gray-600">
															<button onClick={() => handleDropdownSelect('Edit group')}>
																<EditIcon />
															</button>
															<button onClick={() => handleDropdownSelect('Remove User')}>
																<DeleteIcon />
															</button>
														</span>
													</div>
												</td>
											</tr>

											{/* Mobile dropdown */}
											{activeDropdownIndex === index && (
												<tr className="sm:hidden">
													<td colSpan={3} className="px-3 py-3">
														<div className="flex flex-col space-y-2">
															<div className="flex items-center text-[#44475B] font-light">
																<span className="text-sm text-gray-600">Path</span>
																<span className="text-sm text-[#44475B] truncate max-w-[200px] ml-6">
																	{user.path}
																</span>
															</div>
															<div className="flex pt-6 pb-4 justify-center gap-12">
																<button
																	className="flex items-center text-sm text-[#44475B] space-x-2"
																	onClick={() => handleDropdownSelect('Edit group')}>
																	<EditIcon />
																	<span>Edit</span>
																</button>
																<button
																	className="flex items-center text-sm text-[#44475B] space-x-2"
																	onClick={() => handleDropdownSelect('Remove User')}>
																	<DeleteIcon />
																	<span>Delete</span>
																</button>
															</div>
														</div>
													</td>
												</tr>
											)}
										</>
									))}
								</tbody>
							</table>
						</div>
						{/* mobile button */}
						<div className="max-sm:px-3 hidden max-sm:block fixed bottom-10 w-full">
							{users.length > 0 && (
								<button
									className="max-sm:w-full py-3 bg-[#298DFF] text-white rounded-md shadow-xl"
									onClick={handleAddUserClick}
								>
									+ New SMB
								</button>
							)}
						</div>


						{/* Empty State */}
						{users.length === 0 && (
							<div className="flex flex-col items-center justify-center mt-48 text-center max-sm:px-3 max-sm:relative max-sm:mb-4">
								<p className=" text-[#44475B] mb-1">No directories added so far.</p>
								<p className="text-[#44475B] mb-6">
									Click on the <span className="font-bold">“+ New SMB”</span> button to get started.
								</p>
								<button
									className={` px-3 max-sm:block max-sm:w-full max-sm:mt-32 py-2 bg-[#298DFF] text-white rounded-md shadow-xl`}
									onClick={handleAddUserClick}>
									+ New SMB
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Popups */}

				{popupType === 'turnOn' && (
					<RemoveUserPopup
						onClose={handlePopupClose}
						text={'Turn on service?'}
						description={'You can turn it off later.'}
					/>
				)}
				{popupType === 'turnOff' && (
					<RemoveUserPopup
						onClose={handlePopupClose}
						text={'Turn off service?'}
						description={'You can turn it on later.'}
					/>
				)}
				{popupType === 'editGroup' && (
					<AddSMBPopup placeholderh1={'Edit'} placeholderp={'Select folder'} onClose={handlePopupClose} />
				)}
				{popupType === 'removeUser' && <RemoveUserPopup text={'Delete SMB?'} onClose={handlePopupClose} />}
				{popupType === 'newSmb' && (
					<AddSMBPopup onClose={handlePopupClose} placeholderh1={'Add new SMB'} placeholderp={'Location*'} />
				)}
			</div>
		</SideMenu>
	);
};

export default NetworkShares;

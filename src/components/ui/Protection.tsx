import { useState } from 'react';
import SideMenu from '../SideMenu';
import {
	EditIcon,
	SearchIcon,
	DownArrow,
	DeleteIcon,
	ToggleGreenIcon,
	ToggleDarkIcon,
	SwitchIcon,
	SeeMoreIcon,
	BackArrowIcon,
} from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import AddSMBPopup from '../popup/AddSMBPopup';
import FrequencyPopup from '../popup/FrequencyPopup';
import { useNavigate } from 'react-router-dom';

const Protection = () => {
	const [users, setUsers] = useState([
		{
			name: 'Admin',

			path: '22 Oct, 2024 at  11:45',
			status: 'on',
		},
		{
			name: 'Moderators',

			path: '22 Oct, 2024 at  1:45',
			status: 'off',
		},
		{
			name: 'Freelancers',

			path: '23 Oct, 2024 at  11:45',
			status: 'off',
		},
		{
			name: 'Editors',

			path: '24 Oct, 2024 at  11:45',
			status: 'on',
		},
	]);

	const [popupType, setPopupType] = useState<string | null>(null);
	const [isHistoryOff, setIsHistoryOff] = useState(true);
	const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
	const navigate = useNavigate();

	const handleNavigate = (index: number) => {
		navigate('/protection/new', { state: { usersName: users[index]?.name } });
	};
	const handleAddFolder = () => {
		navigate('/protection');
	};
	const handlePopupClose = () => {
		setPopupType(null);
	};

	//handle toggle
	// Update the toggle function to prevent event propagation
	const handleToggle = (index: number, e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent the click from propagating to the row
		const updatedUsers = [...users];
		updatedUsers[index] = {
			...updatedUsers[index],
			status: updatedUsers[index].status === 'on' ? 'off' : 'on',
		};
		setUsers(updatedUsers);
	};

	//history button in mobile
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
	const toggleMobileDropdown = (index: number) => {
		if (openDropdownIndex === index) {
			setOpenDropdownIndex(null); // Close if the same row is clicked
		} else {
			setOpenDropdownIndex(index); // Open the clicked row dropdown
		}
	};

	const handleDropdownSelect = (option: string) => {
		setPopupType(
			option === 'Remove User' ? 'removeUser' : option === 'Edit frequency' ? 'editFrequency' : 'addGroup'
		);
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-6 max-sm:pt-2 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<span
						onClick={() => navigate('/protection')}
						className="hidden max-sm:block absolute left-3 top-20">
						<BackArrowIcon />
					</span>

					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center space-x-4 max-sm:flex-col ">
							<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3 max-sm:mt-12">Protection</h1>
						</div>

						<div className="flex items-center space-x-6">
							<button
								className={`max-sm:hidden bg-[#298DFF] text-white px-5  py-2 rounded-md `}
								onClick={() => handleAddFolder()}>
								+ Add folder
							</button>
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

					{/* Table */}
					<div className="overflow-visible">
						<div className=" rounded-md border border-[#E1E3F5] max-sm:border-b max-sm:rounded-none">
							<table className="w-full border-collapse max-sm:overflow-hidden">
								{/* Table Header */}
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600">
											<div className="flex flex-col items-start">Name</div>
										</th>

										<th className="px-20 py-6 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											<div className="flex flex-col items-start">Last snapshot captured</div>
										</th>

										<th className="px-6 max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600">
											<div className="flex flex-col items-end max-sm:items-end max-sm:mr-16">
												Status
											</div>
										</th>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											<div className="flex flex-col items-start"></div>
										</th>
									</tr>
								</thead>

								<tbody>
									{users.map((user, index) => (
										<>
											<tr
												key={index}
												className="border-t cursor-pointer"
												onClick={() => toggleMobileDropdown(index)} // Toggle dropdown visibility
											>
												{/* Desktop Layout */}
												<td className="px-6 max-sm:px-3 py-4 text-[#44475B]">
													<div className="flex flex-col items-start">
														<span className="font-regular">{user.name}</span>
													</div>
												</td>

												<td className="px-20 max-sm:px-3 py-4 text-gray-600 max-sm:hidden">
													<div className="flex flex-col items-start">{user.path}</div>
												</td>

												<td className="px-6 max-sm:px-3 py-4">
													<div className="flex flex-col items-end">
														<span className="text-gray-600 flex items-center">
															<button
																onClick={e => handleToggle(index, e)}
																className="flex items-center justify-center">
																{user.status === 'on' ? (
																	<ToggleGreenIcon />
																) : (
																	<ToggleDarkIcon />
																)}
															</button>
															<button
																onClick={() => toggleMobileDropdown(index)}
																className="hidden max-sm:flex items-center justify-center ml-8 transform transition-transform duration-200 ease-in-out"
																style={{
																	transform:
																		openDropdownIndex === index
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
															<button
																className="-rotate-90"
																onClick={() => handleNavigate(index)}>
																<DownArrow />
															</button>
															<button onClick={() => handleDropdownSelect('Remove User')}>
																<DeleteIcon />
															</button>
														</span>
													</div>
												</td>
											</tr>

											{/* mobile dropdown */}
											{openDropdownIndex === index && (
												<tr className="sm:hidden">
													<td colSpan={3} className="px-3 py-3">
														<div className="flex flex-col space-y-2">
															<div className="flex items-center text-[#44475B] font-light">
																<span className="text-sm text-gray-600">
																	Last captured
																</span>
																<span className="text-sm text-[#44475B] truncate max-w-[200px] ml-6">
																	{user.path}
																</span>
															</div>
															<div className="flex pt-4 pb-2 justify-center gap-4">
																{isHistoryOff ? (
																	<button
																		className="flex items-center flex-col text-sm text-[#44475B]"
																		onClick={() => handleOnToggle('turnOff')}>
																		<SwitchIcon />
																		<span className="text-nowrap truncate w-[70px] mt-2">
																			Turn off history
																		</span>
																	</button>
																) : (
																	<button
																		className="flex items-center flex-col text-sm text-[#44475B]"
																		onClick={() => handleOnToggle('turnOn')}>
																		<SwitchIcon />
																		<span className="text-nowrap truncate w-[70px] mt-2">
																			Turn on history
																		</span>
																	</button>
																)}
																<button
																	className="flex items-center flex-col text-sm text-[#44475B]"
																	onClick={() =>
																		handleDropdownSelect('Edit frequency')
																	}>
																	<EditIcon />
																	<span className="text-nowrap truncate w-[70px] mt-1">
																		Edit frequency
																	</span>
																</button>
																<button
																	className="flex items-center flex-col text-sm text-[#44475B] mt-1"
																	onClick={() => handleDropdownSelect('Remove User')}>
																	<DeleteIcon />
																	<span className="text-nowrap truncate w-[70px]">
																		Remove folder
																	</span>
																</button>
																<button
																	className="flex items-center flex-col text-sm text-[#44475B]"
																	onClick={() => handleNavigate(index)}>
																	<SeeMoreIcon />
																	<span className="text-nowrap truncate w-[70px] mt-1">
																		See more
																	</span>
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
						<div className="max-sm:px-3 max-sm:mb-5">
							{users.length > 0 && (
								<button
									className="hidden max-sm:block max-sm:w-full max-sm:mt-10 py-2 bg-[#298DFF] text-white rounded-md"
									onClick={() => handleAddFolder()}>
									+ Add folder
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Popups */}

				{popupType === 'removeUser' && (
					<RemoveUserPopup
						text={'Remove this folder?'}
						description={'you can add it again later'}
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'turnOff' && (
					<RemoveUserPopup
						text={'Turn off history?'}
						description={'You can turn it on later.'}
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'turnOn' && (
					<RemoveUserPopup
						text={'Turn on history?'}
						description={'You can turn it off later.'}
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'newSmb' && (
					<AddSMBPopup onClose={handlePopupClose} placeholderh1={'Add new SMB'} placeholderp={'Location*'} />
				)}
				{popupType === 'editFrequency' && <FrequencyPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default Protection;

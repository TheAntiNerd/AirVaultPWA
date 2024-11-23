import { useState } from 'react';
import SideMenu from '../SideMenu';
import { RemoveIcon, EditIcon, UserSettingIcon, SearchIcon, DownArrow, ResetPWIcon } from '../../assets/svg';
import ResetPasswordPopup from '../popup/ResetPasswordPopup';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import EditUserPopup from '../popup/EditUserPopup';
import UserSettingsPopup from '../popup/UserSettingsPopup';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../popup/DropDown';

const UsersCreate = () => {
	const users = [
		{ name: 'Rituraj', username: 'ritu0024', password: '************', status: 'Pending', role: 'Admin' },
		{
			name: 'Rituraj Phukan',
			username: 'ritzphukan00031',
			password: '************',
			status: 'Pending',
			role: 'Moderator',
		},
		{
			name: 'Bishal Bhatt',
			username: 'bishalbhattacharyya20',
			password: '************',
			status: 'Accepted',
			role: 'Admin',
		},
		{
			name: 'Roy Dishant',
			username: 'roydishant1092',
			password: '************',
			status: 'Accepted',
			role: 'Default',
		},
		{
			name: 'Ashutosh Mishra',
			username: 'ashking99996',
			password: '************',
			status: 'Rejected',
			role: 'Default',
		},
	];

	const loggedInUser = { username: 'Rituraj', role: 'Admin' }; //dummy

	const [popupType, setPopupType] = useState<string | null>(null);
	const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState(Array(users.length).fill(false));

	const navigate = useNavigate();

	const getStatusClasses = (status: string) => {
		switch (status) {
			case 'Pending':
				return 'bg-gray-100 text-gray-600';
			case 'Accepted':
				return 'bg-green-100 text-green-600';
			case 'Rejected':
				return 'bg-red-100 text-red-600';
			default:
				return '';
		}
	};

	const handlePopupClose = () => {
		setPopupType(null);
		setSelectedUserIndex(null);
	};

	const handleAddUserClick = () => {
		navigate('/users/new'); // Navigates to the /new route
	};

	const handleDropdownSelect = (option: string, userIndex: number) => {
		setSelectedUserIndex(userIndex); // Set selected user index
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'Edit User' ? 'editUser' : 'userSettings');
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-6 px-3 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3">Users</h1>

						{users.length > 0 && (
							<button
								className={`max-sm:hidden bg-blue-600 text-white px-5  py-2 rounded-md hover:bg-blue-700`}
								onClick={handleAddUserClick}>
								Add user
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
								type="search"
								className="border-2 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
								placeholder="Search"
							/>
						</div>
					</div>

					{/* Table and Empty State */}
					<div className=" overflow-hidden">
						<div className="overflow-hidden rounded-md border border-[#E1E3F5] max-sm:border-b">
							<table className="w-full border-collapse max-sm:overflow-hidden">
								{/* Table Header */}
								<thead className="bg-gray-50">
									<tr>
										<div className="max-sm:flex max-sm:justify-between">
											<th className="px-6 max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600">
												Name
											</th>
											<th className=" hidden max-sm:flex max-sm:justify-end py-6 max-sm:pr-16  text-sm font-semibold text-gray-600">
												Webrole
											</th>
										</div>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											Username
										</th>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											Password
										</th>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											Webrole
										</th>
										<th className="px-6 py-6 text-center text-sm font-semibold text-gray-600 max-sm:hidden"></th>
									</tr>
								</thead>
								<tbody>{/* Table body content here */}</tbody>

								{/* Table Body */}
								<tbody>
									{users.map((user, index) => (
										<tr
											key={index}
											className="border-t max-sm:border-[#E1E3F5] max-sm:mb-4  max-sm:rounded-lg">
											{/* Desktop Layout */}
											<td className="px-6 py-6 text-[#44475B] max-sm:hidden">
												<div className="flex flex-col items-start">
													<span className="font-regular">{user.name}</span>
													<span
														className={`mt-1 text-xs px-2 py-1 rounded-full ${getStatusClasses(
															user.status
														)}`}>
														{user.status}
													</span>
												</div>
											</td>
											<td className="px-6 py-6 text-gray-600 max-sm:hidden">{user.username}</td>
											<td className="px-6 py-4 max-sm:hidden">
												<div className="flex flex-col items-start">
													<span className="text-gray-600">{user.password}</span>
													<a
														className="mt-1 text-blue-500 hover:underline text-sm cursor-pointer"
														onClick={() => {
															setPopupType('resetPassword');
															setSelectedUserIndex(index);
														}}>
														Reset password
													</a>
												</div>
											</td>
											<td className="px-6 py-6 text-gray-600 max-sm:hidden">{user.role}</td>
											<td className="px-4 py-6 text-center max-sm:hidden">
												<Dropdown
													button={
														<button className="text-gray-500 hover:text-gray-700">⋮</button>
													}
													onToggle={isOpen => isOpen && setSelectedUserIndex(index)}>
													<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-2xl rounded-lg w-40 h-32">
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Remove User', index)}>
															<span className="mr-3">
																<RemoveIcon />
															</span>
															Remove User
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Edit User', index)}>
															<span className="mr-3">
																<EditIcon />
															</span>
															Edit User
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() =>
																handleDropdownSelect('User settings', index)
															}>
															<span className="mr-3">
																<UserSettingIcon />
															</span>
															User settings
														</li>
													</ul>
												</Dropdown>
											</td>

											{/* Mobile Layout */}
											<td className="hidden max-sm:block">
												<div className="pt-4 px-3 pb-2 w-full flex items-center">
													<span className="text-[#44475B] text-nowrap">{user.name}</span>

													<div className="flex items-center space-x-2 ml-auto">
														<span className="text-[#44475B] text-sm text-nowrap !text-left">
															{user.role}
														</span>

														<button
															className={`transform transition-transform ${
																dropdownOpen[index] ? 'rotate-180' : ''
															} text-gray-500 hover:text-gray-700`}
															onClick={() => {
																const newOpen = [...dropdownOpen];
																newOpen[index] = !newOpen[index];
																setDropdownOpen(newOpen);
															}}>
															<DownArrow />
														</button>
													</div>
												</div>

												{/* Expanded View */}
												<div>
													{dropdownOpen[index] && (
														<div className="px-3 py-2 text-sm text-[#44475B] font-light">
															<div>
																<span className="font-light mr-6 ">Username</span>{' '}
																{user.username}
															</div>
															<div className="mt-4">
																<span className=" mr-6">Password</span>{' '}
																<span className="">{user.password}</span>
															</div>

															{/* Actions */}
															<div className="flex items-center justify-between mt-6 w-full mb-3">
																<button
																	className="flex flex-col items-center gap-3 text-[#44475B] "
																	onClick={() =>
																		handleDropdownSelect('Remove User', index)
																	}>
																	<div>
																		<RemoveIcon />
																	</div>
																	<span className="text-xs">Remove user</span>
																</button>

																<button
																	className="flex flex-col items-center gap-3 text-[#44475B] "
																	onClick={() =>
																		handleDropdownSelect('Edit User', index)
																	}>
																	<div>
																		<EditIcon />
																	</div>
																	<span className="text-xs">Edit user</span>
																</button>

																<button
																	className="flex flex-col items-center gap-3 text-[#44475B]"
																	onClick={() =>
																		handleDropdownSelect('User settings', index)
																	}>
																	<div>
																		<UserSettingIcon />
																	</div>
																	<span className="text-xs">User settings</span>
																</button>

																<button
																	className="flex flex-col items-center gap-3 text-[#44475B]"
																	onClick={() => {
																		setPopupType('resetPassword');
																		setSelectedUserIndex(index);
																	}}>
																	<div>
																		<ResetPWIcon />
																	</div>
																	<span className="text-xs">Reset PW</span>
																</button>
															</div>
														</div>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="max-sm:px-3 max-sm:mb-5">
							{users.length > 0 && (
								<button
									className={`hidden max-sm:block max-sm:w-full max-sm:mt-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
									onClick={handleAddUserClick}>
									Add user
								</button>
							)}
						</div>

						{/* Empty State */}
						{users.length === 0 && (
							<div className="flex flex-col items-center justify-center mt-24 text-center max-sm:px-3 max-sm:relative">
								<p className=" text-[#44475B] mb-1">No users added so far.</p>
								<p className="text-[#44475B] mb-6">
									Click on the <span className="font-bold">“Add user”</span> button to build your
									team.
								</p>
								<button
									className={`px-3 max-sm:block max-sm:w-full max-sm:mt-28 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
									onClick={handleAddUserClick}>
									Add user
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Popups */}
				{popupType === 'resetPassword' && selectedUserIndex !== null && (
					<ResetPasswordPopup
						onClose={handlePopupClose}
						userRole={loggedInUser.role as 'Owner' | 'Admin' | 'Moderator' | 'Default'}
						targetUserRole={users[selectedUserIndex].role as 'Owner' | 'Admin' | 'Moderator' | 'Default'}
						isOwnPasswordReset={users[selectedUserIndex].username === loggedInUser.username}
					/>
				)}

				{popupType === 'removeUser' && <RemoveUserPopup onClose={handlePopupClose} />}
				{popupType === 'editUser' && <EditUserPopup onClose={handlePopupClose} />}
				{popupType === 'userSettings' && <UserSettingsPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default UsersCreate;

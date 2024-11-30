import { useState } from 'react';
import SideMenu from '../SideMenu';
import { EditIcon, SearchIcon, DownArrow, DeleteIcon, SeeMoreIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../popup/DropDown';
import CreateGroupPopup from '../popup/CreateGroupPopup';

const Groups = () => {
	const users = [
		{
			name: 'Admin',
			members: '20',
			date: '22/12/2023 at 11:45',
		},
		{
			name: 'Moderators',
			members: '52',
			date: '20/12/2023 at 12:35',
		},

		{
			name: 'Freelancers',
			members: '60',
			date: '23/11/2024 at 12:00',
		},
		{
			name: 'Editors',
			members: '65',
			date: '23/11/2024 at 12:00',
		},
	];

	const [popupType, setPopupType] = useState<string | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState(Array(users.length).fill(false));

	const navigate = useNavigate();

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleAddUserClick = () => {
		setPopupType('addGroup');
	};

	const handleDropdownSelect = (option: string) => {
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'Edit User' ? 'editGroup' : 'addGroup');
	};

	const handleGroupClick = (index: number) => {
		navigate('/groups/new', { state: { groupName: users[index]?.name } });
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-6 px-3 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3">Groups</h1>

						{users.length > 0 && (
							<button
								className={`max-sm:hidden bg-blue-600 text-white px-5  py-2 rounded-md hover:bg-blue-700`}
								onClick={handleAddUserClick}>
								Add group
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
								className="border-2 focus:border-blue-500 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
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
											<th className="px-6 max-sm:px-3 py-4 text-left text-sm font-semibold text-gray-600">
												Name
											</th>
											<th className=" hidden max-sm:flex max-sm:justify-end py-4 max-sm:pr-16 mr-2  text-sm font-semibold text-gray-600">
												Members
											</th>
										</div>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
											<div className="flex flex-col items-end">Members</div>
										</th>

										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden ">
											<div className="flex flex-col items-end pr-16">Created on</div>
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden "></th>
										<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden "></th>
									</tr>
								</thead>

								<tbody>
									{users.map((user, index) => (
										<tr
											key={index}
											className="border-t max-sm:border-[#E1E3F5] max-sm:mb-4  max-sm:rounded-lg">
											{/* Desktop Layout */}
											<td className="px-6 py-6 text-[#44475B] max-sm:hidden">
												<div className="flex flex-col items-start">
													<span className="font-regular">{user.name}</span>
													<span className="mt-1 text-xs px-2 py-1 rounded-full"></span>
												</div>
											</td>

											<td className="px-2 pl-20 py-6 text-gray-600 max-sm:hidden">
												<div className="flex flex-col items-center">{user.members}</div>
											</td>

											<td className="px-6  py-4 max-sm:hidden">
												<div className="flex flex-col items-end">
													<span className="text-gray-600">{user.date}</span>
												</div>
											</td>
											<td className="px-6 py-6 text-gray-600 max-sm:hidden">
												<span
													onClick={() => handleGroupClick(index)}
													className="flex flex-col items-center -rotate-90">
													<DownArrow />
												</span>
											</td>
											<td className="px-4 py-6 text-center max-sm:hidden">
												<Dropdown
													button={
														<button className="text-gray-500 hover:text-gray-700">⋮</button>
													}
													onToggle={isOpen => isOpen}>
													<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-2xl rounded-lg w-40 h-24">
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Remove User')}>
															<span className="mr-3">
																<DeleteIcon />
															</span>
															Delete group
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Edit User')}>
															<span className="mr-3">
																<EditIcon />
															</span>
															Edit group
														</li>
													</ul>
												</Dropdown>
											</td>

											{/* Mobile Layout */}
											<td className="hidden max-sm:block">
												<div className="pt-4 px-3 pb-2 w-full flex items-center">
													<span className="text-[#44475B] text-nowrap">{user.name}</span>

													<div className="flex ml-auto space-x-20 items-end">
														<span className="text-[#44475B] text-sm text-nowrap">
															{user.members}
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
																<span className="font-light mr-6 ">Created on </span>{' '}
																{user.date}
															</div>

															{/* Actions */}
															<div className="flex items-center justify-between mt-6 w-full mb-3">
																<button
																	className="flex flex-col items-center gap-3 text-[#44475B] "
																	onClick={() => handleDropdownSelect('Remove User')}>
																	<div>
																		<DeleteIcon />
																	</div>
																	<span className="text-xs">Delete group</span>
																</button>

																<button
																	className="flex flex-col items-center gap-3 text-[#44475B] "
																	onClick={() => handleDropdownSelect('Edit User')}>
																	<div>
																		<EditIcon />
																	</div>
																	<span className="text-xs">Edit group</span>
																</button>

																<button
																	className="flex flex-col items-center gap-3 text-[#44475B]"
																	onClick={() => handleGroupClick(index)}>
																	<div>
																		<SeeMoreIcon />
																	</div>
																	<span className="text-xs">See more</span>
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
									Add Groups
								</button>
							)}
						</div>

						{/* Empty State */}
						{users.length === 0 && (
							<div className="flex flex-col items-center justify-center mt-48 text-center max-sm:px-3 max-sm:relative">
								<p className=" text-[#44475B] mb-1">No Groups added so far.</p>
								<p className="text-[#44475B] mb-6">
									Click on the <span className="font-bold">“Add group”</span> button to create one.
								</p>
								<button
									className={` px-3 max-sm:block max-sm:w-full max-sm:mt-32 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700`}
									onClick={handleAddUserClick}>
									Add group
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Popups */}

				{popupType === 'removeUser' && <RemoveUserPopup onClose={handlePopupClose} text={'Delete group?'} />}
				{popupType === 'editGroup' && (
					<CreateGroupPopup text={'Edit group'} buttonText={'Save'} onClose={handlePopupClose} />
				)}
				{popupType === 'addGroup' && <CreateGroupPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default Groups;

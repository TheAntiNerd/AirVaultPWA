import { useState } from 'react';
import SideMenu from '../SideMenu';
import {
	EditIcon,
	SearchIcon,
	DeleteIcon,
	CollabIcon,
	GroupsIcon,
	DetailsIcon,
	DirectoryIcon,
	BackArrowIcon,
	MenuCloseIcon,
	CreateDirectoryIcon,
} from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';

import Dropdown from '../popup/DropDown';
import CreateGroupPopup from '../popup/CreateGroupPopup';
import AddMemberPopup from '../popup/AddMemberPopup';
import GroupsPopup from '../popup/GroupsPopup';
import SidebarNetwork from '../popup/SidebarNetwork';

const Directory = () => {
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
		{
			name: 'Interns',
			members: '65',
			date: '23/11/2024 at 12:00',
		},
	];

	const [popupType, setPopupType] = useState<string | null>(null);
	const [showSidebar, setShowSidebar] = useState(false);
	const [selectedUser, setSelectedUser] = useState<number | null>(null);

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleDetailsClick = (index: number) => {
		setSelectedUser(index); // Save the selected user index
		setShowSidebar(true); // Show the sidebar
		setPopupType(null);
	};

	const handleSidebarClose = () => {
		setShowSidebar(false);
	};

	const handleAddUserClick = () => {
		setPopupType('addGroup');
	};
	const handleAddGroupClick = () => {
		setPopupType('groups');
	};
	const handleDropdownSelect = (option: string) => {
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'collabs' ? 'collabarators' : 'addGroup');
	};

	return (
		<SideMenu>
			<div className=" lg:flex-row w-full min-h-screen bg-white text-sans">
				<div className="flex justify-center items-start min-h-screen">
					<div
						className={`${showSidebar ? 'w-[920px]' : 'w-[1200px]'
							} max-sm:w-full h-screen pt-10 max-sm:px-0 bg-white text-sans transition-width duration-30`}>
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3 flex items-center">
								<span className="truncate max-w-[200px]">Directory {/* dynamic route */}</span>
							</h1>

							{users.length > 0 && (
								<button
									className={` px-3 ml-3 mr-3 shadow shadow-gray-500/30 max-sm:hidden bottom-0 left-0 right-0 max-sm:mb-4  py-3 border border-[#E1E3F5] text-white bg-[#298DFF] font-medium rounded-md`}
									onClick={handleAddUserClick}>
									<span className="inline-block align-middle">
										<span className="inline-block align-middle mr-2 -mt-1">
											<CreateDirectoryIcon />
										</span>
										New directory
									</span>
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
									className="border  focus:border-blue-500 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
									placeholder="Search"
								/>
							</div>
						</div>

						{/* Table and Empty State */}
						<ul className="w-full list-none max-sm:overflow-visible max-sm:px-2 z-10 max-sm:pb-32">
							{users.map((user, index) => (
								<div className="hover:bg-[#E5F1FF] hover:rounded-md px-2">
									<li key={index} className="py-2 cursor-pointer   ">
										<div className="flex items-center justify-between">
											{/* User Name */}
											<div className="flex my-2">
												<div className="flex items-center justify-center space-x-3">
													<DirectoryIcon />
													<span className="font-regular text-center text-[#44475B]">
														{user.name}
													</span>
												</div>

												<span className="mt-1 text-xs px-2 py-1 rounded-full"></span>
											</div>

											{/* Dropdown */}
											<div className="relative">
												<Dropdown
													button={
														<button className="text-gray-500 hover:text-gray-700 mr-4">
															⋮
														</button>
													}
													onToggle={isOpen => isOpen}>
													<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-md rounded-lg w-48 h-56 z-20 max-sm:overflow-visible">
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Edit User')}>
															<span className="mr-3">
																<EditIcon />
															</span>
															Rename
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('collabs')}>
															<span className="mr-3">
																<CollabIcon />
															</span>
															Collaborators
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={handleAddGroupClick}>
															<span className="mr-3">
																<GroupsIcon />
															</span>
															Groups
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => {
																handleDetailsClick(index);
															}}>
															<span className="mr-3">
																<DetailsIcon />
															</span>
															Details
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Remove User')}>
															<span className="mr-3">
																<DeleteIcon />
															</span>
															Delete directory
														</li>
													</ul>
												</Dropdown>
											</div>
										</div>
									</li>
								</div>
							))}
						</ul>

						<div className="max-sm:px-3 max-sm:mb-5 z-1">
							{users.length > 0 && (
								<button
									className={` hidden max-sm:inline-block shadow shadow-gray-500/30 px-3 ml-3 mr-3 max-sm:fixed bottom-6 left-0 right-0 max-sm:mb-4 py-3 border border-[#E1E3F5] bg-[#298DFF] text-white font-medium rounded-md ${showSidebar ? 'max-sm:hidden' : ''
										} `}
									onClick={handleAddUserClick}>
									<span className="inline-block align-middle">
										<span className="inline-block align-middle mr-2 -mt-1">
											<CreateDirectoryIcon />
										</span>
										New directory
									</span>
								</button>
							)}
						</div>

						{/* Empty State */}
						{users.length === 0 && (
							<div className="flex flex-col items-center justify-center mt-40 text-center max-sm:px-3 max-sm:relative">
								<p className=" text-[#44475B] mb-1">No directories created so far.</p>
								<p className="text-[#44475B] mb-6">
									Click on the <span className="font-bold">“Add directory”</span> button to create
									one.
								</p>
								<button
									className={` px-3 ml-3 mr-3 max-sm:fixed shadow shadow-gray-500/30 bottom-0 left-0 right-0 max-sm:mb-4  py-3 border border-[#E1E3F5] bg-[#298DFF] text-white  rounded-md`}
									onClick={handleAddUserClick}>
									<span className="inline-block align-middle">
										<span className="inline-block align-middle mr-2 -mt-1">
											<CreateDirectoryIcon />
										</span>
										New directory
									</span>
								</button>
							</div>
						)}
					</div>

					{/* Sidebar */}

					{showSidebar && (
						<aside
							className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'
								} lg:translate-x-0  transition-transform w-[360px] max-sm:absolute h-screen max-sm:max-w-full fixed lg:static inset-0 bg-white text-gray-800  flex flex-col justify-between z-50`}>
							<div className="p-4 md:border-l">
								{/* Button for mobile */}
								<button onClick={handleSidebarClose} className="hidden max-sm:block">
									<BackArrowIcon />
								</button>
								{/* H1 for pc */}
								<div className=" flex items-center justify-between mt-5 max-sm:mt-0">
									<div className="max-sm:hidden flex items-center space-x-2">
										<DirectoryIcon />
										<h1 className="text-[#44475B] font-medium text-lg">
											{selectedUser !== null ? users[selectedUser].name : ''}
										</h1>
									</div>

									<span onClick={handleSidebarClose} className="cursor-pointer max-sm:hidden">
										<MenuCloseIcon />
									</span>
								</div>

								<div className="">
									<SidebarNetwork />
								</div>
							</div>
						</aside>
					)}
				</div>

				{/* Popups */}

				{popupType === 'removeUser' && (
					<RemoveUserPopup onClose={handlePopupClose} text={'Delete directory?'} />
				)}
				{popupType === 'editGroup' && (
					<CreateGroupPopup
						text={'Rename directory'}
						buttonText={'Done'}
						placeholder="Name"
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'addGroup' && (
					<CreateGroupPopup
						text={'New directory'}
						buttonText={'Create'}
						placeholder={'Name'}
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'collabarators' && (
					<AddMemberPopup
						onClose={handlePopupClose}
						placeholderh1={'Collabarators'}
						placeholderp={'Access Level'}
					/>
				)}
				{popupType === 'groups' && <GroupsPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default Directory;

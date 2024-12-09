import axiosPost from '@/functions/axios/axiosPost';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CgRemove, Removes, Spinner } from '../svgs';
import GroupDelete from './GroupDelete';
import ClientGroupDelete from './ClientGroupRemove';
import ClientGroupRemove from './ClientGroupRemove';
import ClientGroupUser from './ClientUserRemove';

type Props = {
	setShowPopup: (popup: string) => void;
	breadcrumbs: string[];
	folderName: string;
	fetchContents: () => Promise<void>;
};

const permissionsMap: { [key: string]: string } = {
	'r-x': 'Read',
	rwx: 'Write',
	'--x': 'Traverse',
	'---': 'Deny',
};

export default function DetailsDir({ setShowPopup, breadcrumbs, folderName, fetchContents }: Props) {
	const [userPermissions, setUserPermissions] = useState<{ [key: string]: string }>({});
	const [groupPermissions, setGroupPermissions] = useState<{ [key: string]: string }>({});
	const [loading, setLoading] = useState(true);
	const [popUp, setPopUp] = useState('');
	const [selectedGroupName, setSelectedGroupName] = useState('');
	const [selectedUsername, setSelectedUsername] = useState('');

	// fetch the permissions on the current directory
	async function fetchUserPermissions() {
		try {
			const axiosRes = await axiosPost('/api/directory/user/access-list', {
				path: `./${[...breadcrumbs, folderName].join('/')}`,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data?.success === true) {
				const perms = axiosRes.data?.permissions;
				const mappedPerms = Object.fromEntries(
					Object.entries(perms)
						.filter(([key]) => key !== '')
						.map(([key, value]) => [key, permissionsMap[value as string]])
				);
				setUserPermissions(mappedPerms);
			}
		} catch (error) {
			toast.error('An error has occurred while fetching user permissions!');
		}
	}

	// fetch the groups permissions
	async function fetchGroupPermissions() {
		try {
			const axiosRes = await axiosPost('/api/directory/group/access-list', {
				path: `./${[...breadcrumbs, folderName].join('/')}`,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data?.success === true) {
				const perms = axiosRes.data?.permissions;
				const mappedPerms = Object.fromEntries(
					Object.entries(perms)
						.filter(([key]) => key !== '')
						.map(([key, value]) => [key, permissionsMap[value as string]])
				);
				setGroupPermissions(mappedPerms);
			}
		} catch (error) {
			toast.error('An error has occurred while fetching group permissions!');
		}
	}

	// function to update user permission for directory
	async function updateUserPerm(username: string, permission: string) {
		try {
			// send the request to the server to change the permission
			const axiosRes = await axiosPost('/api/directory/user/grant-access', {
				path: `./${[...breadcrumbs, folderName].join('/')}`,
				username: username,
				permission,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data?.success === true) {
				setUserPermissions(c => ({ ...c, [username]: permission }));
				toast.success('Successfully updated user permission!');
			} else {
				toast.error('Failed to update user permission!');
			}
		} catch (error) {
			toast.error('An error has occurred while updating user permission!');
		}
	}

	// function to update group permission for directory
	async function updateGroupPerm(group_name: string, permission: string) {
		try {
			// send the request to the server to change the permission
			const axiosRes = await axiosPost('/api/directory/group/grant-access', {
				path: `./${[...breadcrumbs, folderName].join('/')}`,
				group: group_name,
				permission,
			});

			if (axiosRes && axiosRes.status === 200 && axiosRes.data?.success === true) {
				setGroupPermissions(c => ({ ...c, [group_name]: permission }));
				toast.success('Successfully updated group permission!');
			} else {
				toast.error('Failed to update group permission!');
			}
		} catch (error) {
			toast.error('An error has occurred while updating group permission!');
		}
	}

	async function fetchData() {
		setLoading(true);
		await fetchUserPermissions();
		await fetchGroupPermissions();
		setLoading(false);
	}
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="fixed right-0 top-0 w-1/4 min-w-96 h-full bg-white z-[110]">
				<div className="w-full h-full p-8">
					<h2 className="text-2xl">Client resources details</h2>

					{loading ? (
						<div className="flex items-center justify-center min-h-screen">
							<div className="loader mb-9" />
						</div>
					) : (
						<>
							<div className="w-full mt-8 flex flex-col gap-4">
								<div className="text-lg text-gray-400">Members</div>
								{Object.keys(userPermissions)?.length !== 0 ? (
									Object.keys(userPermissions)?.map((user, i) => (
										<div
											key={`dir-user-${i}`}
											className="w-full flex flex-row justify-between items-center gap-3">
											<div className="left-side flex basis-[200px] flex-col justify-start items-start gap-2">
												<div className="">{user}</div>
												{/* <div className="text-gray-400 text-sm">rohit@outlook.com</div> */}
											</div>
											<div className="right-side">
												<select
													value={userPermissions[user]}
													onChange={e => {
														updateUserPerm(user, e.target?.value);
													}}
													className="border w-[92px] border-gray-200 rounded-[8px] p-2 outline-none">
													<option value="Read">Read</option>
													<option value="Write">Write</option>
													<option value="Traverse">Traverse</option>
													<option value="Deny">Deny</option>
												</select>
											</div>
											<div
												onClick={() => {
													setPopUp('delete-user');
													setSelectedUsername(user);
												}}>
												<CgRemove />
											</div>
										</div>
									))
								) : (
									<>
										<div className="w-full flex justify-center items-center py-4">
											<div className="text-gray-400 text-sm">
												No users have access to this directory!
											</div>
										</div>
									</>
								)}
							</div>

							<div className="w-full mt-8 flex flex-col gap-4">
								<div className="text-lg text-gray-400">Groups</div>

								{Object.keys(groupPermissions)?.length !== 0 ? (
									Object.keys(groupPermissions)?.map((group, i) => (
										<div
											key={`dir-group-${i}`}
											className="w-full flex flex-row justify-between items-center gap-2">
											<div className="left-side flex basis-[200px] flex-col justify-start items-start gap-2">
												<div className="">{group}</div>
												{/* <div className="text-gray-400 text-sm">rohit@outlook.com</div> */}
											</div>
											<div className="right-side">
												<select
													value={groupPermissions[group]}
													onChange={e => {
														updateGroupPerm(group, e.target?.value);
													}}
													className="border w-[92px] border-gray-200 rounded-[8px] p-2 outline-none">
													<option value="Read">Read</option>
													<option value="Write">Write</option>
													<option value="Traverse">Traverse</option>
													<option value="Deny">Deny</option>
												</select>
											</div>
											<div
												onClick={() => {
													setPopUp('delete-group');
													setSelectedGroupName(group);
												}}>
												<CgRemove />
											</div>
										</div>
									))
								) : (
									<>
										<div className="w-full flex justify-center items-center py-4">
											<div className="text-gray-400 text-sm">
												No groups have access to this directory!
											</div>
										</div>
									</>
								)}
							</div>
						</>
					)}
				</div>
			</div>
			{popUp === 'delete-group' && (
				<ClientGroupRemove
					setShowPopup={setPopUp}
					groupName={selectedGroupName}
					path={`./${[...breadcrumbs, folderName].join('/')}`}
					fetchData={fetchData}
				/>
			)}
			{popUp === 'delete-user' && (
				<ClientGroupUser
					username={selectedUsername}
					path={`./${[...breadcrumbs, folderName].join('/')}`}
					fetchData={fetchData}
					setShowPopup={setPopUp}
				/>
			)}
			<div
				className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[100]"
				onClick={() => setShowPopup('')}></div>
		</>
	);
}

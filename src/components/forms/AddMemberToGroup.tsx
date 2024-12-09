import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import MultiSelectInputForGroup from '../ui/MultiSelectInputForGroup';
import { useLocalStorage } from 'usehooks-ts';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';

export default function AddMemberToGroup({
	handleSuccess,
	handleCancel,
	alreadyMembers,
	groupName,
	getMembersList,
}: any) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const [role, setRole] = useState('');
	const [userList, setUserList] = useState<any[]>([]);
	const [userSelected, setUserSelected] = useState<any[]>([]);

	const onSubmit = async (data: any) => {
		console.log({ ...data, role });

		// Handle adding member to group logic here
		const axiosRes = await axiosPost('/api/group/members/add', {
			groupName: groupName,
			usernames: userSelected,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success('Member(s) added successfully');
		} else {
			toast.error('Failed to add member(s)');
		}

		getMembersList();
		handleSuccess();
	};

	// fetch the list of all users in the system minus the already members of the group
	async function getUserList() {
		const axiosRes = await axiosPost('/api/user/list');
		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			const list = axiosRes?.data?.list;
			const filteredList = list?.filter(
				(user: any) => !alreadyMembers?.some((member: any) => member.username === user.username)
			);
			setUserList(filteredList);
		}
	}

	useEffect(() => {
		getUserList();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
			<div className="mb-4">
				<label className="block mb-2">Enter username</label>
				<MultiSelectInputForGroup
					placeholder="Select users"
					options={userList.map((user: any) => ({ value: user.username, label: user.username }))}
					setUserSelected={setUserSelected}
					getMembersList={getMembersList}
				/>
			</div>

			{/* <div className="mb-4">
				<label className="block mb-2">Select Role</label>
				<Select onValueChange={(value: string) => setRole(value)}>
					<SelectTrigger className="w-full border border-[#C4C7E3] rounded-[8px] h-12">
						<SelectValue placeholder="Select a role" />
					</SelectTrigger>
					<SelectContent className="bg-white">
						<SelectItem value="member">Member</SelectItem>
						<SelectItem value="admin">Admin</SelectItem>
						<SelectItem value="owner">Owner</SelectItem>
					</SelectContent>
				</Select>
			</div> */}

			<div className="flex justify-between">
				<button
					type="button"
					onClick={handleCancel}
					className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
					Cancel
				</button>
				<button
					type="submit"
					className="w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
					Add Member
				</button>
			</div>
		</form>
	);
}

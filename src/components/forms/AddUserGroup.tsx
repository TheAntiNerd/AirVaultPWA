import { useForm } from 'react-hook-form';
import { Input, InputPassword } from '../ui/input';
import { useState } from 'react';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';
import { Spinner } from '../svgs';

export default function AddUserGroup({ handleCancel, closeModal, fetchGroupList }: any) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const password = watch('password');

	const [groupName, setGroupName] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		// handle group creation logic here
		const axiosRes = await axiosPost('/api/group/create', {
			groupName,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
			toast.success(axiosRes?.data?.msg || 'Successfully created group!');
			setLoading(false);
		} else {
			toast.error(axiosRes?.data?.msg || 'Failed to create group!');
			setLoading(false);
		}
		setLoading(false);
		// reload the group list
		fetchGroupList();

		// close the modal
		closeModal();
	};

	return (
		<form onSubmit={e => onSubmit(e)} className="space-y-4 mt-4">
			<Input
				type="text"
				value={groupName}
				placeholder="Some name"
				label="Name your group"
				{...register('name', { required: 'Name is required', onChange: e => setGroupName(e.target.value) })}
			/>
			{errors.name && <span className="text-red-500 text-sm">{errors.name.message as string}</span>}

			<div className="flex justify-between">
				<button
					type="button"
					onClick={handleCancel}
					className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
					Cancel
				</button>
				{/* <button
					type="submit"
					className="w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
					Save Changes
				</button> */}
				<button
							type="submit"
							disabled={loading}
							className="flex items-center justify-center w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
							{loading ? (
								<>
									<Spinner className="w-6 h-6" />
								</>
							) : (
								<span>Save Changes</span>
							)}
						</button>
			</div>
		</form>
	);
}
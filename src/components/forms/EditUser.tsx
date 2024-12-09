import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, InputPassword } from '../ui/input';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';
import { Spinner } from '../svgs';

export default function EditUser({ handleSuccess, handleCancel, username, getUserList }: any) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: any) => {
		setLoading(true);

		if (loading) return;

		// Handle user edit logic here
		if (passwordValue?.length > 0 || confirmPasswordValue?.length > 0) {
			// check if the password matches the confirm password
			if (passwordValue !== confirmPasswordValue) {
				toast.error('Passwords do not match!');
				setLoading(false);
				return;
			}
		}

		if (passwordValue?.length === 0 && (firstName?.length === 0 || lastName?.length === 0)) {
			toast.error('Please enter First name and Last name!');
			setLoading(false);
			return;
		}

		// send the request to the server
		const axiosRes = await axiosPost('/api/user/edit', {
			username,
			firstName,
			lastName,
			password: '',
		});

		if (axiosRes && axiosRes?.status && axiosRes?.data?.success === true) {
			toast.success(axiosRes?.data?.msg || 'Successfully edited the user!');
			await getUserList();
			setLoading(false);
		} else {
			toast.error(axiosRes?.data?.msg || 'Failed to edit the user!');
			setLoading(false);
		}

		handleSuccess();
	};

	// fetch the user details from the server
	async function fetchUserDetails() {
		const axiosRes = await axiosPost('/api/user/basic-details', { username });

		if (axiosRes && axiosRes?.status && axiosRes?.data?.success === true) {
			setFirstName(axiosRes?.data?.details?.first_name);
			setLastName(axiosRes?.data?.details?.last_name);
		}
	}

	useEffect(() => {
		fetchUserDetails();
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="">
			<Input
				value={firstName}
				type="text"
				label="First Name"
				{...register('firstName', {
					value: firstName,
					// required: 'First name is required',
					onChange: e => setFirstName(e?.target?.value),
				})}
			/>
			{errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message as string}</span>}
			<br />
			<Input
				value={lastName}
				type="text"
				label="Last Name"
				{...register('lastName', {
					value: lastName,
					// required: 'Last name is required',
					onChange: e => setLastName(e.target?.value),
				})}
			/>
			{errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message as string}</span>}
			<br />
			{/* <InputPassword
				value={passwordValue}
				label="Enter a New Password"
				{...register('password', {
					value: passwordValue,
					minLength: {
						value: 8,
						message: 'Password must be at least 8 characters long',
					},
					onChange: e => setPasswordValue(e?.target?.value),
				})}
			/>
			{errors.password && <span className="text-red-500 text-sm">{errors.password.message as string}</span>}
			<br />
			<InputPassword
				value={confirmPasswordValue}
				label="Confirm Password"
				{...register('confirmPassword', {
					value: confirmPasswordValue,
					validate: value => value === passwordValue || 'Passwords do not match',
					onChange: e => setConfirmPasswordValue(e?.target?.value),
				})}
			/>
			{errors.confirmPassword && (
				<span className="text-red-500 text-sm">{errors.confirmPassword.message as string}</span>
			)} */}

			<div className="flex justify-between mt-4">
				<button
					type="button"
					onClick={handleCancel}
					className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
					Cancel
				</button>
				<button
					type="submit"
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

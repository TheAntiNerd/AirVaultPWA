import axiosPost from '@/functions/axios/axiosPost';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
	initialState: boolean;
	share_name: string;
};

export default function BallToggle({ initialState, share_name }: Props) {
	const [checked, setChecked] = useState(initialState);
	const [loading, setLoading] = useState(false);

	// function to toggle the state
	async function handleToggleState(newState: boolean) {
		if (loading) return;
		setLoading(true);
		try {
			setChecked(newState);

			if (!share_name) return;

			// send the request to server
			if (newState) {
				const axiosRes = await axiosPost(`/api/smb/start-share`, {
					share_name,
				});

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
					toast.success(axiosRes?.data?.msg || 'Successfully started SMB share!');
				} else {
					toast.error(axiosRes?.data?.msg || 'Failed to start SMB share status!');
				}
			} else {
				const axiosRes = await axiosPost(`/api/smb/stop-share`, {
					share_name,
				});

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
					toast.success(axiosRes?.data?.msg || 'Successfully stopped SMB share!');
				} else {
					toast.error(axiosRes?.data?.msg || 'Failed to toggle SMB share status!');
				}
			}
		} catch (error) {
			toast.error(`Couldn't toggle SMB share status!`);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<div className="relative">
				<label className="inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						value={checked?.toString()}
						className="sr-only peer"
						checked={checked}
						onChange={() => handleToggleState(!checked)}
					/>
					<div className="relative w-11 h-6 bg-gray-200 rounded-full  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
				</label>
			</div>
		</>
	);
}

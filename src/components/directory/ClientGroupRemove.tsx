import axiosPost from '@/functions/axios/axiosPost';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '../svgs';

type Props = {
	setShowPopup: (popup: string) => void;
	groupName: string;
	path: string;
	fetchData: () => Promise<void>;
};

export default function ClientGroupRemove({ setShowPopup, groupName, path, fetchData }: Props) {
	const [loading, setLoading] = useState(false);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		// request to delete the group
		const axiosRes = await axiosPost('/api/directory/group/remove', {
			groupName: groupName,
			path: path,
		});

		if (axiosRes && axiosRes.status === 200 && axiosRes.data.success) {
			toast.success(axiosRes.data.msg || 'Group removed successfully!');
		} else {
			toast.error(axiosRes.data.msg || 'Could not remove group!');
		}

		fetchData();

		setLoading(false);
		setShowPopup('');
	}

	return (
		<>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[120] w-96 rounded-lg">
				<form onSubmit={handleFormSubmit} className="w-full bg-white m-auto rounded-xl p-8">
					<h2 className="text-2xl text-center">Remove group?</h2>

					<div className="text-gray-600 w-full text-center mt-4">This can't be undone</div>
					<div className="flex flex-row justify-between items-center gap-4 mt-6">
						<button
							type="button"
							className="border border-gray-200 w-full text-gray-600 px-4 py-4 rounded-[10px]"
							onClick={() => setShowPopup('')}>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex items-center justify-center bg-blue-500 w-full text-white px-4 py-4 rounded-[10px]">
							{loading ? (
								<>
									<Spinner className="w-6 h-6" />
								</>
							) : (
								<span>Delete</span>
							)}
						</button>
					</div>
				</form>
			</div>

			<div
				className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[111]"
				onClick={() => setShowPopup('')}></div>
		</>
	);
}

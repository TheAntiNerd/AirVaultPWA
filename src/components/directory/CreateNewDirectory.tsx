import axiosPost from '@/functions/axios/axiosPost';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '../svgs';

type Props = {
	setShowPopup: (popup: string) => void;
	breadcrumbs: string[];
	fetchContents: () => void;
};

export default function CreateNewDirectory({ setShowPopup, breadcrumbs, fetchContents }: Props) {
	const [newFolder, setNewFolder] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		// make a request to change the directory name
		const axiosRes = await axiosPost('/api/directory/new', {
			path: `./${[...breadcrumbs, newFolder].join('/')}`,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success('Successfully created directory!');
			await fetchContents();
			setLoading(false);
		} else {
			toast.error('Failed to create directory!');
			setLoading(false);
		}

		setShowPopup('');
		setLoading(false);
	}

	return (
		<>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[110] w-96 rounded-lg">
				<form onSubmit={handleFormSubmit} className="w-full bg-white m-auto rounded-xl p-8">
					<h2 className="text-2xl text-center">New directory</h2>
					<label htmlFor="dir-name" className="flex flex-col gap-2">
						<div className="text-gray-600 mt-4">Name</div>
						<input
							type="text"
							value={newFolder}
							onChange={e => setNewFolder(e.target.value)}
							autoFocus
							id="dir-name"
							placeholder="New directory name"
							className="w-full border border-gray-200 rounded-xl p-4 outline-none border-width-2 focus:border-blue-500"
						/>
					</label>
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
								<span>Create</span>
							)}
						</button>
					</div>
				</form>
			</div>
			<div
				className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[100]"
				onClick={() => setShowPopup('')}></div>
		</>
	);
}

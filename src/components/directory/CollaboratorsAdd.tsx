import axiosPost from '@/functions/axios/axiosPost';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '../svgs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {
	setShowPopup: (popup: string) => void;
	breadcrumbs: string[];
	folderName: string;
};

export default function CollaboratorsAdd({ setShowPopup, breadcrumbs, folderName }: Props) {
	const [usernames, setUsernames] = useState<string[]>([]);
	const [selectedUsername, setSelectedUsername] = useState('');
	const [selectedAccessLevel, setSelectedAccessLevel] = useState('Read');
	const [loading, setLoading] = useState(false);
	const [loadingUsernames, setLoadingUsernames] = useState(true);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		// make a request to change the directory name
		const axiosRes = await axiosPost('/api/directory/user/grant-access', {
			path: `./${[...breadcrumbs, folderName].join('/')}`,
			username: selectedUsername,
			permission: selectedAccessLevel,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success('Successfully granted access to user!');
			setLoading(false);
		} else {
			toast.error('Failed to grant access to user!');
			setLoading(false);
		}

		setShowPopup('');
		setLoading(false);
	}

	// function to fetch the users
	async function fetchUsers() {
		setLoadingUsernames(true);
		try {
			const axiosRes = await axiosPost('/api/user/list', {});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				const usernames = axiosRes?.data?.list
					?.map((user: any) => user?.username || '')
					.filter((n: string) => !!n);
				setUsernames(usernames);
				setSelectedUsername(usernames?.length > 0 ? usernames[0] : '');
			} else {
				toast.error('Failed to fetch users!');
			}
		} catch (error) {
			toast.error('Failed to fetch users!');
		} finally {
			setLoadingUsernames(false);
		}
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[111] w-96 rounded-lg">
				<form onSubmit={handleFormSubmit} className="w-full bg-white m-auto rounded-xl p-8">
					<h2 className="text-2xl text-center">Collaborators</h2>
					<label htmlFor="username" className="flex flex-col gap-2">
						<div className="text-gray-600 mt-4">Username</div>
						<div className="flex items-center">
							<Select
								className="flex-grow w-full relative !max-w-full"
								value={selectedUsername}
								onValueChange={(value: string) => setSelectedUsername(value)}
								required>
								<SelectTrigger className=" border relative border-[#C4C7E3] py-3 text-base text-[#737790] font-normal pl-3 h-[56px] rounded-[8px]">
									<SelectValue
										className="text-base text-[#737790] font-normal"
										placeholder="Select username"
									/>
								</SelectTrigger>
								<SelectContent className="z-[999999999]">
									<SelectGroup>
										{loadingUsernames ? (
											<SelectItem
												className="flex items-center !px-0 justify-center"
												disabled
												value="loader">
												<div className="flex justify-center w-full items-center gap-2">
													<Spinner className="w-5 h-5 inline-block mr-2" />
												</div>
											</SelectItem>
										) : (
											usernames.map((username, index) => (
												<SelectItem key={`username-${index}`} value={username}>
													{username}
												</SelectItem>
											))
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</label>
					<label htmlFor="access-level" className="flex flex-col gap-2">
						<div className="text-gray-600 mt-4">Access level</div>
						<div className="flex items-center">
							<Select
								className="flex-grow w-full relative !max-w-full"
								value={selectedAccessLevel || 'Read'}
								onValueChange={(value: string) => setSelectedAccessLevel(value)}
								required>
								<SelectTrigger className=" border relative border-[#C4C7E3] py-3 text-base text-[#737790] font-normal pl-3 h-[56px] rounded-[8px]">
									<SelectValue
										className="text-base text-[#737790] font-normal"
										placeholder="Select access level"
									/>
								</SelectTrigger>
								<SelectContent className="z-[999999999]">
									<SelectGroup>
										<SelectItem value="Read">Read</SelectItem>
										<SelectItem value="Write">Write</SelectItem>
										<SelectItem value="Traverse">Traverse</SelectItem>
										<SelectItem value="Deny">Deny</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
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
								<span>Done</span>
							)}
						</button>
					</div>
				</form>
			</div>
			<div
				className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[110]"
				onClick={() => setShowPopup('')}></div>
		</>
	);
}

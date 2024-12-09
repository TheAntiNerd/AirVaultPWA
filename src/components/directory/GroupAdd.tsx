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

export default function GroupAdd({ setShowPopup, breadcrumbs, folderName }: Props) {
	const [groupNames, setGroupNames] = useState<string[]>([]);
	const [selectedGroupName, setSelectedGroupName] = useState('');
	const [selectedAccessLevel, setSelectedAccessLevel] = useState('Read');
	const [loading, setLoading] = useState(false);
	const [loadingGroups, setLoadingGroups] = useState(true);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		// make a request to change the directory name
		const axiosRes = await axiosPost('/api/directory/group/grant-access', {
			path: `./${[...breadcrumbs, folderName].join('/')}`,
			group: selectedGroupName,
			permission: selectedAccessLevel,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success('Successfully granted access to group!');
			setLoading(false);
		} else {
			toast.error('Failed to grant access to group!');
			setLoading(false);
		}

		setShowPopup('');
		setLoading(false);
	}

	// function to fetch the groups
	async function fetchGroups() {
		setLoadingGroups(true);
		try {
			const axiosRes = await axiosPost('/api/group/list', {});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				const groupNames = axiosRes?.data?.list
					?.map((group: any) => group?.group_name || '')
					.filter((n: string) => !!n);
				setGroupNames(groupNames);
				setSelectedGroupName(groupNames?.length > 0 ? groupNames[0] : '');
			} else {
				toast.error('Failed to fetch groups!');
			}
		} catch (error) {
			toast.error('Failed to fetch groups!');
		} finally {
			setLoadingGroups(false);
		}
	}

	useEffect(() => {
		fetchGroups();
	}, []);

	return (
		<>
			<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[110] w-96 rounded-lg">
				<form onSubmit={handleFormSubmit} className="w-full bg-white m-auto rounded-xl p-8">
					<h2 className="text-2xl text-center">Groups</h2>
					<label htmlFor="groupname" className="flex flex-col gap-2">
						<div className="text-gray-600 mt-4">Group name</div>
						<div className="flex items-center">
							<Select
								required
								className="flex-grow w-full relative !max-w-full"
								value={selectedGroupName}
								onValueChange={(value: string) => setSelectedGroupName(value)}>
								<SelectTrigger className=" border relative border-[#C4C7E3] py-3 text-base text-[#737790] font-normal pl-3 h-[56px] rounded-[8px]">
									<SelectValue
										className="text-base text-[#737790] font-normal"
										placeholder="Select group"
									/>
								</SelectTrigger>
								<SelectContent className="z-[999999999]">
									<SelectGroup>
										{loadingGroups ? (
											<SelectItem
												className="flex items-center !px-0 justify-center"
												disabled
												value="loader">
												<div className="flex justify-center w-full items-center gap-2">
													<Spinner className="w-5 h-5 inline-block mr-2" />
												</div>
											</SelectItem>
										) : (
											groupNames.map((group_name, index) => (
												<SelectItem key={`groupname-${index}`} value={group_name}>
													{group_name}
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
								required
								className="flex-grow w-full relative !max-w-full"
								value={selectedAccessLevel || 'Read'}
								onValueChange={(value: string) => setSelectedAccessLevel(value)}>
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
				className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[100]"
				onClick={() => setShowPopup('')}></div>
		</>
	);
}

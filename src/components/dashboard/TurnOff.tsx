import axiosPost from '@/functions/axios/axiosPost';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Spinner } from '../svgs';

type Props = {
	setShowPopup: Dispatch<SetStateAction<boolean>>;
};

export default function TurnOff({ setShowPopup }: Props) {
	const [loading, setLoading] = useState(false);
	const [globalLoading, setGlobalLoading] = useState(false);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const axiosRes = await axiosPost(`/api/device/power-off`, {});

		toast.success('Turning off airvault...');

		// start global loading
		setGlobalLoading(true);

		setLoading(false);
	}

	return (
		<>
			{globalLoading !== true ? (
				<>
					<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[110] w-96 rounded-lg">
						<form onSubmit={handleFormSubmit} className="w-full bg-white m-auto rounded-xl p-8">
							<h2 className="text-2xl text-center">Power Off?</h2>

							<div className="text-gray-600 w-full text-center mt-4">AirVault will be powered off</div>
							<div className="flex flex-row justify-between items-center gap-4 mt-6">
								<button
									type="button"
									className="border border-gray-200 w-full text-gray-600 px-4 py-4 rounded-[10px]"
									onClick={() => setShowPopup(false)}>
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
										<span>Power Off</span>
									)}
								</button>
							</div>
						</form>
					</div>

					<div
						className="bg-black opacity-50 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[100]"
						onClick={() => setShowPopup(false)}></div>
				</>
			) : (
				<div className="bg-white w-full h-full fixed top-0 left-0 bottom-0 right-0 z-[100]">
					<div className="flex items-center justify-center min-h-screen">
						<div className="loader mb-9" />
					</div>
				</div>
			)}
		</>
	);
}

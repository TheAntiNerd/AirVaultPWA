import { Metadata } from 'next';
import UpdateFlow from './UpdateFlow';
import axiosPost from '@/functions/axios/axiosPost';
import { configChecker } from '@/functions/config/init';
import { CLOUD_URL } from '@/data/env';

export const metadata: Metadata = {
	title: 'Airvault | Storage-pools',
};

const page = async () => {
	let initialStep = 4;
	let currentVersion = configChecker.configs?.updateConfig?.current_version;

	// check if an update is already downloaded
	const updateDownloaded = configChecker.configs?.updateConfig?.downloaded;

	if (updateDownloaded) {
		initialStep = 2;
	} else {
		// check if there are any updates available
		const axiosRes = await axiosPost(`${CLOUD_URL}/api/update/available-version`, {});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			const newVersion = axiosRes?.data?.details?.version;
			console.log('currentVersion', currentVersion);
			console.log('newVersion', newVersion);
			console.log('currentVersion !== newVersion', currentVersion !== newVersion);

			if (currentVersion !== newVersion) {
				initialStep = 1;
			}
		}
	}

	return <UpdateFlow initialStep={initialStep} currentVersion={currentVersion} />;
};

export default page;

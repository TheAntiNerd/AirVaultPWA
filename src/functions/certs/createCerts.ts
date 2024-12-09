import { MAIN_URL } from '@/data/env';
import axiosPost from '../axios/axiosPost';

// function to create certs if they don't exist
export default async function createCerts(force: boolean = false) {
	let success = false,
		msg = '';
	try {
		let checkPassed = false;
		if (force) {
			// check if the certs already exist
			const axiosRes = await axiosPost(`${MAIN_URL}/api/certs/check`);

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				checkPassed = true;
			}
		} else checkPassed = true;

		// create the certificates
		if (checkPassed) {
			// request to create the certificates
			const axiosRes = await axiosPost(`${MAIN_URL}/api/certs/create`);

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				success = true;
			}
		}

		msg = success
			? 'Successfully created certificates!'
			: checkPassed
			? 'Certificates already exist!'
			: 'Failed to check certificates!';
	} catch (error) {
		console.error(`An error has occurred while creating certificates: Error -> `, error);
	} finally {
		return { success, msg };
	}
}

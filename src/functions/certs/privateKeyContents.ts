import fs from 'fs';
import keyNames from '@/data/keyNames';
import axiosPost from '../axios/axiosPost';
import { MAIN_URL } from '@/data/env';

// function to get the contents of the private key
export default async function privateKeyContents() {
	let success = false,
		msg = '',
		key = '';
	try {
		if (process.env?.NODE_ENV === 'development') {
			// read from the `keys` folder
			const privateKey = fs.readFileSync(`${process.cwd()}/keys/${keyNames.privateKeyName}`, 'utf8');
			key = privateKey;
			success = true;
		} else {
			// fetch the private key contents from the backend
			const axiosRes = await axiosPost(`${MAIN_URL}/api/certs/private`);
			if (axiosRes?.success) {
				key = axiosRes?.data?.key;
				success = true;
			}
		}

		msg = success ? 'Private key contents fetched successfully!' : 'Failed to fetch private key contents!';
	} catch (error) {
		console.error(`An error has occurred while getting private key! Error -> `, error);
		msg = msg || 'Failed to get private key!';
	} finally {
		return { success, msg, key };
	}
}

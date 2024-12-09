import fs from 'fs';
import keyNames from '@/data/keyNames';
import axiosPost from '../axios/axiosPost';
import { MAIN_URL } from '@/data/env';

// function to get the contents of the public key
export default async function publicKeyContents() {
	let success = false,
		msg = '',
		key = '';
	try {
		if (process.env?.NODE_ENV === 'development') {
			// read from the `keys` folder
			const publicKey = fs.readFileSync(`${process.cwd()}/keys/${keyNames.publicKeyName}`, 'utf8');
			key = publicKey;
			success = true;
		} else {
			// fetch the private key contents from the backend
			const axiosRes = await axiosPost(`${MAIN_URL}/api/certs/public`);
			if (axiosRes?.success) {
				key = axiosRes?.data?.key;
				success = true;
			}
		}

		msg = success ? 'Public key contents fetched successfully!' : 'Failed to fetch public key contents!';
	} catch (error) {
		console.error(`An error has occurred while getting public key! Error -> `, error);
		msg = msg || 'Failed to get public key!';
	} finally {
		return { success, msg, key };
	}
}

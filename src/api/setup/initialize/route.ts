import { UserRole } from '@/data/allowedRoles';
import { CLOUD_URL, DEVICE_ID, MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import createCerts from '@/functions/certs/createCerts';
import publicKeyContents from '@/functions/certs/publicKeyContents';
import updateRegistration from '@/functions/config/helpers/updateRegistration';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// route to initialize the vault
export async function POST(request: NextRequest) {
	let success = false,
		msg = '';
	try {
		const userSession = await getServerSession(authOptions);
		const userObj = userSession?.user,
			email = userObj?.email;

		if (!userObj || !email) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		// -> Get the role of the logged in user <-
		const sqlRes1 = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ?`, email);
		if (!sqlRes1) {
			msg = 'Logged in user not found!';
			throw new Error(msg);
		}

		const user_role = sqlRes1?.role || '';

		// make sure that only the admin or mod can edit user data
		if (user_role !== UserRole.OWNER) {
			msg = "You don't have permission to initialize setup!";
			throw new Error(msg);
		}

		// get the front end requests
		const requestJson = await request.json();
		const name = z.string().parse(requestJson?.name),
			diskList: any[] = Array.isArray(requestJson?.diskList) ? requestJson?.diskList : [];

		const devices = diskList?.map(item => item?.device);

		// request generation of key value pairs
		const createCertsRes = await createCerts();
		if (!createCertsRes.success) throw new Error(createCertsRes?.msg || 'Failed to create certificates!');

		// get the contents of the certificates
		const publicKeyRes = await publicKeyContents(),
			publicKey = publicKeyRes?.key || '';

		// register the device on the cloud
		const cloudRes = await axiosPost(`${CLOUD_URL}/api/device/register`, {
			device_id: DEVICE_ID,
			public_key: publicKey,
		});
		if (!cloudRes) {
			msg = 'Failed to register device on the cloud!';
			throw new Error(msg);
		}

		// send the request to the backend server to initialize airvault
		const axiosRes = await axiosPost(`${MAIN_URL}/api/setup/init`, {
			device_name: name,
			device_serial: DEVICE_ID,
			raid_type: 'AUTO',
			devices: devices,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = 'Successfully initialized AirVault!';

			// mark the device as registered
			updateRegistration();
		} else {
			msg = 'Failed to initialize vault!';
		}
	} catch (error) {
		console.error(`Error initializing vault: ${error}`);
		msg = msg || 'Failed to initialize vault!';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

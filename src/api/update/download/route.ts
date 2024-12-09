import { UserRole } from '@/data/allowedRoles';
import { CLOUD_URL, UPDATER_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import { configChecker } from '@/functions/config/init';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// route to download the update
export async function POST(request: NextRequest) {
	let success = false,
		msg = '';
	try {
		// only admin can access this route
		const userSession = await getServerSession(authOptions);
		const userObj = userSession?.user,
			email = userObj?.email;

		if (!userObj || !email) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		// -> Get the role of the logged in user <-
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ?`, email);
		if (!sqlRes) {
			msg = 'Logged in user not found!';
			throw new Error(msg);
		}

		const user_role = sqlRes?.role || '';

		// make sure that only the admin or mod can edit user data
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN) {
			msg = "You don't have permission to download the update!";
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const version = z.string().min(1).safeParse(requestJson?.version).success ? requestJson?.version : '';

		if (!version) {
			msg = 'Invalid version provided!';
			throw new Error(msg);
		}

		// get the available version from the server
		const axiosRes = await axiosPost(`${UPDATER_URL}/api/update/pull`, {
			version,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = axiosRes?.data?.message || 'Update downloaded successfully!';

			configChecker.configsUpdate = {
				...configChecker.configs.updateConfig,
				downloaded: true,
				new_version: version,
			};
		} else {
			msg = axiosRes?.data?.message || 'Could not download the update!';
		}
	} catch (error) {
		console.error(`An error has occurred when checking for updates. Error -> `, error);
		msg = msg || 'Could not check for updates!';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

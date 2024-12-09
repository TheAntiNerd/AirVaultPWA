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
			msg = "You don't have permission to clear downloaded update!";
			throw new Error(msg);
		}

		// get the available version from the server
		const axiosRes = await axiosPost(`${UPDATER_URL}/api/update/clear`, {});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = axiosRes?.data?.message || 'Update cleared successfully!';

			configChecker.configsUpdate = {
				...configChecker.configs.updateConfig,
				downloaded: false,
				new_version: configChecker.configs.updateConfig?.old_version || '0.0.0.',
			};
		} else {
			msg = axiosRes?.data?.message || 'Could not clear the update!';
		}
	} catch (error) {
		console.error(`An error has occurred when clearing the update. Error -> `, error);
		msg = msg || 'Could not clear the update!';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

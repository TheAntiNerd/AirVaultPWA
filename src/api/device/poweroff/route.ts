import { UserRole } from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '';
	try {
		// make sure that the user is logged in
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
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role) {
			msg = "You don't have permission to change name!";
			throw new Error(msg);
		}

		// shutdown the device
		const axiosRes = await axiosPost(`${MAIN_URL}/api/device/power-off`, {});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = 'Successfully turned off airvault!';
		} else {
			msg = 'Failed to turn off airvault!';
		}
	} catch (error) {
		console.error(`An error has occurred while shutting off airvault! Error -> `, error);
	} finally {
		return NextResponse.json({ success, msg });
	}
}

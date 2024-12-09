import { NextResponse } from 'next/server';
import axios from 'axios';
import { MAIN_URL } from '@/data/env';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { UserRole } from '@/data/allowedRoles';

export async function POST(request: Request) {
	let success = false,
		msg = '',
		active = false;
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
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to check SMB status!";
			throw new Error(msg);
		}

		const axiosRes = await axios.post(`${MAIN_URL}/api/service/smb/status`);

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			active = axiosRes?.data?.active;
			msg = axiosRes?.data?.message || 'SMB is active';
		} else {
			msg = axiosRes?.data?.message || 'SMB is not active';
		}
	} catch (error: any) {
		console.error('Error fetching status:', error);
		msg = msg || 'Failed to fetch SMB status';
	} finally {
		return NextResponse.json({ success, msg, active });
	}
}

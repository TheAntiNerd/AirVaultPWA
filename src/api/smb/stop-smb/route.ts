import { NextRequest, NextResponse } from 'next/server';
import { MAIN_URL } from '@/data/env';
import axiosPost from '@/functions/axios/axiosPost';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import sqlAsync from '@/database/sqlAsync';
import { UserRole } from '@/data/allowedRoles';
import tableNames from '@/database/tableNames';

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
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to stop SMB service!";
			throw new Error(msg);
		}

		const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/stop`);

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = axiosRes?.data?.message || 'SMB service stopped';
		} else {
			msg = axiosRes?.data?.message || 'Failed to stop SMB service';
		}
	} catch (error: any) {
		console.error('Error stopping SMB share:', error);
		msg = msg || 'Failed to stop SMB service';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

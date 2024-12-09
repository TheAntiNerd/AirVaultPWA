import { NextRequest, NextResponse } from 'next/server';
import axiosPost from '@/functions/axios/axiosPost';
import { MAIN_URL } from '@/data/env';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { UserRole } from '@/data/allowedRoles';

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
			msg = "You don't have permission to start SMB service!";
			throw new Error(msg);
		}

		// make sure that the user is authorized
		const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/start`);

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = axiosRes?.data?.message || 'SMB service started';
		} else {
			msg = axiosRes?.data?.message || 'Failed to start SMB service';
		}

		return NextResponse.json({ success, msg });
	} catch (error: any) {
		console.error('Error starting SMB:', error);
		msg = msg || 'Failed to start SMB service';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

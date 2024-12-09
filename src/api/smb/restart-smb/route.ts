import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { UserRole } from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import axiosPost from '@/functions/axios/axiosPost';

export async function POST(request: Request) {
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
			msg = "You don't have permission to restart SMB share!";
			throw new Error(msg);
		}

		const body = await request.json();

		const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/restart`, body, {
			headers: { 'Content-Type': 'application/json' },
		});

		success = true;
		msg = 'Successfully restarted SMB service!';
	} catch (error: any) {
		console.error('Error restarting SMB: ', error);
		msg = msg || 'Failed to restart SMB service!';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

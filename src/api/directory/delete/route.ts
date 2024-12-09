import { NextResponse } from 'next/server';
import { z } from 'zod';
import axiosPost from '@/functions/axios/axiosPost';
import { MAIN_URL } from '@/data/env';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { UserRole } from '@/data/allowedRoles';

export async function POST(request: Request) {
	let success = false,
		msg = '';
	try {
		// ensure that the user is logged in
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
			msg = "You don't have permission to delete directory!";
			throw new Error(msg);
		}

		// get the request body
		const requestJson = await request.json();
		const path = z.string().min(1).parse(requestJson.path);

		const axiosRes = await axiosPost(`${MAIN_URL}/api/directory/delete`, {
			path,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = 'Successfully deleted directory!';
		} else {
			msg = 'Failed to delete directory!';
		}
	} catch (error: any) {
		console.error('Error in deleting Directory: ', error);
		msg = msg || 'Failed to delete directory.';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

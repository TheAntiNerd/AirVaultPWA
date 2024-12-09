import { UserRole } from '@/data/allowedRoles';
import { MAIN_URL } from '@/data/env';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import axiosPost from '@/functions/axios/axiosPost';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to change name!";
			throw new Error(msg);
		}

		// get the values
		const requestJson = await request.json();
		const folder = z.string().min(1).parse(requestJson.folder)?.trim(),
			newName = z.string().min(1).parse(requestJson.newName)?.trim();

		console.table({ folder, newName });

		// send the request to the server to rename a folder
		const axiosRes = await axiosPost(`${MAIN_URL}/api/directory/rename`, {
			path: folder,
			new_name: newName,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			success = true;
			msg = 'Successfully changed folder name!';
		} else {
			msg = 'Failed to change folder name!';
		}
	} catch (error) {
		console.error(`An error has occurred while changing name of directory! Error -> `, error);
		msg = msg || 'Failed to change folder name!';
	} finally {
		return NextResponse.json({ success, msg });
	}
}

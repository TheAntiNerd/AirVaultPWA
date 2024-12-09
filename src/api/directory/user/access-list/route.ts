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
		msg = '',
		permissions: { [key: string]: string } = {};
	try {
		// check if the user is logged in
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
			msg = "You don't have permission to check user access list!";
			throw new Error(msg);
		}

		// get the request body
		const requestJson = await request.json();
		const path = z.string().min(1).safeParse(requestJson?.path) ? requestJson?.path : '';

		if (!path) {
			msg = 'Invalid path!';
			throw new Error(msg);
		}

		// get the group access list
		const axiosRes = await axiosPost(`${MAIN_URL}/api/acl/permissions/users`, { path });

		if (axiosRes && axiosRes.status === 200 && axiosRes.data.success) {
			permissions = axiosRes?.data?.permissions || {};
			success = true;
			msg = 'Successfully fetched user permissions for directory!';
		} else {
			msg = 'Failed to fetch user permissions for directory!';
		}
	} catch (error) {
		console.error(`An error has occurred while getting user access list. Error -> `, error);
		msg = msg || 'An error has occurred while getting user access list.';
	} finally {
		return NextResponse.json({ success, msg, permissions });
	}
}

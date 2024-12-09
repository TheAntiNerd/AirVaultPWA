import { NextResponse } from 'next/server';
import axiosPost from '@/functions/axios/axiosPost';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { MAIN_URL } from '@/data/env';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { UserRole } from '@/data/allowedRoles';

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
			msg = "You don't have permission to create SMB share!";
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const folder_path = z.string().min(1).safeParse(requestJson?.folder_path)?.success
				? requestJson?.folder_path
				: '',
			share_name = z.string().min(1).safeParse(requestJson?.share_name)?.success ? requestJson?.share_name : '';

		if (!folder_path || !share_name) {
			success = false;
			msg = 'Invalid request';
			return NextResponse.json({ success, message: msg }, { status: 400 });
		}

		// check if the share name already exists
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.smbshare} WHERE share_name = ?`, [
			share_name,
		]);

		if (sqlRes) {
			msg = 'SMB share name already exists!';
			throw new Error(msg);
		}

		// create the share in the database
		await sqlAsync.runAsync(
			`INSERT INTO ${tableNames.smbshare} (share_name, share_path, active)
            VALUES (?, ?, ?)`,
			[share_name, folder_path, 1]
		);

		const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/create`, {
			folder_path,
			share_name,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
			success = true;
			msg = axiosRes?.data?.message || 'Succesfully created SMB share on folder!';
		} else {
			msg = 'Failed to create SMB share on folder!';

			// Delete the entry from the database
			await sqlAsync.runAsync(`DELETE FROM ${tableNames.smbshare} WHERE share_name = ?`, [share_name]);
		}
	} catch (error: any) {
		console.error('Error sharing folder: ', error);
		msg = msg || "Couldn't create SMB share on folder!";
	} finally {
		return NextResponse.json({
			success,
			msg,
		});
	}
}

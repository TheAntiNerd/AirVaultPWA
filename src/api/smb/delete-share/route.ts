import { NextResponse } from 'next/server';
import axiosPost from '@/functions/axios/axiosPost';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { MAIN_URL } from '@/data/env';
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
			msg = "You don't have permission to delete SMB share!";
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const share_name = requestJson?.share_name;

		// check if the share name exists and is active
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.smbshare} WHERE share_name = ?`, [
			share_name,
		]);

		if (!sqlRes) {
			msg = 'SMB share not found!';
			throw new Error(msg);
		}

		// Call external API to stop the SMB share
		const axiosRes = await axiosPost(`${MAIN_URL}/api/service/smb/delete`, {
			share_name,
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
			// update the share to inactive in the database
			await sqlAsync.runAsync(`DELETE FROM ${tableNames.smbshare} WHERE share_name = ?`, [share_name]);

			success = true;
			msg = axiosRes?.data?.message || 'Successfully deleted SMB share!';
		} else {
			msg = 'Failed to delete SMB share!';
		}
	} catch (error: any) {
		console.error('Error deleting SMB share: ', error);
		msg = msg || "Couldn't delete SMB share!";
	} finally {
		return NextResponse.json({
			success,
			msg,
		});
	}
}

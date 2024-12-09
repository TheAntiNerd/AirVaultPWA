import { NextResponse } from 'next/server';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { UserRole } from '@/data/allowedRoles';

export async function POST() {
	let success = false,
		msg = '',
		list = [];
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
			msg = "You don't have permission to check SMB list!";
			throw new Error(msg);
		}

		// query the SQL table to get the list
		const sqlRes = await sqlAsync.allAsync(`SELECT * FROM ${tableNames.smbshare}`);

		// respond
		list = Array.isArray(sqlRes) ? sqlRes : [];
		success = true;
		msg = 'Successfully fetched list of SMB shares';
	} catch (error: any) {
		console.error('Error listing SMB shares: ', error);
		msg = msg || "Couldn't list SMB shares!";
	} finally {
		return NextResponse.json({
			success,
			msg,
			list,
		});
	}
}

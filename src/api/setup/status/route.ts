import { UserRole } from '@/data/allowedRoles';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { configChecker } from '@/functions/config/init';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// route to check if the setup is complete
export async function POST(request: NextRequest) {
	let success = false,
		msg = '',
		registered = false;
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
			msg = "You don't have permission to check setup status!";
			throw new Error(msg);
		}

		// check if the device is registered
		if (configChecker.configs.mainConfig?.registered === true) {
			registered = true;
		} else {
			registered = false;
		}

		success = true;
		msg = 'Successfully fetched registered config';
	} catch (error) {
		console.error(`Error checking setup status: ${error}`);
		msg = 'Failed to check setup status!';
	} finally {
		return NextResponse.json({ success, msg, registered });
	}
}

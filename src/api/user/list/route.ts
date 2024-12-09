import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '',
		list: any[] = [];
	try {
		// check if the user is logged in here
		const userSession = await getServerSession(authOptions);
		const userObj = userSession?.user,
			email = userObj?.email;

		if (!userObj || !email) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		// fetch the users data from the database
		const usersData = await sqlAsync.allAsync(
			`SELECT username, first_name, last_name, role, email FROM ${tableNames.users} ORDER BY created_at DESC`
		);

		if (usersData) {
			for (let user of usersData) {
				const userObj = {
					firstName: user?.first_name || '',
					lastName: user?.last_name || '',
					username: user?.username || '',
					role: user?.role || '',
					email: user?.email || '',
				};
				list.push(userObj);
			}
		}

		// return the list
		success = Array.isArray(list);
		msg = 'Successfully fetched users list!';
	} catch (error) {
		console.error('An error has occurred while fetching the user list! Error ->', error);
		msg = msg || "Couldn't fetch users list!";
	} finally {
		return NextResponse.json({ success, msg, list });
	}
}

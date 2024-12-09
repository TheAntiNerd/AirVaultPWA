import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '',
		details = {
			first_name: '',
			last_name: '',
		};
	try {
		// check if the user is logged in here
		const userSession = await getServerSession(authOptions);
		const userObj = userSession?.user;

		if (!userObj) {
			msg = 'Please login to continue!';
			throw new Error(msg);
		}

		const requestJson = await request.json();
		const username = z.string().min(1).max(63).safeParse(requestJson?.username) ? requestJson?.username : '';

		// get the basic details of the user
		if (!username) {
			msg = 'Invalid username provided!';
			throw new Error(msg);
		}

		// fetch the user details from the database
		const sqlRes = await sqlAsync.getAsync(
			`SELECT first_name, last_name FROM ${tableNames.users} WHERE username = ?`,
			[username]
		);
		if (!sqlRes) {
			msg = "Couldn't find user!";
			throw new Error(msg);
		}

		details.first_name = sqlRes?.first_name || '';
		details.last_name = sqlRes?.last_name || '';

		// respond
		success = true;
		msg = success ? 'Successfully fetched the user details!' : "Couldn't fetch the user details!";
	} catch (error) {
		console.error('An error has occurred while getting the user details! Error ->', error);
		msg = msg || "Couldn't get the user details!";
	} finally {
		return NextResponse.json({ success, msg, details });
	}
}

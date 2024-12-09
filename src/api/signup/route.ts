import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import hashPassword from '@/functions/passwords/hashPassword';
import axiosPost from '@/functions/axios/axiosPost';
import { MAIN_URL } from '@/data/env';
import { configChecker } from '@/functions/config/init';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '';
	try {
		// this route is only accessible if the device is not registered
		if (configChecker.configs.mainConfig.registered) {
			msg = 'Device already registered!';
			throw new Error(msg);
		}

		// get the request objects from the request
		const requestJson = await request?.json();

		const email = z.string().parse(requestJson?.email),
			username = z.string().parse(requestJson?.username),
			password = z.string().parse(requestJson?.password),
			first_name = z.string().parse(requestJson?.firstName),
			last_name = z.string().parse(requestJson?.lastName);

		// make sure that the email and username doesn't exist in the database
		const sqlRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.users} WHERE email = ? OR username = ?`, [
			email,
			username,
		]);
		if (sqlRes) {
			msg = `Username or email already taken!`;
			throw new Error(msg);
		}

		const usernameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
		if (!usernameRegex.test(username)) {
			msg = 'Invalid username!';
			throw new Error(msg);
		}

		if (z.string().min(1).max(18).safeParse(password).success === false) {
			msg = 'Password too long!';
			throw new Error(msg);
		}

		// check if user exists in the linux system
		/* const linuxRes = await axiosPost(`${MAIN_URL}/api/identity/user/check`, {
			username,
		});
		if (!linuxRes || linuxRes?.data?.exists) {
			msg = `Username already taken!`;
			throw new Error(msg);
		}
 */
		// else signup the user
		const hashed_password = await hashPassword(password);

		await sqlAsync.runAsync(
			`INSERT INTO ${tableNames.users} (username, email, password, first_name, last_name, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[username, email, hashed_password, first_name, last_name, 'owner', Date.now()]
		);

		// create a linux user with the same username
		/* const linuxRes2 = await axiosPost(`${MAIN_URL}/api/identity/user/create`, {
			username,
		});
		if (linuxRes2 && linuxRes2?.data?.success) {
			success = true;
			msg = 'Successfully created user!';
		} else {
			// delete the user from the database if linux user creation failed
			await sqlAsync.runAsync(`DELETE FROM ${tableNames.users} WHERE username = ?`, [username]);

			msg = linuxRes2?.data?.message || 'Failed to create linux user!';
			throw new Error(msg);
		} */

		/* Delete this later */
		success = true;
		msg = 'Successfully created user!';
	} catch (error) {
		console.error(`Error signing up user: ${error}`);
		msg = msg || 'Failed to sign up user!';
	} finally {
		return NextResponse.json({
			success,
			msg,
		});
	}
}

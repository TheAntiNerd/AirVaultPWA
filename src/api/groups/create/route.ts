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
			msg = "You don't have permission to check groups!";
			throw new Error(msg);
		}

		const responseJson = await request.json();
		const groupName = z.string().safeParse(responseJson?.groupName).success ? responseJson?.groupName : '';

		if (!groupName) {
			msg = 'Please enter a group name!';
			throw new Error(msg);
		}

		// group name cannot contain spaces or capital letters and must start with a letter
		const groupNamePattern = /^[a-z][a-z0-9_]*$/;
		if (!groupNamePattern.test(groupName)) {
			msg = 'Group name must start with a letter and contain only lowercase letters, numbers, and underscores!';
			throw new Error(msg);
		}

		// make sure that only the admin or mod can edit user data
		if (user_role !== UserRole.OWNER && user_role !== UserRole.ADMIN && user_role !== UserRole.MODERATOR) {
			msg = "You don't have permission to create a group!";
			throw new Error(msg);
		}

		// check if the group exists in the database
		const groupRes = await sqlAsync.getAsync(`SELECT * FROM ${tableNames.groups} WHERE group_name = ?`, groupName);
		if (groupRes) {
			msg = 'Group already exists!';
			throw new Error(msg);
		}

		// check if the group exists on the linux system
		const linuxRes = await axiosPost(`${MAIN_URL}/api/identity/group/check`, {
			groupName,
		});
		if (!linuxRes || linuxRes?.data?.exists) {
			msg = `Username already taken!`;
			throw new Error(msg);
		}

		// create the group
		await sqlAsync.runAsync(`INSERT INTO ${tableNames.groups} (group_name, created_at) VALUES (?, ?)`, [
			groupName,
			Date.now(),
		]);

		// create the group on the linux system
		const linuxRes2 = await axiosPost(`${MAIN_URL}/api/identity/group/create`, {
			group_name: groupName,
		});
		if (linuxRes2 && linuxRes2?.data?.success) {
			success = true;
			msg = 'Successfully created group!';
		} else {
			// delete the group from the database if linux group creation failed
			await sqlAsync.runAsync(`DELETE FROM ${tableNames.groups} WHERE group_name = ?`, [groupName]);

			msg = linuxRes2?.data?.message || 'Failed to create linux group!';
			throw new Error(msg);
		}
	} catch (error) {
		console.error('An error has occurred while creating a group! Error ->', error);
		msg = msg || "Couldn't create group!";
	} finally {
		return NextResponse.json({ success, msg });
	}
}

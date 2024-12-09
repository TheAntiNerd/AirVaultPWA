import { UserRole } from '@/data/allowedRoles';
import sqlAsync from '@/database/sqlAsync';
import tableNames from '@/database/tableNames';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	let success = false,
		msg = '',
		list: { group_name: string; created_at: number; member_count: number }[] = [];
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
			msg = "You don't have permission to list groups!";
			throw new Error(msg);
		}

		const groupList = await sqlAsync.allAsync(
			`SELECT g.group_name, COUNT(ugr.username) AS member_count, g.created_at AS created_at, ugr.created_at AS user_group_relation_created_at FROM ${tableNames.groups} g LEFT JOIN ${tableNames.userGroupRelation} ugr ON g.group_name = ugr.group_name GROUP BY g.group_name ORDER BY g.created_at DESC`
		);
		if (!groupList) {
			success = true;
			msg = 'No groups found! Please create a group first.';
			return;
		}

		list = groupList?.map(group => ({
			group_name: group?.group_name || '',
			created_at: group?.created_at || '',
			member_count: group?.member_count || 0,
		}));

		success = true;
		msg = 'Successfully fetched group list  !';
	} catch (error) {
		console.error('An error has occurred while fetching the group list! Error ->', error);
		msg = msg || "Couldn't fetch the group list!";
	} finally {
		return NextResponse.json({ success, msg, list });
	}
}

//////////// THIS FEATURE IS NOT IMPLEMENTED YET ////////////

import axiosPost from '@/functions/axios/axiosPost';
import signJWT from '@/functions/jwt/signJWT';
import generateString from '@/functions/random/generateString';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	let success = false,
		msg = '',
		session_id: string | null = null;
	try {
		// make sure that the user is not logged in
		// const userSession = await getServerSession(authOptions);
		const userSession = await getServerSession(),
			user = userSession?.user;

		if (user) {
			throw new Error(`User is already logged in!`);
		}

		// Gather response from the frontend
		const device_id = 'dv_65c4ac6d-8ac4-45b5-9354-6a8742149b4b',
			signed_jwt = await signJWT({ random: generateString(32) });

		// send the request to the backend server to fetch the session key
		const axiosRes = await axiosPost(`https://app.myairvault.com/api/session/generate`, { device_id, signed_jwt });

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
			session_id = axiosRes?.data?.session_id || '';
			console.log('session_id: ', session_id);
		}

		success = !!session_id;
		msg = success ? 'Successfully generated session ID' : 'Failed to generate a session ID';
	} catch (error) {
		console.error(`Error generating session: ${error}`);
		msg = 'Failed to generate a session ID';
	} finally {
		return NextResponse.json(
			{
				success,
				msg,
				session_id,
			},
			{ status: success ? 200 : 400 }
		);
	}
}

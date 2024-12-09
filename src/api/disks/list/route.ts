import { MAIN_URL } from '@/data/env';
import axiosPost from '@/functions/axios/axiosPost';
import { NextResponse } from 'next/server';

export async function POST() {
	let success = false,
		msg = '',
		list = [];

	try {
		// get the list of connected disks
		const axiosRes = await axiosPost(`${MAIN_URL}/api/disks/list`, {
			all: false,
		});

		if (axiosRes && axiosRes.status === 200 && axiosRes?.data) {
			const listData = axiosRes?.data;
			list = listData;
		}

		success = !!list;
		msg = success ? 'Successfully fetch list of disk attached!' : 'Failed to fetch list of disk attached!';
	} catch (error) {
		console.error(`An error has occurred in disks/list route -> ${error}`);
		msg = msg || "Couldn't fetch disk list!";
	} finally {
		return NextResponse.json({
			success,
			msg,
			list,
		});
	}
}

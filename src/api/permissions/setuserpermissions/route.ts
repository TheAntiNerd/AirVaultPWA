import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const response = await axios.post('http://localhost:7777/api/acl/permissions/set_user_perm', body, {
			headers: { 'Content-Type': 'application/json' },
		});

		return NextResponse.json(response.data);
	} catch (error: any) {
		console.error('Error set users permissions:', error);
		const errorMessage = error.response?.data?.message || 'Failed to set users permissions.';
		return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
	}
}

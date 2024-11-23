import { redirect, type RequestEvent } from '@sveltejs/kit';
import { setAT } from './auth-cookies';

export async function refreshToken(e: RequestEvent) {
	const res = await e.fetch('http://localhost:3000/auth/refresh', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) throw redirect(307, '/auth/login');

	const response = await res.json();
	setAT(e, response.accessToken);
}

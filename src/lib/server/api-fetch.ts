import { redirect, type RequestEvent } from '@sveltejs/kit';
import { refreshToken } from './refresh';
import { getAT } from './auth-cookies';

const BASE_URL = 'http://localhost:3000';

interface ApiFetchParam {
	e: RequestEvent<Partial<Record<string, string>>, string | null>;
	path: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: Record<string, unknown>;
	headers?: Record<string, string>;
	auth: boolean;
}

let isRefreshing = false;

export async function apiFetch({
	e,
	path,
	method = 'GET',
	body,
	headers = {},
	auth
}: ApiFetchParam) {
	const url = `${BASE_URL}${path}`;

	// Set up request headers
	const requestHeaders: Record<string, string> = {
		'Content-Type': 'application/json',
		...headers
	};
	if (auth) {
		requestHeaders['Authorization'] = `Bearer ${getAT(e)}`;
	}

	const options: RequestInit = {
		method,
		headers: requestHeaders,
		body: body ? JSON.stringify(body) : undefined
	};

	const res = await fetch(url, options);

	if (path == '/auth/logout') return res;

	// Handle 401 (Unauthorized)
	if (res.status === 401 && auth) {
		console.log('refreshing inside fetch');
		if (!isRefreshing) {
			isRefreshing = true;
			try {
				await refreshToken(e);
				isRefreshing = false;
			} catch (e) {
				console.log(e);
				isRefreshing = false;
				redirect(307, '/auth/login');
			}
		}

		if (auth) {
			requestHeaders['Authorization'] = `Bearer ${getAT(e)}`;
			const retryRes = await fetch(url, options);
			if (!retryRes.ok) {
				throw new Error(`API request failed after retry: ${retryRes.status}`);
			}
			return retryRes;
		}
	}

	return res;
}

import { NODE_ENV } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

const atCookieName = 'accessToken';
const rtCookieName = 'refreshToken';

export function getAT(e: RequestEvent) {
	return e.cookies.get(atCookieName);
}

export function getRT(e: RequestEvent) {
	return e.cookies.get(rtCookieName);
}

export function setAT(e: RequestEvent, value: string) {
	e.cookies.set(atCookieName, value, {
		path: '/',
		httpOnly: false,
		maxAge: 60 * 15,
		sameSite: 'lax',
		priority: 'high',
		secure: NODE_ENV === 'production'
	});
}

export function setRT(e: RequestEvent, value: string) {
	e.cookies.set(rtCookieName, value, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 25 * 7,
		sameSite: 'strict',
		priority: 'high',
		secure: NODE_ENV === 'production'
	});
}

export function clearAuthCookies(e: RequestEvent) {
	e.cookies.delete(atCookieName, { path: '/' });
	e.cookies.delete(rtCookieName, { path: '/' });
}

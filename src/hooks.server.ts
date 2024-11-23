import { clearAuthCookies } from '$lib/server/auth-cookies';
import { getAT, getRT } from '$lib/server/auth-cookies';
import { refreshToken } from '$lib/server/refresh';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Extract tokens from cookies
	const at = getAT(event);
	const rt = getRT(event);

	// Handle login route
	if (event.url.pathname === '/auth/login') {
		// Redirect logged-in users to the homepage
		if (rt) {
			throw redirect(307, '/');
		}
		// Allow unauthenticated users to proceed to login
		return resolve(event);
	}

	// Redirect unauthenticated users to login
	if (!rt) {
		clearAuthCookies(event);
		throw redirect(307, '/auth/login');
	}

	// If access token is missing, attempt to refresh it
	if (!at) {
		try {
			await refreshToken(event); // Refresh logic encapsulated in a helper
		} catch (error) {
			console.error('Token refresh failed:', error);
			clearAuthCookies(event);
			throw redirect(307, '/auth/login');
		}
	}

	// Resolve the request for authenticated users
	return resolve(event);
};

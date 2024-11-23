import { apiFetch } from '$lib/server/api-fetch';
import type { Load } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

/** @type {import('@sveltejs/kit').Load} */
export const load: Load = async (e) => {
	const resourceUrl = `/auth/logout`;
	const res = await apiFetch({ e, auth: true, path: resourceUrl, method: 'POST' });

	if (!res.ok) {
	}

	// redirect(307, ,'/auth/login', e,);
};

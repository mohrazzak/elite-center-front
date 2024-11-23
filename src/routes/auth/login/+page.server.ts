import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './login.schema';
import { type Actions } from '@sveltejs/kit';
import { apiFetch } from '$lib/server/api-fetch';
import { clearAuthCookies, setAT, setRT } from '$lib/server/auth-cookies';
import { redirect } from 'sveltekit-flash-message/server';

export const load = async () => {
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions: Actions = {
	default: async (e) => {
		// Validate the form data
		const form = await superValidate(e, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		clearAuthCookies(e);
		// Make the API request
		let res: Response;
		try {
			res = await apiFetch({
				path: '/auth/login',
				body: form.data,
				e,
				method: 'POST',
				auth: false
			});
		} catch (error) {
			console.error('API request error:', error);
			return setError(form, 'خطأ عند الإتصال في السيرفر.');
		}

		// Set the access token in cookies or session
		const response = await res.json();
		setAT(e, response.accessToken);

		const rt =
			res.headers
				.getSetCookie()
				.find((c) => c.startsWith('refreshToken'))
				?.split('=')[1]
				.split(';')[0] ?? '';
		setRT(e, rt);

		// Redirect to the desired page
		throw redirect(307, '/', { type: 'success', message: 'تم تسجيل الدخول بنجاح.' }, e.cookies);
	}
};

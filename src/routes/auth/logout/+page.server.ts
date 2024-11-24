import { apiFetch } from '$lib/server/api-fetch.js'
import { clearAuthCookies } from '$lib/server/auth-cookies'
import { redirect } from 'sveltekit-flash-message/server'

export const load = async () => {
  console.log('redirected')
  redirect(302, '/')
}

export const actions = {
  async default(e) {


    await apiFetch({ e, path: '/auth/logout', method: 'POST', auth: true, })

    clearAuthCookies(e)

    throw redirect(307, '/', { type: 'success', message: 'تم تسجيل الخروج بنجاح.' }, e.cookies);
  },
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import translation from '$lib/i18n/ar.json';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import i18next from 'i18next';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

i18next.init({
	lng: 'es',
	resources: {
		es: { zod: translation }
	}
});
z.setErrorMap(zodI18nMap);

export const zodAr = z;

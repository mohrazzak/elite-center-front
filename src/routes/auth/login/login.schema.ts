import { zodAr as z } from '$lib/utils';

const usernameSchema = z.string().min(2).max(16);

const passwordSchema = z.string().min(2).max(16);

export const loginSchema = z.object({
	username: usernameSchema,
	password: passwordSchema
});

export type LoginSchema = typeof loginSchema;

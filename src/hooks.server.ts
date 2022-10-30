import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (token) {
		try {
			const {
				payload: { username, name, id }
			} = await jwtVerify(token, new TextEncoder().encode(env.SECRET));
			event.locals = { user: { username, name, id } };
		} catch (e) {
			event.cookies.delete('token');
		}
	}
	const response = await resolve(event);
	return response;
};

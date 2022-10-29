import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (token) {
		const {
			payload: { username, name, id }
		} = await jwtVerify(token, new TextEncoder().encode(env.SECRET));
		event.locals = { username, name, id };
	}
	const response = await resolve(event);
	return response;
};

import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	if (token) {
		event.locals = JSON.parse(token);
	}
	const response = await resolve(event);
	return response;
};

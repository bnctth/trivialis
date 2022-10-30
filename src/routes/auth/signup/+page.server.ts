import type { Actions } from './$types';
import { invalid, json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { genSalt, hash } from 'bcrypt';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		if (!name) {
			return invalid(400, { name, missingName: true });
		}
		if (!username) {
			return invalid(400, { username, missingUsername: true });
		}
		if (!password) {
			return invalid(400, { password, missingPassword: true });
		}
		let user = await prisma.user.findFirst({
			where: { username }
		});
		if (user) {
			return invalid(403, { alreadyTaken: true });
		}
		const passwordHash = await hash(password, await genSalt(10));
		user = await prisma.user.create({ data: { name, username, passwordHash } });
		const token = JSON.stringify({...user});
		cookies.set('token', token, { secure: !dev });
		return { success: true };
	}
};

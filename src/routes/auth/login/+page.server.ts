import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { compare } from 'bcrypt';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		if (!username) {
			return invalid(400, { username, missingUsername: true });
		}
		if (!password) {
			return invalid(400, { password, missingPassword: true });
		}
		const user = await prisma.user.findFirst({
			select: { name: true, username: true, id: true, passwordHash: true },
			where: { username }
		});
		if (!user || !(await compare(password, user.passwordHash))) {
			return invalid(403, { wrongDetails: true });
		}
		const token = JSON.stringify({...user});
		cookies.set('token', token, { secure: !dev });
		return { success: true };
	}
};

import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { compare } from 'bcrypt';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { SignJWT } from 'jose';

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
		const token = await new SignJWT({ name: user.name, username: user.username, id: user.id })
			.setIssuedAt()
			.setProtectedHeader({ alg: 'HS256' })
			.sign(new TextEncoder().encode(env.SECRET));
		cookies.set('token', token, { secure: !dev,path:'/' });
		return { success: true };
	}
};

import { prisma } from '$lib/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (params.username == 'me') throw redirect(307, `./${locals.user.username}`);
	const user = await prisma.user.findUnique({
		where: { username: params.username },
		include: {
			collections: { select: { id: true, models: { select: { id: true } }, title: true } }
		}
	});
	if (!user) throw error(404, 'No such user');
	return user;
};

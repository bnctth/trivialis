import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) throw error(403, 'You need to log in to do this');
	if (
		await prisma.likes.findUnique({ where: { userId: locals.user.id, modelId: params.modelid } })
	) {
		await prisma.likes.delete({ where: { userId: locals.user.id, modelId: params.modelid } });
	} else {
		await prisma.likes.create({ data: { modelId: +params.modelid, userId: locals.user.id } });
	}
	return new Response();
};

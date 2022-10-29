import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params }) => {
	const collection = await prisma.collection.findUnique({
		where: { id: +params.collectionid },
		include: { owner: true, models: true }
	});
	if (!collection || collection.owner.username != params.username)
		throw error(404, 'No such collection!');
	return { collection, modelid: params.modelid };
};

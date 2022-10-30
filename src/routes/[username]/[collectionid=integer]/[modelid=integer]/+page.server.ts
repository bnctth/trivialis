import { prisma } from '$lib/prisma';
import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params, locals }) => {
	const collection = await prisma.collection.findUnique({
		where: { id: +params.collectionid },
		include: {
			owner: true,
			models: {
				include: {
					comments: {
						orderBy: { sentAt: 'desc' },
						include: {
							sender: true
						}
					},
					likes: locals.user ? { where: { userId: locals.user.id } } : false
				}
			}
		}
	});
	if (!collection || collection.owner.username != params.username)
		throw error(404, 'No such collection!');
	console.log(collection);
	return { collection, modelid: params.modelid, userid: locals?.user?.id };
};

export const actions: Actions = {
	comment: async ({ request, locals, params }) => {
		const data = await request.formData();
		const content = data.get('content') as string | null;
		if (!content || !locals.user) return;
		await prisma.comment.create({
			data: { content, modelId: +params.modelid!, senderId: locals.user.id }
		});
	}
};

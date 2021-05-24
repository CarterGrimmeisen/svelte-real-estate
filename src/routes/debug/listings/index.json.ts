import { defineHandler, defineValidator } from '$lib/endpoint'
import * as z from 'zod'

const getValidator = defineValidator({
	query: z.object({
		skip: z.string().regex(/^\d+$/).optional()
	})
})

export const get = defineHandler(getValidator, async ({ query, locals }) => {
	const listings = await locals.prisma.listing.findMany({
		take: 20,
		skip: +query.get('skip')!
	})

	return {
		body: listings
	}
})

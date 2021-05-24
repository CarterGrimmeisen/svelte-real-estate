import { defineHandleHook } from '$lib/hooks'
import { prisma } from '$lib/prisma'

export const handle = defineHandleHook(async ({ request, render }) => {
	request.locals.prisma = prisma

	return render(request)
})

import { defineHandler, defineValidator } from '$lib/endpoint'
import * as z from 'zod'

const userQuery = defineValidator({
    query: z.object({
        name: z.string()
    })
})

export const get = defineHandler(userQuery, ({ query }) => {
	return {
		body: `Hello there, ${query.get('name')}!`
	}
})

const userBody = defineValidator({
	body: z.object({
		name: z.string(),
		age: z.number()
	})
})

export const post = defineHandler(userBody, ({ body }) => {
	return {
		body: {
			name: body.name,
			age: body.age
		}
	}
})

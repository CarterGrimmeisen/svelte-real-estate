import * as z from 'zod'
import { defineHandler } from '$lib/endpoint'

export const get = defineHandler(({ query }) => {
    return {
        body: `Hello there, ${query.get('name')}!`
    }
})

const userBody = z.object({
    name: z.string(),
    age: z.number(),
})

export const post = defineHandler(userBody, ({ body }) => {
    return {
        body: {
            name: body.name,
            age: body.age,
        }
    }
})
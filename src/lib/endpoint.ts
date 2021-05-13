import type { RequestHandler } from '@sveltejs/kit'
import type z from 'zod'

type Validator = {
	body?: z.AnyZodObject
	query?: z.AnyZodObject
}

type BodyType<T extends Validator> = T extends { body: z.AnyZodObject } ? z.infer<T['body']> : never

type Handler<T extends Validator> = RequestHandler<Locals, BodyType<T>>

export const defineValidator = <T extends Validator>(validator: T): T => validator

export function defineHandler(handler: RequestHandler<Locals, never>): RequestHandler<Locals, never>
export function defineHandler<T extends Validator>(zod: T, handler: Handler<T>): Handler<T>
export function defineHandler<T extends Validator>(
	zodOrHandler: T | Handler<T>,
	endpoint?: RequestHandler<Locals, BodyType<T>>
): Handler<T> {
	if (typeof zodOrHandler !== 'function') {
		return (req) => {
			if (zodOrHandler.body) {
				const body = zodOrHandler.body.safeParse(req.body)
				if (body.success === false) {
					return {
						status: 400,
						body: {
                            error: 'Bad Request',
                            message: 'Errors were encountered validating request body',
                            ...body.error.flatten()
                        }
					}
				}

				req.body = body.data as typeof req.body
			}

			if (zodOrHandler.query) {
				// @ts-expect-error I promise this works
				const query = zodOrHandler.query.safeParse(Object.fromEntries(req.query))
				if (query.success === false) {
					return {
						status: 400,
						body: {
                            error: 'Bad Request',
                            message: 'Errors were encountered validating request query',
                            ...query.error.flatten()
                        }
					}
				}

				req.query = new URLSearchParams(query.data)
			}

			return endpoint?.(req)
		}
	}

	return zodOrHandler
}

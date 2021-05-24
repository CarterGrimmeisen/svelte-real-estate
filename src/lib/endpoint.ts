import type {
	EndpointOutput as KitEndpointOutput,
	ServerRequest
} from '@sveltejs/kit/types/endpoint'
import type * as z from 'zod'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ZodAnyObject = z.ZodObject<any, any, any>

type Validator = {
	body?: ZodAnyObject
	query?: ZodAnyObject
}

type BodyType<T extends Validator> = T extends { body: ZodAnyObject } ? z.infer<T['body']> : never

export type ErrorOutput = { status: 400; body: ReturnType<z.ZodError['flatten']> }

type EndpointOutput = KitEndpointOutput | Promise<KitEndpointOutput> | void

export type RequestHandler<T extends EndpointOutput, Body = unknown> = (
	request: ServerRequest<Locals, Body>
) => T

type Handler<T extends Validator, U extends EndpointOutput> = RequestHandler<U, BodyType<T>>

export const defineValidator = <T extends Validator>(validator: T): T => validator

export function defineHandler<U extends EndpointOutput>(
	handler: Handler<never, U>
): Handler<never, U>

export function defineHandler<T extends Validator, U extends EndpointOutput>(
	zod: T,
	handler: Handler<T, U>
): Handler<T, U | ErrorOutput>

export function defineHandler<T extends Validator, U extends EndpointOutput>(
	zodOrHandler: T | Handler<T, U>,
	endpoint?: Handler<T, U>
): Handler<T, U | ErrorOutput> {
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

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return endpoint!(req)
		}
	}

	return zodOrHandler
}

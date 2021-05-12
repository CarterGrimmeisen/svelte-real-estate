import type z from 'zod'
import type { RequestHandler } from '@sveltejs/kit'

type BodyType<T extends z.ZodTypeAny> = z.infer<T>

export function defineHandler(zodOrHandler: RequestHandler<Locals, never>): RequestHandler<Locals, never>
export function defineHandler<T extends z.ZodTypeAny>(zod: T, handler: RequestHandler<Locals, BodyType<T>>): RequestHandler<Locals, BodyType<T>>
export function defineHandler<T extends z.ZodTypeAny>(zodOrHandler: T | RequestHandler, endpoint?: RequestHandler<Locals, typeof zodOrHandler extends T ? BodyType<T> : never>): RequestHandler<Locals, BodyType<T> | never> {
    if ('_def' in zodOrHandler) {
        return (req) => {
            if (zodOrHandler) {
                if (req.body) {
                    const body = zodOrHandler.safeParse(req.body)
                    if (body.success === false) {
                        return {
                            status: 400,
                            body: body.error.flatten()
                        }
                    }
                }
            }

            return endpoint?.(req)
        }
    }

    return zodOrHandler
}
import type { Handle } from '@sveltejs/kit'

export function defineHandleHook(handle: Handle<Locals>): Handle<Locals> {
	return handle
}

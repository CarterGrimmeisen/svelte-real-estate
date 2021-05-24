/// <reference types="@sveltejs/kit" />

import type { PrismaClient } from '@prisma/client'

declare global {
	interface Locals {
		prisma: PrismaClient
	}
}

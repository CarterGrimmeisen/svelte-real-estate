import type { Listing, Room } from ".prisma/client";

export type CreateRoom = Omit<Room, 'id' | 'listingMlsn'>

export type CreateListing = Listing & {
  rooms: CreateRoom[]
}

export const createDefaultListing = (): Partial<CreateListing> & { images: string[], rooms: CreateRoom[] } => ({
  images: [],
  rooms: []
})
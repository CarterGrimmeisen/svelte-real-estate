/// <reference types="../src/types/faker" />

import Prisma from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import faker from 'faker'

dotenv.config()

const prisma = new Prisma.PrismaClient()

export async function main(): Promise<void> {
	const agencies = await Promise.all(
		Array.from({ length: faker.datatype.number({ min: 5, max: 12 }) }, async () => {
			const state = faker.address.stateAbbr()
			return prisma.agency.create({
				data: {
					name:
						faker.company.companyName() + faker.random.arrayElement([' Real Estate', ' Realty']),
					address:
						faker.address.streetAddress() +
						', ' +
						faker.address.city() +
						', ' +
						state +
						' ' +
						faker.address.zipCodeByState(state),
					phone: faker.phone.phoneNumber()
				}
			})
		})
	)

	const length = faker.datatype.number({ min: 15, max: 30 })
	const users = await Promise.all(
		Array.from({ length }, async () => {
			const email = faker.internet.email()
			const password = faker.internet.password()
			const type = faker.random.arrayElement(['USER', 'AGENT', 'ADMIN'] as const)
			return prisma.user.create({
				data: {
					email,
					type,
					name: faker.name.findName(),

					...(type === 'AGENT' && {
						agency: {
							connect: { id: faker.random.arrayElement(agencies).id }
						}
					}),

					auth: {
						create: {
							hash: await bcrypt.hash(password, 10)
						}
					}
				}
			})
		})
	)

	const plainUsers = users.filter((each) => each.type === 'USER')
	const agents = users.filter((each) => each.type === 'AGENT')

	const listings = await Promise.all(
		Array.from({ length: faker.datatype.number({ min: 30, max: 50 }) }, async () => {
			const mlsn = faker.datatype.number({ min: 1000000, max: 9999999 }).toString()
			const state = faker.address.stateAbbr()
			return prisma.listing.create({
				data: {
					mlsn,
					state,
					alarmInfo: faker.fake(
						'Alarm Code {{datatype.number}}<br />Home Security Information:<br />{{lorem.paragraph}}'
					),
					bathrooms: faker.datatype.float({ min: 1, max: 4.5, precision: 0.5 }),
					bedrooms: faker.datatype.number({ min: 1, max: 7 }),
					city: faker.address.city(),
					dailyHits: faker.datatype.number(10_000),
					description: faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 5 })),
					hoa: faker.datatype.boolean(),
					occupied: faker.datatype.boolean(),
					price: faker.datatype.number({ min: 70_000, max: 800_000, precision: 5_000 }),
					sqft: faker.datatype.number({ min: 800, max: 4_000, precision: 200 }),
					street: faker.address.streetAddress(),
					zipcode: parseInt(faker.address.zipCodeByState(state)),
					agent: {
						connect: { email: faker.random.arrayElement(agents).email }
					},

					images: Array.from({ length: faker.datatype.number({ min: 2, max: 6 }) }, () =>
						faker.image.unsplash.image(undefined, undefined, 'house')
					),

					likedBy: {
						connect: faker.random
							.arrayElements(users, faker.datatype.number({ min: 0, max: 7 }))
							.map(({ email }) => ({ email }))
					},

					rooms: {
						create: Array.from({ length: faker.datatype.number(6) }, () => ({
							name:
								faker.random.arrayElement(['', '', '', 'Master ', 'Upstairs ']) +
								faker.random.arrayElement(['Living Room', 'Bedroom', 'Dining Room', 'Kitchen']),
							description: faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 2 }))
						}))
					},

					schools: {
						create: Array.from({ length: faker.datatype.number({ min: 1, max: 3 }) }, () => ({
							name:
								faker.random.arrayElement([faker.address.city(), faker.address.county()]) +
								faker.random.arrayElement([' Elementary', ' Middle', ' High']) +
								' School',
							grades: faker.random.arrayElement([
								[1, 5],
								[6, 8],
								[9, 12]
							])
						}))
					}
				}
			})
		})
	)

	await Promise.all(
		Array.from({ length: faker.datatype.number({ min: 7, max: 45 }) }, async () => {
			return prisma.showing.create({
				data: {
					where: {
						connect: {
							mlsn: faker.random.arrayElement(listings).mlsn
						}
					},
					when: faker.date.soon(),
					who: {
						connect: { email: faker.random.arrayElement(plainUsers).email }
					},
					confirmed: faker.datatype.boolean()
				}
			})
		})
	)

	await prisma.$disconnect()
}

main()

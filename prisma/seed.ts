/// <reference types="../src/types/faker" />

import Prisma from '@prisma/client'
import bcrypt from 'bcryptjs'
import faker from 'faker'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new Prisma.PrismaClient()

export async function main(): Promise<void> {
  const agencies = await Promise.all(Array.from({ length: faker.datatype.number({ min: 5, max: 12 }) }, async () => {
    const state = faker.address.stateAbbr()
    return prisma.agency.create({
      data: {
        name: faker.company.companyName() + faker.random.arrayElement([' Real Estate', ' Realty']),
        address: faker.address.streetAddress() + ', ' + faker.address.city() + ', ' + state + ' ' + faker.address.zipCodeByState(state),
        phone: faker.phone.phoneNumber(),
      }
    })
  }))

  const length = faker.datatype.number({ min: 15, max: 30 })
  const users = await Promise.all(Array.from({ length }, async () => {
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
            connect: faker.random.arrayElement(agencies)
          }
        }),

        auth: {
          create: {
            hash: await bcrypt.hash(password, 8)
          }
        }
      }
    })
  }))

  const plainUsers = users.filter(each => each.type === 'USER')
  const agents = users.filter(each => each.type === 'AGENT')

  const listings = await Promise.all(Array.from({ length: faker.datatype.number({ min: 30, max: 50 }) }, async () => {
    const mlsn = faker.datatype.number({ min: 1000000, max: 9999999 }).toString()
    const state = faker.address.stateAbbr()
    return prisma.listing.create({
      data: {
        mlsn,
        state,
        alarmInfo: faker.fake('Alarm Code {{random.number}}<br />Home Security Information:<br />{{lorem.paragraph}}'),
        bathrooms: faker.datatype.float({ min: 1, max: 7, precision: 0.5 }),
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
          connect: faker.random.arrayElement(agents)
        },

        images: new Array(faker.datatype.number(6)).map(() => faker.image.unsplash.image(undefined, undefined, "house")),

        likedBy: {
          connect: faker.random.arrayElements(users, faker.datatype.number({ min: 0, max: 7 }))
        },

        rooms: {
          createMany: {
            data: new Array(faker.datatype.number(6)).map(() => ({
              name: faker.random.arrayElement(['', '', '', 'Master ', 'Upstairs ']) + faker.random.arrayElement(['Living Room', 'Bedroom', 'Dining Room', 'Kitchen']),
              description: faker.lorem.paragraphs(faker.datatype.number({ min: 1, max: 2 }))
            }))
          }
        },

        schools: {
          create: new Array(faker.datatype.number({ min: 1, max: 3 })).map(() => ({
            name: faker.random.arrayElement([faker.address.county(), faker.company.bsAdjective()]) + faker.random.arrayElement([' Elementary', ' Middle', ' High']) + ' School'
          }))
        },
      }
    })
  }))

  await Promise.all(Array.from({ length: faker.datatype.number({ min: 7, max: 45 }) }, async () => {
    return prisma.showing.create({
      data: {
        where: {
          connect: faker.random.arrayElement(listings),
        },
        when: faker.date.soon(),
        who: {
          connect: faker.random.arrayElement(plainUsers)
        },
        confirmed: faker.datatype.boolean(),
      }
    })
  }))
}

main()
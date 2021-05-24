import bcrypt from 'bcryptjs'
import enquirer from 'enquirer'

const { prompt } = enquirer
const { hash } = bcrypt

prompt<{ password: string }>([
	{
		type: 'password',
		name: 'password' as const,
		message: 'Enter password to be hashed'
	}
]).then(async ({ password }) => {
	console.log(await hash(password, 8))
})

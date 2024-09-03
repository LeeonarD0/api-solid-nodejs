import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from 'src/use-cases/register'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUserRepository)

    await registerUseCase.findByEmail(email)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    reply.status(409).send()
  }
  return reply.status(201).send()
}

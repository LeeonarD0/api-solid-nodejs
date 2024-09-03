import { prisma } from 'src/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async findByEmail(email: string) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail !== null) {
      throw new Error('E-mail already exists.')
    }

    return userWithSameEmail
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}

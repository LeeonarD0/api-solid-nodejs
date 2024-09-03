import { hash } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/users-repository'


interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}


export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async findByEmail(email: string) {
    await this.usersRepository.findByEmail(email)
  }

  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

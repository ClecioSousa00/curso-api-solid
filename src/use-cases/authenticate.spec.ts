import { describe, it, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

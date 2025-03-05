import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let usersRepository: InMemoryUsersRepository
let getUserProfileUseCase: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'fake id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

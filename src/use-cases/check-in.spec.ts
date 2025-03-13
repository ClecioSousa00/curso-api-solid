import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-In'

let checkInsRepository: InMemoryCheckInsRepository
let checkInsUseCase: CheckInUseCase
describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    checkInsUseCase = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInsUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await checkInsUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      checkInsUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should  be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await checkInsUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await checkInsUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

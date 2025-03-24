import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let searchUseCase: SearchGymsUseCase
describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    searchUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'gym-1',
      description: null,
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'gym-2',
      description: null,
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await searchUseCase.execute({ query: 'gym-1', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-1' })])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym ${i}`,
        description: null,
        phone: '',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await searchUseCase.execute({
      query: 'gym',
      page: 2,
    })
    console.log(gyms)

    expect(gyms).toHaveLength(2)
  })
})

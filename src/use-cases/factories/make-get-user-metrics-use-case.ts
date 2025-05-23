import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'

export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)

  return getUserMetricsUseCase
}

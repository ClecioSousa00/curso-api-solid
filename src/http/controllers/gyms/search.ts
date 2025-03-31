import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQueryParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, query } = searchQueryParams.parse(request.params)

  const searchGymUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymUseCase.execute({
    page,
    query,
  })

  return reply.status(200).send({
    gyms,
  })
}
